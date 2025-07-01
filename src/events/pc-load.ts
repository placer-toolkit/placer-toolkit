export type PcLoadEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-load": PcLoadEvent;
    }
}
