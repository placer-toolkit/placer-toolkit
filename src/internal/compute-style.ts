export const computedStyleMap = new WeakMap<Element, CSSStyleDeclaration>();

export function getComputedStyle(element: Element): CSSStyleDeclaration | null {
    let computedStyle: undefined | CSSStyleDeclaration =
        computedStyleMap.get(element);

    if (!computedStyle && globalThis.window) {
        computedStyle = window.getComputedStyle(element);

        computedStyleMap.set(element, computedStyle);
    }

    return computedStyle ?? null;
}
