import { PcDialog } from "./dialog.component.js";

export * from "./dialog.component.js";
export default PcDialog;

declare global {
    interface HTMLElementTagNameMap {
        "pc-dialog": PcDialog;
    }
}
