export type PcAfterHideEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-after-hide": PcAfterHideEvent;
    }
}
