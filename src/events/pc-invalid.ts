export type PcInvalidEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-invalid": PcInvalidEvent;
    }
}
