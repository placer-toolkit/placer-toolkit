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
import { waitForEvent } from "../../internal/event.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcButton } from "../button/button.js";
import styles from "./dialog.css";

document.addEventListener("click", (event: MouseEvent) => {
    const dialogAttributeElement = (event.target as Element).closest(
        "[data-dialog]",
    );

    if (dialogAttributeElement instanceof Element) {
        const [command, id] = parseSpaceDelimitedTokens(
            dialogAttributeElement.getAttribute("data-dialog") || "",
        );

        if (command === "open" && id?.length) {
            const doc = dialogAttributeElement.getRootNode() as
                | Document
                | ShadowRoot;
            const dialog = doc.getElementById(id) as PcDialog;

            if (dialog?.localName === "pc-dialog") {
                dialog.open = true;
            } else {
                console.warn(
                    `A dialog with an id of “${id}” could not be found in this document.`,
                );
            }
        }
    }
});

// Bug (Safari < 18.3): https://bugs.webkit.org/show_bug.cgi?id=267688
document.addEventListener("pointerdown", () => {});

setDefaultAnimation("dialog.show", {
    keyframes: [
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1 },
    ],
    options: { duration: 300, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
});

setDefaultAnimation("dialog.hide", {
    keyframes: [
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.8 },
    ],
    options: {
        duration: 200,
        easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    },
});

setDefaultAnimation("dialog.denyClose", {
    keyframes: [{ scale: 1 }, { scale: 1.02 }, { scale: 1 }],
    options: {
        duration: 300,
        easing: "cubic-bezier(0.0, 0.7, 0.2, 1.0)",
    },
});

/**
 * @summary Dialogs, sometimes called “modals”, appear above the page and draw the user’s immediate attention.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-button
 *
 * @slot - The dialog’s main content.
 * @slot label - The dialog’s label. Alternatively, you can use the `label` attribute.
 * @slot header-actions - Optional actions to add to the header. Works best with `<pc-button>`.
 * @slot footer - The dialog’s footer, usually one or more buttons representing various options.
 *
 * @event pc-show - Emitted when the dialog opens.
 * @event pc-after-show - Emitted after the dialog opens and all animations are complete.
 * @event {{ source: Element }} pc-hide - Emitted when the dialog closes.
 * @event pc-after-hide - Emitted after the dialog closes and all animations are complete.
 *
 * @csspart dialog - The dialog’s `<dialog>` element.
 * @csspart header - The dialog’s header. This element wraps the title and header actions.
 * @csspart header-actions - Optional actions to add to the header. Works best with `<pc-button>`.
 * @csspart title - The dialog’s title.
 * @csspart close-button - The close button. Is a `<pc-button>` under the hood.
 * @csspart close-button-base - The close button’s `base` part.
 * @csspart body - The dialog’s body.
 * @csspart footer - The dialog’s footer.
 *
 * @cssproperty --width: 31rem - The preferred width of the dialog. Note that the dialog will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing: var(--pc-spacing-xl) - The amount of spacing to use for the header.
 * @cssproperty --body-spacing: var(--pc-spacing-s) var(--pc-spacing-xl) - The amount of padding to use for the body.
 * @cssproperty --footer-spacing: var(--pc-spacing-s) var(--pc-spacing-xl) var(--pc-spacing-xl) - The amount of padding to use for the footer.
 *
 * @animation dialog.show - The animation to use when showing the dialog.
 * @animation dialog.hide - The animation to use when hiding the dialog.
 * @animation dialog.denyClose - The animation to use when a request to close the dialog is denied.
 */
@customElement("pc-dialog")
export class PcDialog extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;
    /** @internal This is an internal static property. */
    static dependencies = { "pc-button": PcButton };

    private readonly hasSlotController = new HasSlotController(this, "footer");
    private readonly localize = new LocalizeController(this);
    private originalTrigger!: HTMLElement | null;

    /** @internal This is an internal class property. */
    @query(".dialog") dialog!: HTMLDialogElement;

    /** Indicates whether or not the dialog is open. Toggle this attribute to show and hide the dialog. */
    @property({ type: Boolean, reflect: true }) open = false;

    /** The dialog’s label displayed in the header. You should always include a relevant label even when using the `no-header` attribute, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead. */
    @property({ reflect: true }) label = "";

    /** Removes the header. This will also remove the default close button, so please ensure you provide an easy, accessible way for users to dismiss the dialog. */
    @property({ attribute: "no-header", type: Boolean, reflect: true })
    noHeader = false;

    /** Prevents clicks on the backdrop causing the dialog to close. */
    @property({ attribute: "no-light-dismiss", type: Boolean })
    noLightDismiss = false;

    firstUpdated() {
        if (this.open) {
            this.addOpenListeners();
            this.dialog.showModal();
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

            const animation = getAnimation(this, "dialog.denyClose", {
                dir: this.localize.dir(),
            });

            animateTo(this.dialog, animation.keyframes, animation.options);

            return;
        }

        this.removeOpenListeners();

        this.dialog.classList.add("hide");
        this.dialog.classList.remove("show");

        const animation = getAnimation(this, "dialog.hide", {
            dir: this.localize.dir(),
        });

        await animateTo(this.dialog, animation.keyframes, animation.options);

        this.open = false;
        this.dialog.close();
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

    private handleDialogCancel(event: Event) {
        event.preventDefault();

        if (
            !this.dialog.classList.contains("hide") &&
            event.target === this.dialog
        ) {
            this.requestClose(this.dialog);
        }
    }

    private handleDialogClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const button = target.closest('[data-dialog="close"]');

        if (button) {
            event.stopPropagation();
            this.requestClose(button);
        }
    }

    private async handleDialogPointerDown(event: PointerEvent) {
        if (event.target === this.dialog) {
            if (!this.noLightDismiss) {
                this.requestClose(this.dialog);
            } else {
                const animation = getAnimation(this, "dialog.denyClose", {
                    dir: this.localize.dir(),
                });

                animateTo(this.dialog, animation.keyframes, animation.options);
            }
        }
    }

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && this.open) {
            event.preventDefault();
            event.stopPropagation();
            this.requestClose(this.dialog);
        }
    };

    /** @internal This is an internal method. */
    @watch("open", { waitUntilFirstUpdate: true })
    handleOpenChange() {
        if (this.open && !this.dialog.open) {
            this.show();
        } else if (!this.open && this.dialog.open) {
            this.open = true;
            this.requestClose(this.dialog);
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
        this.dialog.showModal();

        lockBodyScrolling(this);

        requestAnimationFrame(() => {
            const elementToFocus =
                this.querySelector<HTMLButtonElement>("[autofocus]");

            if (elementToFocus && typeof elementToFocus.focus === "function") {
                elementToFocus.focus();
            } else {
                this.dialog.focus();
            }
        });

        this.dialog.classList.add("show");
        this.dialog.classList.remove("hide");

        const animation = getAnimation(this, "dialog.show", {
            dir: this.localize.dir(),
        });

        animateTo(this.dialog, animation.keyframes, animation.options);

        return waitForEvent(this, "pc-after-show");
    }

    render() {
        return html`
            <dialog
                part="dialog"
                class=${classMap({
                    "dialog": true,
                    "open": this.open,
                    "has-footer": this.hasSlotController.test("footer"),
                })}
                @click=${this.handleDialogClick}
                @pointerdown=${this.handleDialogPointerDown}
                @cancel=${this.handleDialogCancel}
            >
                ${!this.noHeader
                    ? html`
                          <header part="header" class="header">
                              <h2 class="title" part="title" id="title">
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
                                      class="dialog-close"
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
        "pc-dialog": PcDialog;
    }
}
