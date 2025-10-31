import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import {
    getAnimation,
    setDefaultAnimation,
} from "../../utilities/animation-registry.js";
import { animateTo } from "../../internal/animate.js";
import { HasSlotController } from "../../internal/slot.js";
import { LocalizeController } from "../../utilities/localize.js";
import { parseSpaceDelimitedTokens } from "../../internal/parse.js";
import {
    lockBodyScrolling,
    unlockBodyScrolling,
} from "../../internal/scroll.js";
import { uppercaseFirstLetter } from "../../internal/string.js";
import { waitForEvent } from "../../internal/event.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcButton } from "../button/button.js";
import styles from "./drawer.css";

document.addEventListener("click", (event: MouseEvent) => {
    const drawerAttributeElement = (event.target as Element).closest(
        "[data-drawer]",
    );

    if (drawerAttributeElement instanceof Element) {
        const [command, id] = parseSpaceDelimitedTokens(
            drawerAttributeElement.getAttribute("data-drawer") || "",
        );

        if (command === "open" && id?.length) {
            const doc = drawerAttributeElement.getRootNode() as
                | Document
                | ShadowRoot;
            const drawer = doc.getElementById(id) as PcDrawer;

            if (drawer?.localName === "pc-drawer") {
                drawer.open = true;
            } else {
                console.warn(
                    `A drawer with an id of “${id}” could not be found in this document.`,
                );
            }
        }
    }
});

// Bug (Safari < 18.3): https://bugs.webkit.org/show_bug.cgi?id=267688
document.addEventListener("pointerdown", () => {});

