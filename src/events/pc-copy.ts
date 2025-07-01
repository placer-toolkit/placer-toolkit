export type PcCopyEvent = CustomEvent<{ value: string }>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-copy": PcCopyEvent;
    }
}
