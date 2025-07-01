import { PcRadioButton } from "./radio-button.component.js";

export * from "./radio-button.component.js";
export default PcRadioButton;

declare global {
    interface HTMLElementTagNameMap {
        "pc-radio-button": PcRadioButton;
    }
}
