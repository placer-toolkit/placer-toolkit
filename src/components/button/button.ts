import { PcButton } from "./button.component.js";

export * from "./button.component.js";
export default PcButton;

declare global {
    interface HTMLElementTagNameMap {
        "pc-button": PcButton;
    }
}
