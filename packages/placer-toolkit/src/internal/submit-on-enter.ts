import type { PcButton } from "../components/button/button.js";
import type { PlacerFormAssociatedElement } from "./placer-form-associated-element.js";

export function submitOnEnter<T extends HTMLElement>(
    event: KeyboardEvent,
    element: T,
) {
    const hasModifier =
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    if (event.key === "Enter" && !hasModifier) {
        setTimeout(() => {
            if (!event.defaultPrevented && !event.isComposing) {
                submitForm(element);
            }
        });
    }
}

export function submitForm(element: HTMLElement | PlacerFormAssociatedElement) {
    let form: HTMLFormElement | null = null;

    if ("form" in element && typeof (element as any).form === "object") {
        form = (element as any).form as HTMLFormElement | null;
    }

    if (!form && "getForm" in element) {
        form = element.getForm();
    }

    if (!form) {
        return;
    }

    const formElements = [...form.elements];

    if (formElements.length === 1) {
        form.requestSubmit(null);
        return;
    }

    const button = formElements.find(
        (elem: Element): elem is HTMLButtonElement | PcButton =>
            (elem instanceof HTMLButtonElement ||
                elem.localName === "pc-button") &&
            elem.getAttribute("type") === "submit" &&
            !elem.matches(":disabled"),
    );

    if (!button) {
        return;
    }

    if (["input", "button"].includes(button.localName)) {
        form.requestSubmit(button);
    } else {
        button.click();
    }
}
