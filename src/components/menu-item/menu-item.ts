import { PcMenuItem } from "./menu-item.component.js";

export * from "./menu-item.component.js";
export default PcMenuItem;

declare global {
    interface HTMLElementTagNameMap {
        "pc-menu-item": PcMenuItem;
    }
}
