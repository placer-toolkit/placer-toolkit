export type PcHoverEvent = CustomEvent<{
    phase: "start" | "move" | "end";
    value: number;
}>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-hover": PcHoverEvent;
    }
}
