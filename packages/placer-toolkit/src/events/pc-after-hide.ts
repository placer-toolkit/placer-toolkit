export class PcAfterHideEvent extends Event {
    constructor() {
        super("pc-after-hide", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-after-hide": PcAfterHideEvent;
    }
}
