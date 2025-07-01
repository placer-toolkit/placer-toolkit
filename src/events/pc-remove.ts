export type PcRemoveEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-remove": PcRemoveEvent;
    }
}
