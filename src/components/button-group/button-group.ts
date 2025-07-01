import { PcButtonGroup } from "./button-group.component.js";

export * from "./button-group.component.js";
export default PcButtonGroup;

declare global {
    interface HTMLElementTagNameMap {
        "pc-button-group": PcButtonGroup;
    }
}
