export class PcCancelEvent extends Event {
    constructor() {
        super("pc-cancel", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-cancel": PcCancelEvent;
    }
}
