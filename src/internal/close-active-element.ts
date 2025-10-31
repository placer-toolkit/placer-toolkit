/**
 * Calls the `blur()` method on the current active element to see if it’s a child of the provided element. This is needed for fixing accessibility errors in the developer console.
 *
 * @param element - The element to check.
 */
export const blurActiveElement = (element: HTMLElement) => {
    const { activeElement } = document;

    if (activeElement && element.contains(activeElement)) {
        (document.activeElement as HTMLElement)?.blur();
    }
};
