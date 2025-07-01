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
import { waitForEvent } from "../../internal/event.js";
import { blurActiveElement } from "../../internal/close-active-element.js";
import { HasSlotController } from "../../internal/slot.js";
import {
    lockBodyScrolling,
    unlockBodyScrolling,
} from "../../internal/scroll.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcIconButton } from "../icon-button/icon-button.js";
import { Modal } from "../../internal/modal.js";
import { styles } from "./dialog.styles.js";

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

setDefaultAnimation("dialog.overlay.show", {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: { duration: 300, easing: "ease-out" },
});

setDefaultAnimation("dialog.overlay.hide", {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    options: { duration: 200, easing: "ease-in" },
});

/**
 * @summary Dialogs, sometimes called “modals”, appear above the page and draw the user’s immediate attention.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-icon
 * @dependency pc-icon-button
 *
 * @slot — The dialog’s main content.
 * @slot label — The dialog’s label. Alternatively, you can use the `label` attribute.
 * @slot header-actions — Optional actions to add to the header. Works best with `<pc-icon-button>`.
 * @slot footer — The dialog’s footer, usually one or more buttons representing various options.
 *
 * @event pc-show — Emitted when the dialog opens.
 * @event pc-after-show — Emitted after the dialog opens and all animations are complete.
 * @event pc-hide — Emitted when the dialog closes.
 * @event pc-after-hide — Emitted after the dialog closes and all animations are complete.
 * @event pc-initial-focus — Emitted when the dialog opens and is ready to receive focus. Calling `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input.
 * @event {{ source: "close-button" | "keyboard" | "overlay" }} pc-request-close — Emitted when the user attempts to close the dialog by clicking the close button, clicking the overlay or pressing <kbd aria-label="Escape">Esc</kbd>. Calling `event.preventDefault()` will keep the dialog open. Avoid using this unless closing the dialog will result in destructive behaviour such as data loss.
 *
 * @csspart base — The component’s base wrapper.
 * @csspart overlay — The overlay that covers the screen behind the dialog.
 * @csspart panel — The dialog’s panel (where the dialog and its content are rendered).
 * @csspart header — The dialog’s header. This element wraps the title and header actions.
 * @csspart header-actions — Optional actions to add to the header. Works best with `<pc-icon-button>`.
 * @csspart title — The dialog’s title.
 * @csspart close-button — The close button. Is a `<pc-icon-button>` under the hood.
 * @csspart close-button__base — The close button’s `base` part.
 * @csspart body — The dialog’s body.
 * @csspart footer — The dialog’s footer.
 *
 * @cssproperty --width — The preferred width of the dialog. Note that the dialog will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing — The amount of spacing to use for the header.
 * @cssproperty --body-spacing — The amount of padding to use for the body.
 * @cssproperty --footer-spacing — The amount of padding to use for the footer.
 *
 * @animation dialog.show — The animation to use when showing the dialog.
 * @animation dialog.hide — The animation to use when hiding the dialog.
 * @animation dialog.denyClose — The animation to use when a request to close the dialog is denied.
 * @animation dialog.overlay.show — The animation to use when showing the dialog’s overlay.
 * @animation dialog.overlay.hide — The animation to use when hiding the dialog’s overlay.
 *
 * @property modal — Exposes the internal modal utility that controls focus trapping. To temporarily disable focus trapping and allow third‐party modals spawned from an active Placer modal, call `modal.activateExternal()` when the third‐party modal opens. Upon closing, call `modal.deactivateExternal()` to restore Placer Toolkit’s focus trapping.
 */
@customElement("pc-dialog")
export class PcDialog extends LitElement {
    static styles: CSSResultGroup = styles;
    /** @internal This is an internal property. */
    static dependencies = { "pc-icon-button": PcIconButton };

    private readonly hasSlotController = new HasSlotController(this, "footer");
    private originalTrigger!: HTMLElement | null;
    public modal = new Modal(this);
    private closeWatcher!: CloseWatcher | null;

    /** @internal This is an internal property. */
    @query(".dialog") dialog!: HTMLElement;
    /** @internal This is an internal property. */
    @query(".dialog-panel") panel!: HTMLElement;
    /** @internal This is an internal property. */
    @query(".dialog-overlay") overlay!: HTMLElement;

    /** Indicates whether or not the dialog is open. You can toggle this attribute to show and hide the dialog, or you can use the `show()` and `hide()` methods and this attribute will reflect the dialog’s open state. */
    @property({ type: Boolean, reflect: true }) open = false;

    /** The dialog’s label displayed in the header. You should always include a relevant label even when using the `no-header` attribute, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead. */
    @property({ reflect: true }) label = "";

