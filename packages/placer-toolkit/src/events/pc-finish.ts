export class PcFinishEvent extends Event {
    constructor() {
        super("pc-finish", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-finish": PcFinishEvent;
    }
}
