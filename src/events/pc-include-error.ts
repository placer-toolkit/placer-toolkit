export class PcIncludeErrorEvent extends Event {
    readonly detail: PcIncludeErrorDetail;

    constructor(detail: PcIncludeErrorDetail) {
        super("pc-include-error", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
        this.detail = detail;
    }
}

interface PcIncludeErrorDetail {
    status: number;
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-include-error": PcIncludeErrorEvent;
    }
}
