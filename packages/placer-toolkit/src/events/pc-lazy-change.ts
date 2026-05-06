export class PcLazyChangeEvent extends Event {
    constructor() {
        super("pc-lazy-change", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-lazy-change": PcLazyChangeEvent;
    }
}
