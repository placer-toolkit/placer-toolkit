export class PcCloseEvent extends Event {
    constructor() {
        super("pc-close", { bubbles: true, cancelable: false, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-close": PcCloseEvent;
    }
}
