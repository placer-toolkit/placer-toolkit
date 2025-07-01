export type PcCollapseEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-collapse": PcCollapseEvent;
    }
}
