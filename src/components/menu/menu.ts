import { PcMenu } from "./menu.component.js";

export * from "./menu.component.js";
export default PcMenu;

declare global {
    interface HTMLElementTagNameMap {
        "pc-menu": PcMenu;
    }
}
