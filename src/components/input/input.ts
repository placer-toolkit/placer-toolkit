import { PcInput } from "./input.component.js";

export * from "./input.component.js";
export default PcInput;

declare global {
    interface HTMLElementTagNameMap {
        "pc-input": PcInput;
    }
}
