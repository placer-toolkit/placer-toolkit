export class PcClearEvent extends Event {
    constructor() {
        super("pc-clear", { bubbles: true, cancelable: false, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-clear": PcClearEvent;
    }
}
