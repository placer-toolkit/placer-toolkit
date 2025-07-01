export type PcChangeEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-change": PcChangeEvent;
    }
}
