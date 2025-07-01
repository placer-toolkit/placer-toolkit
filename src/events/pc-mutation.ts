export type PcMutationEvent = CustomEvent<{ mutationList: MutationRecord[] }>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-mutation": PcMutationEvent;
    }
}
