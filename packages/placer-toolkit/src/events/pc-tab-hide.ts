export class PcTabHideEvent extends Event {
    readonly detail: PcTabHideEventDetail;

    constructor(detail: PcTabHideEventDetail) {
        super("pc-tab-hide", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
        this.detail = detail;
    }
}

interface PcTabHideEventDetail {
    name: string;
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-tab-hide": PcTabHideEvent;
    }
}
