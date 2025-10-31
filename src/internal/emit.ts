/** Emits a custom event with convenient defaults. */
export function emit(
    target: EventTarget,
    eventName: string,
    eventDetail?: CustomEventInit,
): CustomEvent {
    const { detail, cancelable, ...options } = eventDetail || {};

    const event = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: cancelable !== undefined ? cancelable : false,
        composed: true,
        detail: detail,
        ...options,
    });

    target.dispatchEvent(event);

    return event;
}
