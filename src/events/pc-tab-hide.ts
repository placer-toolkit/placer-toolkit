export type PcTabHideEvent = CustomEvent<{ name: string }>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-tab-hide": PcTabHideEvent;
    }
}
