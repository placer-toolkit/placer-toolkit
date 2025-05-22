export function* activeElements(
    activeElement: Element | null = document.activeElement,
): Generator<Element> {
    if (activeElement === null || activeElement === undefined) {
        return;
    }

    yield activeElement;

    if (
        "shadowRoot" in activeElement &&
        activeElement.shadowRoot &&
        activeElement.shadowRoot.mode !== "closed"
    ) {
        yield* activeElements(activeElement.shadowRoot.activeElement);
    }
}

export function getDeepestActiveElement() {
    return [...activeElements()].pop();
}
