export class PcRepositionEvent extends Event {
    constructor() {
        super("pc-reposition", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-reposition": PcRepositionEvent;
    }
}
