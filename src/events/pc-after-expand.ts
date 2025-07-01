export type PcAfterExpandEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-after-expand": PcAfterExpandEvent;
    }
}
