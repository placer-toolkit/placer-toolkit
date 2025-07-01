import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./menu-label.styles.js";

/**
 * @summary Menu labels are used to describe a group of menu items.
 * @status experimental
 * @since 0.5.1
 *
 * @slot — The menu label’s content.
 *
 * @csspart base — The component’s base wrapper.
 */
@customElement("pc-menu-label")
export class PcMenuLabel extends LitElement {
    static styles: CSSResultGroup = styles;

    render() {
        return html`<slot part="base" class="menu-label"></slot>`;
    }
}
