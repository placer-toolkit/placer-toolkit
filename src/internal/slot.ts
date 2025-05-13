import type { ReactiveController, ReactiveControllerHost } from "lit";

export class HasSlotController implements ReactiveController {
    host: ReactiveControllerHost & Element;
    slotNames: string[] = [];

    constructor(
        host: ReactiveControllerHost & Element,
        ...slotNames: string[]
    ) {
        (this.host = host).addController(this);
        this.slotNames = slotNames;
    }

    private hasDefaultSlot() {
        return Array.from(this.host.childNodes).some((node) => {
            if (
                node.nodeType === node.TEXT_NODE &&
                node.textContent!.trim() !== ""
            ) {
                return true;
            }

            if (node.nodeType === node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                const tagName = element.tagName.toLowerCase();

                if (tagName === "sl-visually-hidden") {
                    return false;
                }

                if (!element.hasAttribute("slot")) {
                    return true;
                }
            }

            return false;
        });
    }

    private hasNamedSlot(name: string) {
        return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
    }

    test(slotName: string) {
        return slotName === "[default]"
            ? this.hasDefaultSlot()
            : this.hasNamedSlot(slotName);
    }

    hostConnected() {
        this.host.shadowRoot!.addEventListener(
            "slotchange",
            this.handleSlotChange
        );
    }

    hostDisconnected() {
        this.host.shadowRoot!.removeEventListener(
            "slotchange",
            this.handleSlotChange
        );
    }

    private handleSlotChange = (event: Event) => {
        const slot = event.target as HTMLSlotElement;

        if (
            (this.slotNames.includes("[default]") && !slot.name) ||
            (slot.name && this.slotNames.includes(slot.name))
        ) {
            this.host.requestUpdate();
        }
    };
}

export function getInnerHTML(slot: HTMLSlotElement): string {
    const nodes = slot.assignedNodes({ flatten: true });
    let html = "";

    [...nodes].forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            html += (node as HTMLElement).outerHTML;
        }

        if (node.nodeType === Node.TEXT_NODE) {
            html += node.textContent;
        }
    });

    return html;
}

export function getTextContent(
    slot: HTMLSlotElement | undefined | null
): string {
    if (!slot) {
        return "";
    }
    const nodes = slot.assignedNodes({ flatten: true });
    let text = "";

    [...nodes].forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent;
        }
    });

    return text;
}
