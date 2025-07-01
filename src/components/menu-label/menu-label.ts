import { PcMenuLabel } from "./menu-label.component.js";

export * from "./menu-label.component.js";
export default PcMenuLabel;

declare global {
    interface HTMLElementTagNameMap {
        "pc-menu-label": PcMenuLabel;
    }
}
