export type PcFocusEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-focus": PcFocusEvent;
    }
}
