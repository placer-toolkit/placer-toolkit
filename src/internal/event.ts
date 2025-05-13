export function waitForEvent(element: HTMLElement, eventName: string) {
    return new Promise<void>((resolve) => {
        function done(event: Event) {
            if (event.target === element) {
                element.removeEventListener(eventName, done);
                resolve();
            }
        }

        element.addEventListener(eventName, done);
    });
}
