export const blurActiveElement = (element: HTMLElement) => {
    const { activeElement } = document;

    if (activeElement && element.contains(activeElement)) {
        (document.activeElement as HTMLElement)?.blur();
    }
};
