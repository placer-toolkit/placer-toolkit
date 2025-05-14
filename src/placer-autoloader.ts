const observer = new MutationObserver((mutations) => {
    for (const { addedNodes } of mutations) {
        for (const node of Array.from(addedNodes)) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                discover(node as Element);
            }
        }
    }
});

export async function discover(root: Element | ShadowRoot) {
    const rootTagName =
        root instanceof Element ? root.tagName.toLowerCase() : "";
    const rootIsPlacerElement = rootTagName?.startsWith("pc-");
    const tags = Array.from(root.querySelectorAll(":not(:defined)"))
        .map((element) => element.tagName.toLowerCase())
        .filter((tag) => tag.startsWith("pc-"));

    if (rootIsPlacerElement && !customElements.get(rootTagName)) {
        tags.push(rootTagName);
    }

    const tagsToRegister = [...new Set(tags)];

    await Promise.allSettled(
        tagsToRegister.map((tagName) => register(tagName))
    );
}

// Giving an object of all the components helps with loading speeds
const components = {
    "pc-avatar": () => import("./components/avatar/avatar.js"),
    "pc-badge": () => import("./components/badge/badge.js"),
    "pc-button": () => import("./components/button/button.js"),
    "pc-card": () => import("./components/card/card.js"),
    "pc-checkbox": () => import("./components/checkbox/checkbox.js"),
    "pc-icon": () => import("./components/icon/icon.js"),
    "pc-icon-button": () => import("./components/icon-button/icon-button.js"),
    "pc-qr-code": () => import("./components/qr-code/qr-code.js"),
    "pc-rating": () => import("./components/rating/rating.js"),
    "pc-resize-observer": () =>
        import("./components/resize-observer/resize-observer.js"),
    "pc-spinner": () => import("./components/spinner/spinner.js"),
    "pc-switch": () => import("./components/switch/switch.js"),
    "pc-tab": () => import("./components/tab/tab.js"),
    "pc-tab-group": () => import("./components/tab-group/tab-group.js"),
    "pc-tab-panel": () => import("./components/tab-panel/tab-panel.js"),
    "pc-visually-hidden": () =>
        import("./components/visually-hidden/visually-hidden.js"),
};

async function register(tagName: string): Promise<void> {
    if (customElements.get(tagName)) {
        return Promise.resolve();
    }

    const componentImport = components[tagName as keyof typeof components];

    if (componentImport) {
        try {
            await componentImport();
        } catch (error) {
            throw new Error(`Unable to auto‐load <${tagName}>: ${error}`);
        }
    } else {
        throw new Error(`Component ${tagName} not registered.`);
    }
}

discover(document.body);

observer.observe(document.documentElement, { subtree: true, childList: true });
