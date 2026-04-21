export class PcAfterCollapseEvent extends Event {
    constructor() {
        super("pc-after-collapse", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-after-collapse": PcAfterCollapseEvent;
    }
}
