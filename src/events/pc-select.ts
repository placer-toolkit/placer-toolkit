export class PcSelectEvent extends Event {
    readonly detail;

    constructor(detail: PcSelectEventDetail) {
        super("pc-select", { bubbles: true, cancelable: true, composed: true });
        this.detail = detail;
    }
}

interface PcSelectEventDetail {
    item: Element;
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-select": PcSelectEvent;
    }
}
