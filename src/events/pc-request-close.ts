export type PcRequestCloseEvent = CustomEvent<{
    source: "close-button" | "keyboard" | "overlay";
}>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-request-close": PcRequestCloseEvent;
    }
}
