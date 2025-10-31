/**
 * Use a generator so we can iterate and possibly break early.
 *
 * ```typescript
 * // This operates like a regular array. This kinda nullifies generator benefits, but worth knowing if you need the whole array.
 * const allActiveElements = [...activeElements()]
 *
 * // Early return
 * for (const activeElement of activeElements()) {
 *     if (<condition>) {
 *         // Break the loop, you don’t need to iterate over the whole array or store an array in memory!
 *         break;
 *     }
 * }
 * ```
 */
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
