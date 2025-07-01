export type PcCloseEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-close": PcCloseEvent;
    }
}
