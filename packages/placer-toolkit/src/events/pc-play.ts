export class PcPlayEvent extends Event {
    constructor() {
        super("pc-play", { bubbles: true, cancelable: true, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-play": PcPlayEvent;
    }
}
