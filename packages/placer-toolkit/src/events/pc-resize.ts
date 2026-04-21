export class PcResizeEvent extends Event {
    readonly detail: PcResizeEventDetail;

    constructor(detail: PcResizeEventDetail) {
        super("pc-resize", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
        this.detail = detail;
    }
}

interface PcResizeEventDetail {
    entries: ResizeObserverEntry[];
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-resize": PcResizeEvent;
    }
}
