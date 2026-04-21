export class PcAfterShowEvent extends Event {
    constructor() {
        super("pc-after-show", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-after-show": PcAfterShowEvent;
    }
}
