import { PcCheckbox } from "./checkbox.component.js";

export * from "./checkbox.component.js";
export default PcCheckbox;

declare global {
    interface HTMLElementTagNameMap {
        "pc-checkbox": PcCheckbox;
    }
}
