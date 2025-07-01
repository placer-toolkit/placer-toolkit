import { PcCopyButton } from "./copy-button.component.js";

export * from "./copy-button.component.js";
export default PcCopyButton;

declare global {
    interface HTMLElementTagNameMap {
        "pc-copy-button": PcCopyButton;
    }
}
