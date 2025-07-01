export type PcCancelEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-cancel": PcCancelEvent;
    }
}
