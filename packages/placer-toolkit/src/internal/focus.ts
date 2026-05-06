/** Checks if an element or any of its children (including ones in the shadow DOM) are focusable. */
export function hasFocusableChild(node: Element, skipSelf = false): boolean {
    const focusableSelector = [
        'input:not([disabled]):not([type="hidden"])',
        "select:not([disabled])",
        "textarea:not([disabled])",
        "button:not([disabled])",
        "a[href]",
        "area[href]",
        "summary",
        "iframe",
        "object",
        "embed",
        "audio[controls]",
        "video[controls]",
        "[contenteditable]",
        '[tabindex]:not([tabindex="-1"]):not([disabled])',
    ]
        .map(
            (selector) =>
                `${selector}:not([hidden]):not([aria-hidden="true"]):not([inert])`,
        )
        .join(",");

    if (
        node.hasAttribute("hidden") ||
        node.getAttribute("aria-hidden") === "true" ||
        node.hasAttribute("inert") ||
        node.closest("[inert]")
    ) {
        return false;
    }

    if (!skipSelf && node.matches(focusableSelector)) {
        return true;
    }

    if (node.querySelector(focusableSelector)) {
        return true;
    }

    if (node.shadowRoot) {
        const shadowChildren = Array.from(node.shadowRoot.children);

        for (const child of shadowChildren) {
            if (hasFocusableChild(child)) {
                return true;
            }
        }
    }

    const lightChildren = Array.from(node.children);

    for (const child of lightChildren) {
        if (hasFocusableChild(child)) {
            return true;
        }
    }

    return false;
}
