export type PcLazyChangeEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-lazy-change": PcLazyChangeEvent;
    }
}
