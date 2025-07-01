export type PcAfterShowEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-after-show": PcAfterShowEvent;
    }
}
