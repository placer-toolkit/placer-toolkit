import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import {
    getAnimation,
    setDefaultAnimation,
} from "../../utilities/animation-registry.js";
import { animateTo, stopAnimations } from "../../internal/animate.js";
import { blurActiveElement } from "../../internal/close-active-element.js";
import {
    lockBodyScrolling,
    unlockBodyScrolling,
} from "../../internal/scroll.js";
import { HasSlotController } from "../../internal/slot.js";
import { uppercaseFirstLetter } from "../../internal/string.js";
import { waitForEvent } from "../../internal/event.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { Modal } from "../../internal/modal.js";
import { PcIconButton } from "../icon-button/icon-button.js";
import { styles } from "./drawer.styles.js";

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

setDefaultAnimation("drawer.overlay.show", {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: { duration: 300, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
});

setDefaultAnimation("drawer.overlay.hide", {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    options: {
        duration: 200,
        easing: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    },
});

/**
 * @summary Drawers slide in from a container to expose additional options and information.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-icon-button
 *
 * @slot — The drawer’s main content.
 * @slot label — The drawer’s label. Alternatively, you can use the `label` attribute.
 * @slot header-actions — Optional actions to add to the header. Works best with `<pc-icon-button>`.
 * @slot footer — The drawer’s footer, usually one or more buttons representing various options.
 *
 * @event pc-show — Emitted when the drawer opens.
 * @event pc-after-show — Emitted after the drawer opens and all animations are complete.
 * @event pc-hide — Emitted when the drawer closes.
 * @event pc-after-hide — Emitted after the drawer closes and all animations are complete.
 * @event pc-initial-focus — Emitted when the drawer opens and is ready to receive focus. Calling `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input.
 * @event {{ source: "close-button" | "keyboard" | "overlay" }} pc-request-close — Emitted when the user attempts to close the drawer by clicking the close button, clicking the overlay or pressing <kbd aria-label="Escape">Esc</kbd>. Calling `event.preventDefault()` will keep the drawer open. Avoid using this unless closing the drawer will result in destructive behavior such as data loss.
 *
 * @csspart base — The component’s base wrapper.
 * @csspart overlay — The overlay that covers the screen behind the drawer.
 * @csspart panel — The drawer’s panel (where the drawer and its content are rendered).
 * @csspart header — The drawer’s header. This element wraps the title and header actions.
 * @csspart header-actions — Optional actions to add to the header. Works best with `<pc-icon-button>`.
 * @csspart title — The drawer’s title.
 * @csspart close-button — The close button, an `<pc-icon-button>`.
 * @csspart close-button__base — The close button’s exported `base` part.
 * @csspart body — The drawer’s body.
 * @csspart footer — The drawer’s footer.
 *
 * @cssproperty --size — The preferred size of the drawer. This will be applied to the drawer’s width or height depending on its `placement`. Note that the drawer will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing — The amount of padding to use for the header.
 * @cssproperty --body-spacing — The amount of padding to use for the body.
 * @cssproperty --footer-spacing — The amount of padding to use for the footer.
 *
 * @animation drawer.showTop — The animation to use when showing a drawer with `top` placement.
 * @animation drawer.showEnd — The animation to use when showing a drawer with `end` placement.
 * @animation drawer.showBottom — The animation to use when showing a drawer with `bottom` placement.
 * @animation drawer.showStart — The animation to use when showing a drawer with `start` placement.
 * @animation drawer.hideTop — The animation to use when hiding a drawer with `top` placement.
 * @animation drawer.hideEnd — The animation to use when hiding a drawer with `end` placement.
 * @animation drawer.hideBottom — The animation to use when hiding a drawer with `bottom` placement.
 * @animation drawer.hideStart — The animation to use when hiding a drawer with `start` placement.
 * @animation drawer.denyClose — The animation to use when a request to close the drawer is denied.
 * @animation drawer.overlay.show — The animation to use when showing the drawer’s overlay.
 * @animation drawer.overlay.hide — The animation to use when hiding the drawer’s overlay.
 *
 * @property modal — Exposes the internal modal utility that controls focus trapping. To temporarily disable focus trapping and allow third‐party modals spawned from an active Placer Toolkit modal, call `modal.activateExternal()` when the third‐party modal opens. Upon closing, call `modal.deactivateExternal()` to restore Placer Toolkit’s focus trapping.
 */
@customElement("pc-drawer")
export class PcDrawer extends LitElement {
    static styles: CSSResultGroup = styles;
    /** @internal This is an internal property. */
    static dependencies = { "pc-icon-button": PcIconButton };

    private readonly hasSlotController = new HasSlotController(this, "footer");
    private originalTrigger!: HTMLElement | null;
    public modal = new Modal(this);
    private closeWatcher!: CloseWatcher | null;

    /** @internal This is an internal property. */
    @query(".drawer") drawer!: HTMLElement;
    /** @internal This is an internal property. */
    @query(".drawer-panel") panel!: HTMLElement;
    /** @internal This is an internal property. */
    @query(".drawer-overlay") overlay!: HTMLElement;

    /** Indicates whether or not the drawer is open. You can toggle this attribute to show and hide the drawer, or you can use the `show()` and `hide()` methods and this attribute will reflect the drawer’s open state. */
    @property({ type: Boolean, reflect: true }) open = false;

    /** The drawer’s label as displayed in the header. You should always include a relevant label even when using `no-header`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead. */
    @property({ reflect: true }) label = "";

    /** The direction from which the drawer will open. */
    @property({ reflect: true }) placement: "top" | "end" | "bottom" | "start" =
        "end";

    /** By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of its parent element, set this attribute and add `position: relative` to the parent. */
    @property({ type: Boolean, reflect: true }) contained = false;

    /** This removes the header. This will also remove the default close button, so please ensure you provide an easy, accessible way for users to dismiss the drawer. */
    @property({ attribute: "no-header", type: Boolean, reflect: true })
    noHeader = false;

    firstUpdated() {
        this.drawer.hidden = !this.open;

        if (this.open) {
            this.addOpenListeners();

            if (!this.contained) {
                this.modal.activate();
                lockBodyScrolling(this);
            }
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        unlockBodyScrolling(this);
        this.removeOpenListeners();
    }

    private requestClose(source: "close-button" | "keyboard" | "overlay") {
        const pcRequestClose = emit(this, "pc-request-close", {
            cancelable: true,
            detail: { source },
        });

        if (pcRequestClose.defaultPrevented) {
            const animation = getAnimation(this, "drawer.denyClose", {
                dir:
                    document.documentElement.dir === "rtl" ||
                    (!document.documentElement.dir &&
                        getComputedStyle(document.documentElement).direction ===
                            "rtl")
                        ? "rtl"
                        : "ltr",
            });
            animateTo(this.panel, animation.keyframes, animation.options);
            return;
        }

        this.hide();
    }

    private addOpenListeners() {
        if ("CloseWatcher" in window) {
            this.closeWatcher?.destroy();
            if (!this.contained) {
                this.closeWatcher = new CloseWatcher();
                this.closeWatcher.onclose = () => this.requestClose("keyboard");
            }
        } else {
            document.addEventListener("keydown", this.handleDocumentKeyDown);
        }
    }

    private removeOpenListeners() {
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
        this.closeWatcher?.destroy();
    }

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        if (this.contained) {
            return;
        }

        if (event.key === "Escape" && this.modal.isActive() && this.open) {
            event.stopImmediatePropagation();
            this.requestClose("keyboard");
        }
    };

    /** @internal This is an internal property. */
    @watch("open", { waitUntilFirstUpdate: true })
    async handleOpenChange() {
        if (this.open) {
            emit(this, "pc-show");
            this.addOpenListeners();
            this.originalTrigger = document.activeElement as HTMLElement;

            if (!this.contained) {
                this.modal.activate();
                lockBodyScrolling(this);
            }

            const autoFocusTarget = this.querySelector("[autofocus]");

            if (autoFocusTarget) {
                autoFocusTarget.removeAttribute("autofocus");
            }

            await Promise.all([
                stopAnimations(this.drawer),
                stopAnimations(this.overlay),
            ]);

            this.drawer.hidden = false;

            requestAnimationFrame(() => {
                const pcInitialFocus = emit(this, "pc-initial-focus", {
                    cancelable: true,
                });

                if (!pcInitialFocus.defaultPrevented) {
                    if (autoFocusTarget) {
                        (autoFocusTarget as HTMLInputElement).focus({
                            preventScroll: true,
                        });
                    } else {
                        this.panel.focus({ preventScroll: true });
                    }
                }

                if (autoFocusTarget) {
                    autoFocusTarget.setAttribute("autofocus", "");
                }
            });

            const panelAnimation = getAnimation(
                this,
                `drawer.show${uppercaseFirstLetter(this.placement)}`,
                {
                    dir:
                        document.documentElement.dir === "rtl" ||
                        (!document.documentElement.dir &&
                            getComputedStyle(document.documentElement)
                                .direction === "rtl")
                            ? "rtl"
                            : "ltr",
                },
            );
            const overlayAnimation = getAnimation(this, "drawer.overlay.show", {
                dir:
                    document.documentElement.dir === "rtl" ||
                    (!document.documentElement.dir &&
                        getComputedStyle(document.documentElement).direction ===
                            "rtl")
                        ? "rtl"
                        : "ltr",
            });

            await Promise.all([
                animateTo(
                    this.panel,
                    panelAnimation.keyframes,
                    panelAnimation.options,
                ),
                animateTo(
                    this.overlay,
                    overlayAnimation.keyframes,
                    overlayAnimation.options,
                ),
            ]);

            emit(this, "pc-after-show");
        } else {
            blurActiveElement(this);
            emit(this, "pc-hide");
            this.removeOpenListeners();

            if (!this.contained) {
                this.modal.deactivate();
                unlockBodyScrolling(this);
            }

            await Promise.all([
                stopAnimations(this.drawer),
                stopAnimations(this.overlay),
            ]);

            const panelAnimation = getAnimation(
                this,
                `drawer.hide${uppercaseFirstLetter(this.placement)}`,
                {
                    dir:
                        document.documentElement.dir === "rtl" ||
                        (!document.documentElement.dir &&
                            getComputedStyle(document.documentElement)
                                .direction === "rtl")
                            ? "rtl"
                            : "ltr",
                },
            );
            const overlayAnimation = getAnimation(this, "drawer.overlay.hide", {
                dir:
                    document.documentElement.dir === "rtl" ||
                    (!document.documentElement.dir &&
                        getComputedStyle(document.documentElement).direction ===
                            "rtl")
                        ? "rtl"
                        : "ltr",
            });

            await Promise.all([
                animateTo(
                    this.overlay,
                    overlayAnimation.keyframes,
                    overlayAnimation.options,
                ).then(() => {
                    this.overlay.hidden = true;
                }),
                animateTo(
                    this.panel,
                    panelAnimation.keyframes,
                    panelAnimation.options,
                ).then(() => {
                    this.panel.hidden = true;
                }),
            ]);

            this.drawer.hidden = true;

            this.overlay.hidden = false;
            this.panel.hidden = false;

            const trigger = this.originalTrigger;

            if (typeof trigger?.focus === "function") {
                setTimeout(() => trigger.focus());
            }

            emit(this, "pc-after-hide");
        }
    }

    /** @internal This is an internal property. */
    @watch("contained", { waitUntilFirstUpdate: true })
    handleNoModalChange() {
        if (this.open && !this.contained) {
            this.modal.activate();
            lockBodyScrolling(this);
        }

        if (this.open && this.contained) {
            this.modal.deactivate();
            unlockBodyScrolling(this);
        }
    }

    /** Shows the drawer. */
    async show() {
        if (this.open) {
            return undefined;
        }

        this.open = true;
        return waitForEvent(this, "pc-after-show");
    }

    /** Hides the drawer. */
    async hide() {
        if (!this.open) {
            return undefined;
        }

        this.open = false;
        return waitForEvent(this, "pc-after-hide");
    }

    render() {
        return html`
            <div
                part="base"
                class=${classMap({
                    "drawer": true,
                    "drawer-open": this.open === true,
                    "drawer-top": this.placement === "top",
                    "drawer-end": this.placement === "end",
                    "drawer-bottom": this.placement === "bottom",
                    "drawer-start": this.placement === "start",
                    "drawer-contained": this.contained === true,
                    "drawer-fixed": this.contained === false,
                    "drawer-rtl":
                        document.documentElement.dir === "rtl" ||
                        (!document.documentElement.dir &&
                            getComputedStyle(document.documentElement)
                                .direction === "rtl"),
                    "drawer-has-footer": this.hasSlotController.test("footer"),
                })}
            >
                <div
                    part="overlay"
                    class="drawer-overlay"
                    @click=${() => this.requestClose("overlay")}
                    tabindex="-1"
                ></div>

                <div
                    part="panel"
                    class="drawer-panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label=${ifDefined(
                        this.noHeader ? this.label : undefined,
                    )}
                    aria-labelledby=${ifDefined(
                        !this.noHeader ? "title" : undefined,
                    )}
                    aria-hidden=${this.open ? "false" : "true"}
                    tabindex="0"
                >
                    ${!this.noHeader
                        ? html`
                              <header part="header" class="drawer-header">
                                  <h2
                                      part="title"
                                      class="drawer-title"
                                      id="title"
                                  >
                                      <slot name="label">
                                          ${this.label.length > 0
                                              ? this.label
                                              : String.fromCharCode(65279)}
                                      </slot>
                                  </h2>
                                  <div
                                      part="header-actions"
                                      class="drawer-header-actions"
                                  >
                                      <slot name="header-actions"></slot>
                                      <pc-icon-button
                                          part="close-button"
                                          class="close-drawer-button"
                                          library="system"
                                          icon-style="solid"
                                          name="xmark"
                                          label="Close drawer"
                                          @click=${() =>
                                              this.requestClose("close-button")}
                                          exportparts="base:close-button__base"
                                      ></pc-icon-button>
                                  </div>
                              </header>
                          `
                        : ""}

                    <slot part="body" class="drawer-body"></slot>

                    <footer part="footer" class="drawer-footer">
                        <slot name="footer"></slot>
                    </footer>
                </div>
            </div>
        `;
    }
}
