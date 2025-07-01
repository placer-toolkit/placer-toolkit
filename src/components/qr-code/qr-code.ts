import { PcQrCode } from "./qr-code.component.js";

export * from "./qr-code.component.js";
export default PcQrCode;

declare global {
    interface HTMLElementTagNameMap {
        "pc-qr-code": PcQrCode;
    }
}
