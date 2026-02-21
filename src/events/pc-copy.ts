export class PcCopyEvent extends Event {
    readonly detail: PcCopyErrorEventDetail;
    constructor(detail: PcCopyErrorEventDetail) {
        super("pc-copy", { bubbles: true, cancelable: false, composed: true });
        this.detail = detail;
    }
}

interface PcCopyErrorEventDetail {
    value: string;
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-copy": PcCopyEvent;
    }
}
