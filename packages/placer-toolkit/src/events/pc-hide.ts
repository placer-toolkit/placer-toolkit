export class PcHideEvent extends Event {
    readonly detail: PcHideEventDetails | undefined;

    constructor(detail?: PcHideEventDetails) {
        super("pc-hide", { bubbles: true, cancelable: true, composed: true });
        this.detail = detail;
    }
}

interface PcHideEventDetails {
    source: Element;
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-hide": PcHideEvent;
    }
}
