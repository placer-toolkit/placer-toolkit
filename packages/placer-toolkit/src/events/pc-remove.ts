export class PcRemoveEvent extends Event {
    constructor() {
        super("pc-remove", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-remove": PcRemoveEvent;
    }
}
