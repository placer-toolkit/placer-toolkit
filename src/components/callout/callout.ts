import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import appearanceStyles from "../../styles/utilities/appearance.css";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./callout.css";

/**
 * @summary Callouts are used to display important messages inline.
 * @status experimental
 * @since 0.5.1
 *
 * @slot - The callout’s content.
 * @slot icon - An informational icon.
 *
 * @csspart base - The component’s base wrapper.
 * @csspart icon - The callout’s icon.
 * @csspart message - The callout’s content.
 */
@customElement("pc-callout")
export class PcCallout extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = [appearanceStyles, sizeStyles, styles];

    /** The callout’s appearance. */
    @property({ reflect: true }) appearance:
        | "primary"
        | "success"
        | "neutral"
        | "warning"
        | "danger" = "primary";

    /** The callout’s variant. */
    @property({ reflect: true }) variant:
        | "accent"
        | "filled"
        | "outlined"
        | "plain"
        | "accent outlined"
        | "filled outlined" = "filled outlined";

    /** The callout’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    render() {
        return html`
            <aside part="base" class="callout" aria-live="polite">
                <div part="icon">
                    <slot name="icon" aria-hidden="true"></slot>
                </div>

                <div part="message">
                    <slot></slot>
                </div>
            </aside>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-callout": PcCallout;
    }
}
