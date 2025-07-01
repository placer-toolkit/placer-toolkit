export type PcHideEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-hide": PcHideEvent;
    }
}
