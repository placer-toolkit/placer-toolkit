export function emit(
    target: EventTarget,
    eventName: string,
    eventDetail?: CustomEventInit,
): CustomEvent {
    const { detail, cancelable, ...rest } = eventDetail || {};

    const event = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: cancelable !== undefined ? cancelable : false,
        composed: true,
        detail: detail,
        ...rest,
    });

    target.dispatchEvent(event);

    return event;
}
