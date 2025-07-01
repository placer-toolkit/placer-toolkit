import { PcCallout } from "./callout.component.js";

export * from "./callout.component.js";
export default PcCallout;

declare global {
    interface HTMLElementTagNameMap {
        "pc-callout": PcCallout;
    }
}
