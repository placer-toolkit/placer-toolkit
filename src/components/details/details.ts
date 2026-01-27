import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import {
    animateTo,
    shimKeyframesHeightAuto,
    stopAnimations,
} from "../../internal/animate.js";
import {
    getAnimation,
    setDefaultAnimation,
} from "../../utilities/animation-registry.js";
import { LocalizeController } from "../../utilities/localize.js";
import { waitForEvent } from "../../internal/event.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcIcon } from "../icon/icon.js";
import styles from "./details.css";

setDefaultAnimation("details.show", {
    keyframes: [
        { blockSize: "0", opacity: "0" },
        { blockSize: "auto", opacity: "1" },
    ],
    options: { duration: 300, easing: "cubic-bezier(0.33, 1, 0.68, 1)" },
});

setDefaultAnimation("details.hide", {
    keyframes: [
        { blockSize: "auto", opacity: "1" },
        { blockSize: "0", opacity: "0" },
    ],
    options: { duration: 200, easing: "cubic-bezier(0.55, 0, 0.55, 0.2)" },
});

/**
 * @summary Details show a brief summary and expand to show additional content.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-icon
 *
 * @slot - The details’ main content.
 * @slot summary - The details’ summary. Alternatively, you can use the `summary` attribute.
 * @slot expand-icon - An optional expand icon to use instead of the default. Works best with `<pc-icon>`.
 * @slot collapse-icon - An optional collapse icon to use instead of the default. Works best with `<pc-icon>`.
 *
 * @event pc-show - Emitted when the details opens.
 * @event pc-after-show - Emitted after the details opens and all animations are complete.
 * @event pc-hide - Emitted when the details closes.
 * @event pc-after-hide - Emitted after the details closes and all animations are complete.
 *
 * @csspart base - The component’s base wrapper.
 * @csspart header - The header that wraps both the summary and the expand/collapse icon.
 * @csspart summary - The container that wraps the summary.
 * @csspart summary-icon - The container that wraps the expand/collapse icons.
 * @csspart body - The container of the details’ content.
 * @csspart content - The details’ content.
 *
 * @animation details.show - The animation to use when showing details. You can use both `height: auto` and `block-size: auto` with this animation.
 * @animation details.hide - The animation to use when hiding details. You can use `height: auto` and `block-size: auto` with this animation.
 */
@customElement("pc-details")
export class PcDetails extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;
    /** @internal This is an internal static property. */
    static dependencies = { "pc-icon": PcIcon };

    private readonly localize = new LocalizeController(this);

    /** @internal This is an internal class property. */
    @query(".details") details!: HTMLDetailsElement;
    /** @internal This is an internal class property. */
    @query(".header") header!: HTMLElement;
    /** @internal This is an internal class property. */
    @query(".body") body!: HTMLElement;

    /** @internal This is an internal class property. */
    detailsObserver!: MutationObserver;

    /** Indicates whether or not the details is open. You can toggle this attribute to show and hide the details, or you can use the `show()` or `hide()` methods and this attribute will reflect the details’ open state. */
    @property({ type: Boolean, reflect: true }) open = false;

    /** The summary to show in the header. If you need to display HTML, use the `summary` slot instead. */
    @property() summary?: string;

    /** The details’ variant. */
    @property({ reflect: true }) variant: "filled" | "outlined" | "plain" =
        "outlined";

    /** Disables the details so it can’t be toggled. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    firstUpdated() {
        this.body.style.blockSize = this.open ? "auto" : "0";

        if (this.open) {
            this.details.open = true;
        }

        this.detailsObserver = new MutationObserver((changes) => {
            for (const change of changes) {
                if (
                    change.type === "attributes" &&
                    change.attributeName === "open"
                ) {
                    if (this.details.open) {
                        this.show();
                    } else {
                        this.hide();
                    }
                }
            }
        });
        this.detailsObserver.observe(this.details, { attributes: true });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.detailsObserver?.disconnect();
    }

    private handleSummaryClick(event: MouseEvent) {
        event.preventDefault();

        if (!this.disabled) {
            if (this.open) {
                this.hide();
            } else {
                this.show();
            }
            this.header.focus();
        }
    }

    private handleSummaryKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();

            if (this.open) {
                this.hide();
            } else {
                this.show();
            }
        }

        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            this.hide();
        }

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            this.show();
        }
    }

    /** @internal This is an internal method. */
    @watch("open", { waitUntilFirstUpdate: true })
    async handleOpenChange() {
        if (this.open) {
            this.details.open = true;

            const pcShowEvent = emit(this, "pc-show", {
                cancelable: true,
            }) as unknown as Event;

            if (pcShowEvent.defaultPrevented) {
                this.open = false;
                this.details.open = false;
                return;
            }

            await stopAnimations(this.body);

            const { keyframes, options } = getAnimation(this, "details.show", {
                dir: this.localize.dir(),
            });

            await animateTo(
                this.body,
                shimKeyframesHeightAuto(keyframes, this.body.scrollHeight),
                options,
            );

            this.body.style.blockSize = "auto";
            emit(this, "pc-after-show");
        } else {
            const pcHide = emit(this, "pc-hide", {
                cancelable: true,
            }) as unknown as Event;

            if (pcHide.defaultPrevented) {
                this.details.open = true;
                this.open = true;
                return;
            }

            await stopAnimations(this.body);

            const { keyframes, options } = getAnimation(this, "details.hide", {
                dir: this.localize.dir(),
            });

            await animateTo(
                this.body,
                shimKeyframesHeightAuto(keyframes, this.body.scrollHeight),
                options,
            );

            this.body.style.blockSize = "auto";

            this.details.open = false;
            emit(this, "pc-after-hide");
        }
    }

    /** Shows the details. */
    async show() {
        if (this.open || this.disabled) {
            return undefined;
        }

        this.open = true;
        return waitForEvent(this, "pc-after-show");
    }

    /** Hides the details. */
    async hide() {
        if (!this.open || this.disabled) {
            return undefined;
        }

        this.open = false;
        return waitForEvent(this, "pc-after-hide");
    }

    render() {
        const isRTL = this.localize.dir() === "rtl";

        return html`
            <details
                part="base"
                class=${classMap({
                    "details": true,
                    "open": this.open,
                    "disabled": this.disabled,
                    "is-rtl": isRTL,
                })}
            >
                <summary
                    part="header"
                    class="header"
                    id="header"
                    role="button"
                    aria-expanded=${this.open ? "true" : "false"}
                    aria-controls="content"
                    aria-disabled=${this.disabled ? "true" : "false"}
                    tabindex=${this.disabled ? "-1" : "0"}
                    @click=${this.handleSummaryClick}
                    @keydown=${this.handleSummaryKeyDown}
                >
                    <slot class="summary" part="summary" name="summary">
                        ${this.summary}
                    </slot>

                    <span part="summary-icon" class="summary-icon">
                        <slot name="expand-icon">
                            <pc-icon
                                library="system"
                                icon-style="solid"
                                name=${isRTL ? "chevron-left" : "chevron-right"}
                            ></pc-icon>
                        </slot>
                        <slot name="collapse-icon">
                            <pc-icon
                                library="system"
                                icon-style="solid"
                                name=${isRTL ? "chevron-left" : "chevron-right"}
                            ></pc-icon>
                        </slot>
                    </span>
                </summary>

                <div
                    class="body"
                    part="body"
                    role="region"
                    aria-labelledby="header"
                >
                    <slot class="content" part="content" id="content"></slot>
                </div>
            </details>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-details": PcDetails;
    }
}
