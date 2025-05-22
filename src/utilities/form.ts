import { formCollections } from "../internal/form.js";

export function serialize(form: HTMLFormElement) {
    const formData = new FormData(form);
    const object: Record<string, unknown> = {};

    formData.forEach((value, key) => {
        if (Reflect.has(object, key)) {
            const entry = object[key];
            if (Array.isArray(entry)) {
                entry.push(value);
            } else {
                object[key] = [object[key], value];
            }
        } else {
            object[key] = value;
        }
    });

    return object;
}

export function getFormControls(form: HTMLFormElement) {
    const rootNode = form.getRootNode() as Document | ShadowRoot;
    const allNodes = [...rootNode.querySelectorAll("*")];
    const formControls = [...form.elements];
    const collection = formCollections.get(form);
    const placerFormControls = collection ? Array.from(collection) : [];

    return [...formControls, ...placerFormControls].sort(
        (a: Element, b: Element) => {
            if (allNodes.indexOf(a) < allNodes.indexOf(b)) {
                return -1;
            }
            if (allNodes.indexOf(a) > allNodes.indexOf(b)) {
                return 1;
            }
            return 0;
        },
    );
}
