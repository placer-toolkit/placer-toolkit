import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import appearanceStyles from "../../styles/utilities/appearance.css";
import styles from "./badge.css";

/**
 * @summary Badges are used to draw attention and display statuses or counts.
 * @status experimental
 * @since 0.1.0
 *
 * @slot - The badge’s content.
 *
 * @csspart base - The component’s base wrapper.
 */
@customElement("pc-badge")
export class PcBadge extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = [appearanceStyles, styles];

    /** The badge’s appearance. */
    @property({ reflect: true }) appearance:
        | "primary"
        | "success"
        | "neutral"
        | "warning"
        | "danger" = "primary";

    /** The badge’s variant. */
    @property({ reflect: true }) variant: "accent" | "filled" | "outlined" =
        "accent";

    /** Gives the badge a rounded rectangle shape. */
    @property({ type: Boolean, reflect: true }) rounded = false;

    /** Makes the badge pulsate to draw attention. */
    @property({ type: Boolean, reflect: true }) pulse = false;

    render() {
        return html`<slot part="base" role="status"></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-badge": PcBadge;
    }
}
