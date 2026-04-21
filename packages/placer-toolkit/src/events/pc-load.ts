export class PcLoadEvent extends Event {
    constructor() {
        super("pc-load", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-load": PcLoadEvent;
    }
}
