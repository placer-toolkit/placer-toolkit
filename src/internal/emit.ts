export function emit(
    target: EventTarget,
    eventName: string,
    eventDetail?: CustomEventInit,
) {
    target.dispatchEvent(
        new CustomEvent(eventName, {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {},
            ...eventDetail,
        }),
    );

    return target;
}

export function bindEmit(context: EventTarget) {
    return (eventName: string, eventDetail?: CustomEventInit) =>
        emit(context, eventName, eventDetail);
}
