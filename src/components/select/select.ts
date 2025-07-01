import { PcSelect } from "./select.component.js";

export * from "./select.component.js";
export default PcSelect;

declare global {
    interface HTMLElementTagNameMap {
        "pc-select": PcSelect;
    }
}
