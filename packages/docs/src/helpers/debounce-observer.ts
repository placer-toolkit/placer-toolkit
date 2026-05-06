const onIdle =
    window.requestIdleCallback || ((callback) => setTimeout(callback, 1));
const cancelIdle = window.cancelIdleCallback || clearTimeout;

export function debounceObserver(
    elementResizedFunction: (element: Element) => void,
) {
    const elementsToUpdate = new Set<Element>();

    let updateTimeout: ReturnType<typeof setTimeout> | undefined;
    let taskID: number | undefined;

    const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => elementsToUpdate.add(entry.target));

        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }

        if (taskID) {
            cancelIdle(taskID);
        }

        updateTimeout = setTimeout(() => {
            if (taskID) {
                cancelIdle(taskID);
            }

            taskID = onIdle(() => {
                elementsToUpdate.forEach((element) =>
                    elementResizedFunction(element),
                );
                elementsToUpdate.clear();
            });
        }, 250);
    });
    return resizeObserver;
}
