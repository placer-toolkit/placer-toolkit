export class PcErrorEvent extends Event {
    constructor() {
        super("pc-error", { bubbles: true, cancelable: false, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-error": PcErrorEvent;
    }
}
