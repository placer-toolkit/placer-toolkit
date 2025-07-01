import { PcTabPanel } from "./tab-panel.component.js";

export * from "./tab-panel.component.js";
export default PcTabPanel;

declare global {
    interface HTMLElementTagNameMap {
        "pc-tab-panel": PcTabPanel;
    }
}
