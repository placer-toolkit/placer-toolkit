export type PcAfterCollapseEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-after-collapse": PcAfterCollapseEvent;
    }
}
