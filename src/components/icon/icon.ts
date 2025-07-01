import { PcIcon } from "./icon.component.js";

export * from "./icon.component.js";
export default PcIcon;

declare global {
    interface HTMLElementTagNameMap {
        "pc-icon": PcIcon;
    }
}
