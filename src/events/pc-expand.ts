export type PcExpandEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-expand": PcExpandEvent;
    }
}
