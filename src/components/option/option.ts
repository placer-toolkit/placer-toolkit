import { PcOption } from "./option.component.js";

export * from "./option.component.js";
export default PcOption;

declare global {
    interface HTMLElementTagNameMap {
        "pc-option": PcOption;
    }
}
