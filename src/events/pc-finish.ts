export type PcFinishEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-finish": PcFinishEvent;
    }
}
