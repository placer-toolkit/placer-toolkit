import { PcTabGroup } from "./tab-group.component.js";

export * from "./tab-group.component.js";
export default PcTabGroup;

declare global {
    interface HTMLElementTagNameMap {
        "pc-tab-group": PcTabGroup;
    }
}
