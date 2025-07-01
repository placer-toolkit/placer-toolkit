export type PcInitialFocusEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-initial-focus": PcInitialFocusEvent;
    }
}