    /** Removes the header. This will also remove the default close button, so please ensure you provide an easy, accessible way for users to dismiss the dialog. */
    @property({ attribute: "no-header", type: Boolean, reflect: true })
    noHeader = false;

    firstUpdated() {
        this.dialog.hidden = !this.open;

        if (this.open) {
            this.addOpenListeners();
            this.modal.activate();
            lockBodyScrolling(this);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.modal.deactivate();
        unlockBodyScrolling(this);
        this.removeOpenListeners();
    }

    private requestClose(source: "close-button" | "keyboard" | "overlay") {
        const pcRequestClose = emit(this, "pc-request-close", {
            cancelable: true,
            detail: { source },
        });

        if (pcRequestClose.defaultPrevented) {
            const animation = getAnimation(this, "dialog.denyClose", {
                dir: document.documentElement.dir || "ltr",
            });
            animateTo(this.panel, animation.keyframes, animation.options);
            return;
        }

        this.hide();
    }

    private addOpenListeners() {
        if ("CloseWatcher" in window) {
            this.closeWatcher?.destroy();
            this.closeWatcher = new CloseWatcher();
            this.closeWatcher.onclose = () => this.requestClose("keyboard");
        } else {
            document.addEventListener("keydown", this.handleDocumentKeyDown);
        }
    }

    private removeOpenListeners() {
        this.closeWatcher?.destroy();
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
    }

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && this.modal.isActive() && this.open) {
            event.stopPropagation();
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
            this.modal.activate();

            lockBodyScrolling(this);

            const autoFocusTarget = this.querySelector("[autofocus]");

            if (autoFocusTarget) {
                autoFocusTarget.removeAttribute("autofocus");
            }

            await Promise.all([
                stopAnimations(this.dialog),
                stopAnimations(this.overlay),
            ]);

            this.dialog.hidden = false;
            this.panel.hidden = false;
            this.overlay.hidden = false;

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

            const panelAnimation = getAnimation(this, "dialog.show", {
                dir: document.documentElement.dir || "ltr",
            });
            const overlayAnimation = getAnimation(this, "dialog.overlay.show", {
                dir: document.documentElement.dir || "ltr",
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
            this.modal.deactivate();

            await Promise.all([
                stopAnimations(this.dialog),
                stopAnimations(this.overlay),
            ]);
            const panelAnimation = getAnimation(this, "dialog.hide", {
                dir: document.documentElement.dir || "ltr",
            });
            const overlayAnimation = getAnimation(this, "dialog.overlay.hide", {
                dir: document.documentElement.dir || "ltr",
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

            this.dialog.hidden = true;

            unlockBodyScrolling(this);

            const trigger = this.originalTrigger;

            if (typeof trigger?.focus === "function") {
                setTimeout(() => trigger.focus());
            }

            emit(this, "pc-after-hide");

            this.dialog.hidden = true;
        }
    }

    /** Shows the dialog. */
    async show() {
        if (this.open) {
            return undefined;
        }

        this.open = true;
        return waitForEvent(this, "pc-after-show");
    }

    /** Hides the dialog. */
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
                    "dialog": true,
                    "dialog-open": this.open === true,
                    "dialog-has-footer": this.hasSlotController.test("footer"),
                })}
            >
                <div
                    part="overlay"
                    class="dialog-overlay"
                    @click=${() => this.requestClose("overlay")}
                    tabindex="-1"
                ></div>

                <div
                    part="panel"
                    class="dialog-panel"
                    role="dialog"
                    aria-label=${ifDefined(
                        this.noHeader ? this.label : undefined,
                    )}
                    aria-labelledby=${ifDefined(
                        !this.noHeader ? "title" : undefined,
                    )}
                    aria-modal="true"
                    aria-hidden=${this.open ? "false" : "true"}
                    tabindex="-1"
                >
                    ${!this.noHeader
                        ? html`
                              <header part="header" class="dialog-header">
                                  <h2
                                      class="dialog-title"
                                      part="title"
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
                                      class="dialog-header-actions"
                                  >
                                      <slot name="header-actions"></slot>
                                      <pc-icon-button
                                          part="close-button"
                                          class="dialog-close-button"
                                          library="system"
                                          icon-style="solid"
                                          name="xmark"
                                          label="Close dialog"
                                          @click=${() =>
                                              this.requestClose("close-button")}
                                          exportparts="base:close-button__base"
                                      ></pc-icon-button>
                                  </div>
                              </header>
                          `
                        : ""}

                    <div part="body" class="dialog-body" tabindex="-1">
                        <slot></slot>
                    </div>

                    <footer part="footer" class="dialog-footer">
                        <slot name="footer"></slot>
                    </footer>
                </div>
            </div>
        `;
    }
}
