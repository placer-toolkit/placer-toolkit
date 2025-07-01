import { PcDivider } from "./divider.component.js";

export * from "./divider.component.js";
export default PcDivider;

declare global {
    interface HTMLElementTagNameMap {
        "pc-divider": PcDivider;
    }
}
