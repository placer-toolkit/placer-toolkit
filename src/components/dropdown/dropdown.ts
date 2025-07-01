import { PcDropdown } from "./dropdown.component.js";

export * from "./dropdown.component.js";
export default PcDropdown;

declare global {
    interface HTMLElementTagNameMap {
        "pc-dropdown": PcDropdown;
    }
}
