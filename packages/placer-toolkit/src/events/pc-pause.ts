export class PcPauseEvent extends Event {
    constructor() {
        super("pc-pause", { bubbles: true, cancelable: true, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-pause": PcPauseEvent;
    }
}
