import { CSSResultGroup, LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./spinner.styles.js";

@customElement("pc-spinner")
export class PcSpinner extends LitElement {
    static styles: CSSResultGroup = styles;

    render() {
        return html`
            <svg
                class="spinner"
                part="base"
                role="progressbar"
                aria-label="Loading…"
            >
                <circle class="track"></circle>
                <circle class="indicator"></circle>
            </svg>
        `;
    }
}
