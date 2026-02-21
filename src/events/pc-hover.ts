interface PcHoverEventDetail {
    phase: "start" | "move" | "end";
    value: number;
}

export class PcHoverEvent extends Event {
    readonly detail: PcHoverEventDetail;

    constructor(detail: PcHoverEventDetail) {
        super("pc-hover", { bubbles: true, cancelable: false, composed: true });
        this.detail = detail;
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-hover": PcHoverEvent;
    }
}
