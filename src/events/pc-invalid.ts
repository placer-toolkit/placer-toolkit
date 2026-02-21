export class PcInvalidEvent extends Event {
    constructor() {
        super("pc-invalid", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-invalid": PcInvalidEvent;
    }
}
