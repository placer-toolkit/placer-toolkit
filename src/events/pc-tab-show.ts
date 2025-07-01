export type PcTabShowEvent = CustomEvent<{ name: string }>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-tab-show": PcTabShowEvent;
    }
}
