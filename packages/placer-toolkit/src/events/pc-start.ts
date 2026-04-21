export class PcStartEvent extends Event {
    constructor() {
        super("pc-start", { bubbles: true, cancelable: false, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-start": PcStartEvent;
    }
}
