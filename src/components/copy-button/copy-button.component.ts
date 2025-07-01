import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
    getAnimation,
    setDefaultAnimation,
} from "../../utilities/animation-registry.js";
import { emit } from "../../internal/emit.js";
import { PcIcon } from "../icon/icon.js";
import { PcTooltip } from "../tooltip/tooltip.js";
import { styles } from "./copy-button.styles.js";

setDefaultAnimation("copy.in", {
    keyframes: [
        { scale: "0.6", opacity: "0" },
        { scale: "1.1", opacity: "1" },
        { scale: "0.95", opacity: "1" },
        { scale: "1", opacity: "1" },
    ],
    options: {
        duration: 350,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
});

setDefaultAnimation("copy.out", {
    keyframes: [
        { scale: "1", opacity: "1" },
        { scale: "0.85", opacity: "0" },
    ],
    options: {
        duration: 200,
        easing: "cubic-bezier(0.75, 0, 0.9, 0.05)",
    },
});

/**
 * @summary Copies text data to the clipboard when the user clicks the trigger.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-icon
 * @dependency pc-tooltip
 *
 * @slot copy-icon — The icon to show in the default copy state. Works best with `<pc-icon>`.
 * @slot success-icon — The icon to show when the content is copied. Works best with `<pc-icon>`.
 * @slot error-icon — The icon to show when a copy error occurs. Works best with `<pc-icon>`.
 *
 * @event pc-copy — Emitted when the data has been copied.
 * @event pc-error — Emitted when the data could not be copied.
 *
 * @csspart button — The internal `<button>` element.
 * @csspart copy-icon — The container that holds the copy icon.
 * @csspart success-icon — The container that holds the success icon.
 * @csspart error-icon — The container that holds the error icon.
 * @csspart tooltip__base — The tooltip’s `base` part.
 * @csspart tooltip__base__popup — The tooltip’s `popup` part.
 * @csspart tooltip__base__arrow — The tooltip’s `arrow` part.
 * @csspart tooltip__body — The tooltip’s `body` part.
 *
 * @cssproperty --success-color — The colour to use for success feedback.
 * @cssproperty --error-color — The colour to use for error feedback.
 *
 * @animation copy.in — The animation to use when the icons animate in.
 * @animation copy.out — The animation to use when the icons animate out.
 */
@customElement("pc-copy-button")
export class PcCopyButton extends LitElement {
    static styles: CSSResultGroup = styles;
    /** @internal This is an internal property. */
    static dependencies = { "pc-icon": PcIcon, "pc-tooltip": PcTooltip };

    /** @internal This is an internal property. */
    @query('slot[name="copy-icon"]') copyIcon!: HTMLSlotElement;
    /** @internal This is an internal property. */
    @query('slot[name="success-icon"]') successIcon!: HTMLSlotElement;
    /** @internal This is an internal property. */
    @query('slot[name="error-icon"]') errorIcon!: HTMLSlotElement;
    /** @internal This is an internal property. */
    @query("pc-tooltip") tooltip!: PcTooltip;

    /** @internal This is an internal property. */
    @state() isCopying = false;
    /** @internal This is an internal property. */
    @state() status: "rest" | "success" | "error" = "rest";

    /** The text value to copy. */
    @property() value = "";

    /**An id that references an element in the same document from which data will be copied. If both this and `value` are present, this value will take precedence. By default, the target element’s `textContent` will be copied. To copy an attribute, append the attribute name wrapped in square brackets (e.g., `from="element[value]"`). To copy a property, append a dot and the property name (e.g., `from="element.value"`). */
    @property() from = "";

    /** Disables the copy button. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** A custom label to show in the tooltip. */
    @property({ attribute: "copy-label" }) copyLabel = "";

    /** A custom label to show in the tooltip after copying. */
    @property({ attribute: "success-label" }) successLabel = "";

    /** A custom label to show in the tooltip when a copy error occurs. */
    @property({ attribute: "error-label" }) errorLabel = "";

    /** The length of time to show feedback before restoring the default trigger. */
    @property({ attribute: "feedback-duration", type: Number })
    feedbackDuration = 1000;

    /** The preferred placement of the tooltip. */
    @property({ attribute: "tooltip-placement" }) tooltipPlacement:
        | "top"
        | "right"
        | "bottom"
        | "left" = "top";

    /** Enable this option to prevent the tooltip from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all situations. */
    @property({ type: Boolean }) hoist = false;

    private async handleCopy() {
        if (this.disabled || this.isCopying) {
            return;
        }
        this.isCopying = true;

        let valueToCopy = this.value;

        if (this.from) {
            const root = this.getRootNode() as ShadowRoot | Document;

            const isProperty = this.from.includes(".");
            const isAttribute =
                this.from.includes("[") && this.from.includes("]");
            let id = this.from;
            let field = "";

            if (isProperty) {
                [id, field] = this.from.trim().split(".");
            } else if (isAttribute) {
                [id, field] = this.from.trim().replace(/\]$/, "").split("[");
            }

            const target =
                "getElementById" in root ? root.getElementById(id) : null;

            if (target) {
                if (isAttribute) {
                    valueToCopy = target.getAttribute(field) || "";
                } else if (isProperty) {
                    // @ts-expect-error — Accessing a property with dynamic types
                    valueToCopy = target[field] || "";
                } else {
                    valueToCopy = target.textContent || "";
                }
            } else {
                this.showStatus("error");
                emit(this, "pc-error");
            }
        }

        if (!valueToCopy) {
            this.showStatus("error");
            emit(this, "pc-error");
        } else {
            try {
                await navigator.clipboard.writeText(valueToCopy);
                this.showStatus("success");
                emit(this, "pc-copy", {
                    detail: {
                        value: valueToCopy,
                    },
                });
            } catch {
                this.showStatus("error");
                emit(this, "pc-error");
            }
        }
    }

    private async showStatus(status: "success" | "error") {
        const copyLabel = this.copyLabel || "Copy";
        const successLabel = this.successLabel || "Copied!";
        const errorLabel = this.errorLabel || "Error";
        const iconToShow =
            status === "success" ? this.successIcon : this.errorIcon;
        const showAnimation = getAnimation(this, "copy.in", { dir: "ltr" });
        const hideAnimation = getAnimation(this, "copy.out", { dir: "ltr" });

        this.tooltip.content = status === "success" ? successLabel : errorLabel;

        await this.copyIcon.animate(
            hideAnimation.keyframes,
            hideAnimation.options,
        ).finished;
        this.copyIcon.hidden = true;
        this.status = status;
        iconToShow.hidden = false;
        await iconToShow.animate(showAnimation.keyframes, showAnimation.options)
            .finished;

        setTimeout(async () => {
            await iconToShow.animate(
                hideAnimation.keyframes,
                hideAnimation.options,
            ).finished;
            iconToShow.hidden = true;
            this.status = "rest";
            this.copyIcon.hidden = false;
            await this.copyIcon.animate(
                showAnimation.keyframes,
                showAnimation.options,
            ).finished;

            this.tooltip.content = copyLabel;
            this.isCopying = false;
        }, this.feedbackDuration);
    }

    render() {
        const copyLabel = this.copyLabel || "Copy";

        return html`
            <pc-tooltip
                class=${classMap({
                    "copy-button-container": true,
                    "copy-button-success": this.status === "success",
                    "copy-button-error": this.status === "error",
                })}
                content=${copyLabel}
                placement=${this.tooltipPlacement}
                ?disabled=${this.disabled}
                ?hoist=${this.hoist}
                exportparts="
                    base:tooltip__base,
                    base-popup:tooltip__base__popup,
                    base-arrow:tooltip__base__arrow,
                    body:tooltip__body
                "
            >
                <button
                    class="copy-button"
                    type="button"
                    part="button"
                    ?disabled=${this.disabled}
                    @click=${this.handleCopy}
                >
                    <slot part="copy-icon" name="copy-icon">
                        <pc-icon
                            library="system"
                            icon-style="regular"
                            name="copy"
                        ></pc-icon>
                    </slot>
                    <slot part="success-icon" name="success-icon" hidden>
                        <pc-icon
                            library="system"
                            icon-style="solid"
                            name="check"
                        ></pc-icon>
                    </slot>
                    <slot part="error-icon" name="error-icon" hidden>
                        <pc-icon
                            library="system"
                            icon-style="solid"
                            name="xmark"
                        ></pc-icon>
                    </slot>
                </button>
            </pc-tooltip>
        `;
    }
}
