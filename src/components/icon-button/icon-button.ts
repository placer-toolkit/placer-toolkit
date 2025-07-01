import { PcIconButton } from "./icon-button.component.js";

export * from "./icon-button.component.js";
export default PcIconButton;

declare global {
    interface HTMLElementTagNameMap {
        "pc-icon-button": PcIconButton;
    }
}
