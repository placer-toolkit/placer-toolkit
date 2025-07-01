import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styles } from "./badge.styles.js";

/**
 * @summary Badges are used to draw attention and display statuses or counts.
 * @status experimental
 * @since 0.1.0
 *
 * @slot — The badge’s content.
 *
 * @csspart base — The component’s base wrapper.
 */
@customElement("pc-badge")
export class PcBadge extends LitElement {
    static styles: CSSResultGroup = styles;

    /** The badge’s appearance. */
    @property({ reflect: true }) appearance:
        | "primary"
        | "success"
        | "neutral"
        | "warning"
        | "danger" = "primary";

    /** Gives the badge a rounded rectangle shape. */
    @property({ type: Boolean, reflect: true }) rounded = false;

    /** Makes the badge pulsate to draw attention. */
    @property({ type: Boolean, reflect: true }) pulse = false;

    render() {
        return html`
            <span
                part="base"
                class=${classMap({
                    "badge": true,
                    "badge-primary": this.appearance === "primary",
                    "badge-success": this.appearance === "success",
                    "badge-neutral": this.appearance === "neutral",
                    "badge-warning": this.appearance === "warning",
                    "badge-danger": this.appearance === "danger",
                    "badge-rounded": this.rounded === true,
                    "badge-pulse": this.pulse === true,
                })}
                role="status"
            >
                <slot></slot>
            </span>
        `;
    }
}
