export class PcLazyLoadEvent extends Event {
    constructor() {
        super("pc-lazy-load", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-lazy-load": PcLazyLoadEvent;
    }
}
