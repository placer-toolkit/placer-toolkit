import { PcTooltip } from "./tooltip.component.js";

export * from "./tooltip.component.js";
export default PcTooltip;

declare global {
    interface HTMLElementTagNameMap {
        "pc-tooltip": PcTooltip;
    }
}
