import { CSSResultGroup, LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styles } from "./badge.styles.ts";

@customElement("pc-badge")
export class PcBadge extends LitElement {
    static styles: CSSResultGroup = styles;

    @property({ reflect: true }) appearance:
        | "primary"
        | "success"
        | "neutral"
        | "warning"
        | "danger" = "primary";

    @property({ type: Boolean, reflect: true }) rounded = false;

    @property({ type: Boolean, reflect: true }) pulse = false;

    render() {
        return html`
            <span
                part="base"
                class=${classMap({
                    "appearance-primary": this.appearance === "primary",
                    "appearance-success": this.appearance === "success",
                    "appearance-neutral": this.appearance === "neutral",
                    "appearance-warning": this.appearance === "warning",
                    "appearance-danger": this.appearance === "danger",
                    "rounded": this.rounded === true,
                    "pulse": this.pulse === true,
                })}
                role="status"
            >
                <slot></slot>
            </span>
        `;
    }
}
