export class PcMutationEvent extends Event {
    readonly detail: PcMutationEventDetail;

    constructor(detail: PcMutationEventDetail) {
        super("pc-mutation", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
        this.detail = detail;
    }
}

interface PcMutationEventDetail {
    mutationList: MutationRecord[];
}

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-mutation": PcMutationEvent;
    }
}
