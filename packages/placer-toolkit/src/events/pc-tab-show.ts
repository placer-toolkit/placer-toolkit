export class PcTabShowEvent extends Event {
    readonly detail: PcTabShowEventDetail;

    constructor(detail: PcTabShowEventDetail) {
        super("pc-tab-show", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
        this.detail = detail;
    }
}

interface PcTabShowEventDetail {
    name: string;
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-tab-show": PcTabShowEvent;
    }
}
