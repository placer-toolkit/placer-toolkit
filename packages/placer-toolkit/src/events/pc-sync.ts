export class PcSyncEvent extends Event {
    readonly detail: PcSyncEventDetail;

    constructor(detail: PcSyncEventDetail) {
        super("pc-sync", { bubbles: false, cancelable: false, composed: true });
        this.detail = detail;
    }
}

interface PcSyncEventDetail {
    syncKey: string;
    panel: string;
    emitter: HTMLElement;
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-sync": PcSyncEvent;
    }
}
