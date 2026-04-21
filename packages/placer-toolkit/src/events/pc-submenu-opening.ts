export class PcSubmenuOpeningEvent extends Event {
    readonly detail;

    constructor(detail: PcSubmenuOpeningEventDetail) {
        super("pc-submenu-opening", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
        this.detail = detail;
    }
}

interface PcSubmenuOpeningEventDetail {
    item: Element;
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-submenu-opening": PcSubmenuOpeningEvent;
    }
}
