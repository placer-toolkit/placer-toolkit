const computedStyleMap = new WeakMap<Element, CSSStyleDeclaration>();

function getCachedComputedStyle(el: HTMLElement): CSSStyleDeclaration {
    let computedStyle: undefined | CSSStyleDeclaration =
        computedStyleMap.get(el);

    if (!computedStyle) {
        computedStyle = window.getComputedStyle(el, null);
        computedStyleMap.set(el, computedStyle);
    }

    return computedStyle;
}

function isVisible(element: HTMLElement): boolean {
    if (typeof element.checkVisibility === "function") {
        return element.checkVisibility({
            checkOpacity: false,
            checkVisibilityCSS: true,
        });
    }

    const computedStyle = getCachedComputedStyle(element);

    return (
        computedStyle.visibility !== "hidden" &&
        computedStyle.display !== "none"
    );
}

function isOverflowingAndTabbable(element: HTMLElement): boolean {
    const computedStyle = getCachedComputedStyle(element);

    const { overflowY, overflowX } = computedStyle;

    if (overflowY === "scroll" || overflowX === "scroll") {
        return true;
    }

    if (overflowY !== "auto" || overflowX !== "auto") {
        return false;
    }

    const isOverflowingY = element.scrollHeight > element.clientHeight;

    if (isOverflowingY && overflowY === "auto") {
        return true;
    }

    const isOverflowingX = element.scrollWidth > element.clientWidth;

    if (isOverflowingX && overflowX === "auto") {
        return true;
    }

    return false;
}

function isTabbable(element: HTMLElement) {
    const tag = element.tagName.toLowerCase();

    const tabindex = Number(element.getAttribute("tabindex"));
    const hasTabindex = element.hasAttribute("tabindex");

    if (hasTabindex && (isNaN(tabindex) || tabindex <= -1)) {
        return false;
    }

    if (element.hasAttribute("disabled")) {
        return false;
    }

    if (element.closest("[inert]")) {
        return false;
    }

    if (tag === "input" && element.getAttribute("type") === "radio") {
        const rootNode = element.getRootNode() as HTMLElement;

        const findRadios = `input[type='radio'][name="${element.getAttribute(
            "name"
        )}"]`;
        const firstChecked = rootNode.querySelector(`${findRadios}:checked`);

        if (firstChecked) {
            return firstChecked === element;
        }

        const firstRadio = rootNode.querySelector(findRadios);

        return firstRadio === element;
    }

    if (!isVisible(element)) {
        return false;
    }

    if (
        (tag === "audio" || tag === "video") &&
        element.hasAttribute("controls")
    ) {
        return true;
    }

    if (element.hasAttribute("tabindex")) {
        return true;
    }

    if (
        element.hasAttribute("contenteditable") &&
        element.getAttribute("contenteditable") !== "false"
    ) {
        return true;
    }

    const isNativelyTabbable = [
        "button",
        "input",
        "select",
        "textarea",
        "a",
        "audio",
        "video",
        "summary",
        "iframe",
    ].includes(tag);

    if (isNativelyTabbable) {
        return true;
    }

    return isOverflowingAndTabbable(element);
}

export function getTabbableBoundary(root: HTMLElement | ShadowRoot) {
    const tabbableElements = getTabbableElements(root);

    const start = tabbableElements[0] ?? null;
    const end = tabbableElements[tabbableElements.length - 1] ?? null;

    return { start, end };
}

function getSlottedChildrenOutsideRootElement(
    slotElement: HTMLSlotElement,
    root: HTMLElement | ShadowRoot
) {
    return (
        (slotElement.getRootNode({ composed: true }) as ShadowRoot | null)
            ?.host !== root
    );
}

export function getTabbableElements(root: HTMLElement | ShadowRoot) {
    const walkedElements = new WeakMap();
    const tabbableElements: HTMLElement[] = [];

    function walk(element: HTMLElement | ShadowRoot) {
        if (element instanceof Element) {
            if (element.hasAttribute("inert") || element.closest("[inert]")) {
                return;
            }

            if (walkedElements.has(element)) {
                return;
            }

            walkedElements.set(element, true);

            if (!tabbableElements.includes(element) && isTabbable(element)) {
                tabbableElements.push(element);
            }

            if (
                element instanceof HTMLSlotElement &&
                getSlottedChildrenOutsideRootElement(element, root)
            ) {
                element
                    .assignedElements({ flatten: true })
                    .forEach((assignedElement) => {
                        if (assignedElement instanceof HTMLElement) {
                            walk(assignedElement);
                        }
                    });
            }

            if (
                element.shadowRoot !== null &&
                element.shadowRoot.mode === "open"
            ) {
                walk(element.shadowRoot);
            }
        }

        for (const e of Array.from(element.children)) {
            walk(e as HTMLElement);
        }
    }

    walk(root);

    return tabbableElements.sort((a, b) => {
        const aTabindex = Number(a.getAttribute("tabindex")) || 0;
        const bTabindex = Number(b.getAttribute("tabindex")) || 0;
        return bTabindex - aTabindex;
    });
}
