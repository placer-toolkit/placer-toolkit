import { PcSpinner } from "./spinner.component.js";

export * from "./spinner.component.js";
export default PcSpinner;

declare global {
    interface HTMLElementTagNameMap {
        "pc-spinner": PcSpinner;
    }
}
