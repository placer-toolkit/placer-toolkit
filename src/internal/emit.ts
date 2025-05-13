export function emit(
    target: EventTarget,
    eventName: string,
    eventDetail?: CustomEventInit
) {
    target.dispatchEvent(
        new CustomEvent(eventName, {
            bubbles: true,
            composed: true,
            ...eventDetail,
        })
    );
}

export function bindEmit(context: EventTarget) {
    return (eventName: string, eventDetail?: CustomEventInit) =>
        emit(context, eventName, eventDetail);
}
