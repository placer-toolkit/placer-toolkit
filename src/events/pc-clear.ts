export type PcClearEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-clear": PcClearEvent;
    }
}
