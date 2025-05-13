import { CSSResultGroup, LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./visually-hidden.styles.ts";

@customElement("pc-visually-hidden")
export class PcVisuallyHidden extends LitElement {
    static styles: CSSResultGroup = styles;

    render() {
        return html`<slot></slot>`;
    }
}
