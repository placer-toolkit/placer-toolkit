export type PcLazyLoadEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-lazy-load": PcLazyLoadEvent;
    }
}
