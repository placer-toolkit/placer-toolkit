import { PcBadge } from "./badge.component.js";

export * from "./badge.component.js";
export default PcBadge;

declare global {
    interface HTMLElementTagNameMap {
        "pc-badge": PcBadge;
    }
}