setDefaultAnimation("drawer.showTop", {
    keyframes: [
        { opacity: 0, translate: "0 -100%" },
        { opacity: 1, translate: "0 0" },
    ],
    options: { duration: 300, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
});

setDefaultAnimation("drawer.hideTop", {
    keyframes: [
        { opacity: 1, translate: "0 0" },
        { opacity: 0, translate: "0 -100%" },
    ],
    options: {
        duration: 200,
        easing: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    },
});

setDefaultAnimation("drawer.showEnd", {
    keyframes: [
        { opacity: 0, translate: "100%" },
        { opacity: 1, translate: "0" },
    ],
    rtlKeyframes: [
        { opacity: 0, translate: "-100%" },
        { opacity: 1, translate: "0" },
    ],
    options: { duration: 300, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
});

setDefaultAnimation("drawer.hideEnd", {
    keyframes: [
        { opacity: 1, translate: "0" },
        { opacity: 0, translate: "100%" },
    ],
    rtlKeyframes: [
        { opacity: 1, translate: "0" },
        { opacity: 0, translate: "-100%" },
    ],
    options: {
        duration: 200,
        easing: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    },
});

setDefaultAnimation("drawer.showBottom", {
    keyframes: [
        { opacity: 0, translate: "0 100%" },
        { opacity: 1, translate: "0 0" },
    ],
    options: { duration: 300, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
});

setDefaultAnimation("drawer.hideBottom", {
    keyframes: [
        { opacity: 1, translate: "0 0" },
        { opacity: 0, translate: "0 100%" },
    ],
    options: {
        duration: 200,
        easing: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    },
});

setDefaultAnimation("drawer.showStart", {
    keyframes: [
        { opacity: 0, translate: "-100%" },
        { opacity: 1, translate: "0" },
    ],
    rtlKeyframes: [
        { opacity: 0, translate: "100%" },
        { opacity: 1, translate: "0" },
    ],
    options: { duration: 300, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
});

setDefaultAnimation("drawer.hideStart", {
    keyframes: [
        { opacity: 1, translate: "0" },
        { opacity: 0, translate: "-100%" },
    ],
    rtlKeyframes: [
        { opacity: 1, translate: "0" },
        { opacity: 0, translate: "100%" },
    ],
    options: {
        duration: 200,
        easing: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    },
});

setDefaultAnimation("drawer.denyClose", {
    keyframes: [{ scale: 1 }, { scale: 1.01 }, { scale: 1 }],
    options: {
        duration: 250,
        easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
});

/**
 * @summary Drawers slide in from a container to expose additional options and information.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-button
 *
 * @slot - The drawer’s main content.
 * @slot label - The drawer’s label. Alternatively, you can use the `label` attribute.
 * @slot header-actions - Optional actions to add to the header. Works best with `<pc-button>`.
 * @slot footer - The drawer’s footer, usually one or more buttons representing various options.
 *
 * @event pc-show - Emitted when the drawer opens.
 * @event pc-after-show - Emitted after the drawer opens and all animations are complete.
 * @event {{ source: Element }} pc-hide - Emitted when the drawer closes.
 * @event pc-after-hide - Emitted after the drawer closes and all animations are complete.
 *
 * @csspart drawer - The drawer’s `<dialog>` element.
 * @csspart header - The drawer’s header. This element wraps the title and header actions.
 * @csspart header-actions - Optional actions to add to the header. Works best with `<pc-button>`.
 * @csspart title - The drawer’s title.
 * @csspart close-button - The close button, a `<pc-button>`.
 * @csspart close-button-base - The close button’s exported `base` part.
 * @csspart body - The drawer’s body.
 * @csspart footer - The drawer’s footer.
 *
 * @cssproperty --size: 25rem - The preferred size of the drawer. This will be applied to the drawer’s width or height depending on its `placement`. Note that the drawer will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing: var(--pc-spacing-xl) - The amount of padding to use for the header.
 * @cssproperty --body-spacing: var(--pc-spacing-s) var(--pc-spacing-xl) - The amount of padding to use for the body.
 * @cssproperty --footer-spacing: var(--pc-spacing-s) var(--pc-spacing-xl) var(--pc-spacing-xl) - The amount of padding to use for the footer.
 *
 * @animation drawer.showTop - The animation to use when showing a drawer with `top` placement.
 * @animation drawer.showEnd - The animation to use when showing a drawer with `end` placement.
 * @animation drawer.showBottom - The animation to use when showing a drawer with `bottom` placement.
 * @animation drawer.showStart - The animation to use when showing a drawer with `start` placement.
 * @animation drawer.hideTop - The animation to use when hiding a drawer with `top` placement.
 * @animation drawer.hideEnd - The animation to use when hiding a drawer with `end` placement.
 * @animation drawer.hideBottom - The animation to use when hiding a drawer with `bottom` placement.
 * @animation drawer.hideStart - The animation to use when hiding a drawer with `start` placement.
 * @animation drawer.denyClose - The animation to use when a request to close the drawer is denied.
 */
@customElement("pc-drawer")
export class PcDrawer extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;
    /** @internal This is an internal static property. */
    static dependencies = { "pc-button": PcButton };

    private readonly hasSlotController = new HasSlotController(this, "footer");
    private readonly localize = new LocalizeController(this);
    private originalTrigger!: HTMLElement | null;

    /** @internal This is an internal class property. */
    @query(".drawer") drawer!: HTMLDialogElement;

    /** Indicates whether or not the drawer is open. Toggle this attribute to show and hide the drawer. */
    @property({ type: Boolean, reflect: true }) open = false;

    /** The drawer’s label as displayed in the header. You should always include a relevant label even when using `no-header`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead. */
    @property({ reflect: true }) label = "";

    /** The direction from which the drawer will open. */
    @property({ reflect: true }) placement: "top" | "end" | "bottom" | "start" =
        "end";

    /** This removes the header. This will also remove the default close button, so please ensure you provide an easy, accessible way for users to dismiss the drawer. */
    @property({ attribute: "no-header", type: Boolean, reflect: true })
    noHeader = false;

    /** Prevents clicks on the backdrop causing the drawer to close. */
    @property({ attribute: "no-light-dismiss", type: Boolean })
    noLightDismiss = false;

    firstUpdated() {
        if (this.open) {
            this.addOpenListeners();
            this.drawer.showModal();
            lockBodyScrolling(this);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        unlockBodyScrolling(this);
        this.removeOpenListeners();
    }

    private async requestClose(source: Element) {
        const pcHide = emit(this, "pc-hide", {
            cancelable: true,
            detail: { source },
        });

        if (pcHide.defaultPrevented) {
            this.open = true;

            const animation = getAnimation(this, "drawer.denyClose", {
                dir: this.localize.dir(),
            });

            animateTo(this.drawer, animation.keyframes, animation.options);

            return;
        }

        this.removeOpenListeners();

        this.drawer.classList.add("hide");
        this.drawer.classList.remove("show");

        const animation = getAnimation(
            this,
            `drawer.hide${uppercaseFirstLetter(this.placement)}`,
            {
                dir: this.localize.dir(),
            },
        );

        await animateTo(this.drawer, animation.keyframes, animation.options);

        this.open = false;
        this.drawer.close();
        unlockBodyScrolling(this);

        const trigger = this.originalTrigger;

        if (typeof trigger?.focus === "function") {
            setTimeout(() => trigger.focus());
        }

        return waitForEvent(this, "pc-after-hide");
    }

    private addOpenListeners() {
        document.addEventListener("keydown", this.handleDocumentKeyDown);
    }

    private removeOpenListeners() {
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
    }

    private handleDrawerCancel(event: Event) {
        event.preventDefault();

        if (
            !this.drawer.classList.contains("hide") &&
            event.target === this.drawer
        ) {
            this.requestClose(this.drawer);
        }
    }

    private handleDrawerClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const button = target.closest('[data-drawer="close"]');

        if (button) {
            event.stopPropagation();
            this.requestClose(button);
        }
    }

    private async handleDrawerPointerDown(event: PointerEvent) {
        if (event.target === this.drawer) {
            if (!this.noLightDismiss) {
                this.requestClose(this.drawer);
            } else {
                const animation = getAnimation(this, "drawer.denyClose", {
                    dir: this.localize.dir(),
                });

                animateTo(this.drawer, animation.keyframes, animation.options);
            }
        }
    }

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && this.open) {
            event.preventDefault();
            event.stopPropagation();
            this.requestClose(this.drawer);
        }
    };

    /** @internal This is an internal method. */
    @watch("open", { waitUntilFirstUpdate: true })
    handleOpenChange() {
        if (this.open && !this.drawer.open) {
            this.show();
        } else if (this.drawer.open) {
            this.open = true;
            this.requestClose(this.drawer);
        }
    }

    private async show() {
        const pcShow = emit(this, "pc-show", {
            cancelable: true,
        });

        if (pcShow.defaultPrevented) {
            this.open = false;
            return;
        }

        this.addOpenListeners();
        this.originalTrigger = document.activeElement as HTMLElement;
        this.open = true;
        this.drawer.showModal();

        lockBodyScrolling(this);

        requestAnimationFrame(() => {
            const elementToFocus =
                this.querySelector<HTMLButtonElement>("[autofocus]");

            if (elementToFocus && typeof elementToFocus.focus === "function") {
                elementToFocus.focus();
            } else {
                this.drawer.focus();
            }
        });

        this.drawer.classList.add("show");
        this.drawer.classList.remove("hide");

        const animation = getAnimation(
            this,
            `drawer.show${uppercaseFirstLetter(this.placement)}`,
            {
                dir: this.localize.dir(),
            },
        );

        animateTo(this.drawer, animation.keyframes, animation.options);

        return waitForEvent(this, "pc-after-show");
    }

    render() {
        return html`
            <dialog
                part="drawer"
                class=${classMap({
                    "drawer": true,
                    "open": this.open,
                    "top": this.placement === "top",
                    "end": this.placement === "end",
                    "bottom": this.placement === "bottom",
                    "start": this.placement === "start",
                    "has-footer": this.hasSlotController.test("footer"),
                })}
                @click=${this.handleDrawerClick}
                @pointerdown=${this.handleDrawerPointerDown}
                @cancel=${this.handleDrawerCancel}
            >
                ${!this.noHeader
                    ? html`
                          <header part="header" class="header">
                              <h2 part="title" class="title" id="title">
                                  <slot name="label">
                                      ${this.label.length > 0
                                          ? this.label
                                          : String.fromCharCode(8203)}
                                  </slot>
                              </h2>
                              <div part="header-actions" class="header-actions">
                                  <slot name="header-actions"></slot>
                                  <pc-button
                                      part="close-button"
                                      class="drawer-close"
                                      size="small"
                                      variant="plain"
                                      exportparts="base:close-button-base"
                                      @click=${(event: PointerEvent) =>
                                          this.requestClose(
                                              event.target as Element,
                                          )}
                                  >
                                      <pc-icon
                                          library="system"
                                          icon-style="solid"
                                          name="xmark"
                                          label=${this.localize.term("close")}
                                      ></pc-icon>
                                  </pc-button>
                              </div>
                          </header>
                      `
                    : ""}

                <div part="body" class="body" tabindex="-1">
                    <slot></slot>
                </div>

                <footer part="footer" class="footer">
                    <slot name="footer"></slot>
                </footer>
            </dialog>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-drawer": PcDrawer;
    }
}
