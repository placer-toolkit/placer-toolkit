export type PcBlurEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-blur": PcBlurEvent;
    }
}
