export class PcExpandEvent extends Event {
    constructor() {
        super("pc-expand", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-expand": PcExpandEvent;
    }
}
