export class PcCollapseEvent extends Event {
    constructor() {
        super("pc-collapse", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-collapse": PcCollapseEvent;
    }
}
