export class PcAfterExpandEvent extends Event {
    constructor() {
        super("pc-after-expand", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-after-expand": PcAfterExpandEvent;
    }
}
