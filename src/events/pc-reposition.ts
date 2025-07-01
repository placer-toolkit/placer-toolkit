export type PcRepositionEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-reposition": PcRepositionEvent;
    }
}
