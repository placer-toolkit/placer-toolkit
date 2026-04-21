export class PcShowEvent extends Event {
    constructor() {
        super("pc-show", { bubbles: true, cancelable: true, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-show": PcShowEvent;
    }
}
