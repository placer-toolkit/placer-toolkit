import { LitElement, html, nothing } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styles } from "./callout.styles.js";

/**
 * @summary Callouts are used to display important messages inline.
 * @status experimental
 * @since 0.5.1
 *
 * @slot — The callout’s content.
 * @slot icon — An informational icon.
 *
 * @csspart base — The component’s base wrapper.
 * @csspart icon — The callout’s icon.
 * @csspart message — The callout’s content.
 */
@customElement("pc-callout")
export class PcCallout extends LitElement {
    static styles: CSSResultGroup = styles;

    /** The callout’s appearance. */
    @property() appearance:
        | "primary"
        | "success"
        | "neutral"
        | "warning"
        | "danger" = "primary";

    /** @internal This is an internal property. */
    get isCritical() {
        return this.appearance === "warning" || this.appearance === "danger";
    }

    render() {
        return html`
            <aside
                part="base"
                class=${classMap({
                    "callout": true,
                    "callout-primary": this.appearance === "primary",
                    "callout-success": this.appearance === "success",
                    "callout-neutral": this.appearance === "neutral",
                    "callout-warning": this.appearance === "warning",
                    "callout-danger": this.appearance === "danger",
                })}
                role=${this.isCritical ? "alert" : nothing}
                aria-live=${this.isCritical ? "assertive" : "polite"}
            >
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
