import { PcDrawer } from "./drawer.component.js";

export * from "./drawer.component.js";
export default PcDrawer;

declare global {
    interface HTMLElementTagNameMap {
        "pc-drawer": PcDrawer;
    }
}
