export type PcErrorEvent = CustomEvent<{ status?: number }>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-error": PcErrorEvent;
    }
}
