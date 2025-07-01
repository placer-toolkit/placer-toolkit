import { PcDetails } from "./details.component.js";

export * from "./details.component.js";
export default PcDetails;

declare global {
    interface HTMLElementTagNameMap {
        "pc-details": PcDetails;
    }
}
