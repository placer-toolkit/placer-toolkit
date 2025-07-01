import { PcResizeObserver } from "./resize-observer.component.js";

export * from "./resize-observer.component.js";
export default PcResizeObserver;

declare global {
    interface HTMLElementTagNameMap {
        "pc-resize-observer": PcResizeObserver;
    }
}
