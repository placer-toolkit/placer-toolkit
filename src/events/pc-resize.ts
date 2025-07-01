export type PcResizeEvent = CustomEvent<{ entries: ResizeObserverEntry[] }>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-resize": PcResizeEvent;
    }
}
