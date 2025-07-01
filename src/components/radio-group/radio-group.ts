import { PcRadioGroup } from "./radio-group.component.js";

export * from "./radio-group.component.js";
export default PcRadioGroup;

declare global {
    interface HTMLElementTagNameMap {
        "pc-radio-group": PcRadioGroup;
    }
}
