import { PcRadio } from "./radio.component.js";

export * from "./radio.component.js";
export default PcRadio;

declare global {
    interface HTMLElementTagNameMap {
        "pc-radio": PcRadio;
    }
}
