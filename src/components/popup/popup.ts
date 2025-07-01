//! Popup is a low‐level utility built specifically for positioning elements. Do not mistake it for a tooltip or similar because it does not facilitate an accessible experience! Almost every correct usage of it will involve building other components. It should rarely, if ever, occur directly in your HTML.

import { PcPopup } from "./popup.component.js";

export * from "./popup.component.js";
export default PcPopup;

declare global {
    interface HTMLElementTagNameMap {
        "pc-popup": PcPopup;
    }
}
