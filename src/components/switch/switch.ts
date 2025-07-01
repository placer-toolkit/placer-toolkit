import { PcSwitch } from "./switch.component.js";

export * from "./switch.component.js";
export default PcSwitch;

declare global {
    interface HTMLElementTagNameMap {
        "pc-switch": PcSwitch;
    }
}
