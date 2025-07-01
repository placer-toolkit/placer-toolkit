import { getBasePath } from "./utilities/base-path.js";

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
        tagsToRegister.map((tagName) => register(tagName)),
    );
}

function register(tagName: string): Promise<void> {
    if (customElements.get(tagName)) {
        return Promise.resolve();
    }

    const tagWithoutPrefix = tagName.replace(/^pc-/i, "");
    const path = getBasePath(
        `components/${tagWithoutPrefix}/${tagWithoutPrefix}.js`,
    );

    return new Promise((resolve, reject) => {
        import(/* @vite-ignore */ path)
            .then(() => resolve())
            .catch((error) => {
                reject(new Error(`Unable to auto‐load <${tagName}>: ${error}`));
            });
    });
}

discover(document.body);

observer.observe(document.documentElement, { subtree: true, childList: true });
