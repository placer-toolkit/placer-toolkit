import { PcComparer } from "./comparer.component.js";

export * from "./comparer.component.js";
export default PcComparer;

declare global {
    interface HTMLElementTagNameMap {
        "pc-comparer": PcComparer;
    }
}
