export class PcIntersectEvent extends Event {
    readonly detail?: PcIntersectEventDetail;

    constructor(detail?: PcIntersectEventDetail) {
        super("pc-intersect", {
            bubbles: false,
            cancelable: false,
            composed: true,
        });
        this.detail = detail;
    }
}

interface PcIntersectEventDetail {
    entry?: IntersectionObserverEntry;
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-intersect": PcIntersectEvent;
    }
}
