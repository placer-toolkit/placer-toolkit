import { PcTab } from "./tab.component.js";

export * from "./tab.component.js";
export default PcTab;

declare global {
    interface HTMLElementTagNameMap {
        "pc-tab": PcTab;
    }
}
