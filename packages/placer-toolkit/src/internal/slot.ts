import type { ReactiveController, ReactiveControllerHost } from "lit";

/** A reactive controller that determines when slots exist. */
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
            this.handleSlotChange,
        );
    }

    hostDisconnected() {
        this.host.shadowRoot!.removeEventListener(
            "slotchange",
            this.handleSlotChange,
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

/** Given a slot, this function iterates over all of its assigned element and text nodes and returns the concatenated HTML as a string. This is useful because `slot.innerHTML` does not work. */

/**
 * Given a list of nodes, this function iterates over all of them and returns the concatenated HTML as a string. This is useful for getting the HTML that corresponds to a slot’s assigned nodes (since we can’t use `slot.innerHTML` as an alternative).
 *
 * @param nodes - The list of nodes to iterate over.
 * @param callback - A function that can be used to customise the HTML output for specific types of nodes. If the function returns `undefined`, the default HTML output will be used.
 */
export function getInnerHTML(
    nodes: Iterable<Node>,
    callback?: (node: Node) => string | undefined,
): string {
    let html = "";

    for (const node of nodes) {
        if (callback) {
            const customHTML = callback(node);

            if (customHTML !== undefined) {
                html += customHTML;

                continue;
            }
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            html += (node as HTMLElement).outerHTML;
        }

        if (node.nodeType === Node.TEXT_NODE) {
            html += node.textContent;
        }
    }

    return html;
}

/** Given a slot, this function iterates over all of its assigned text nodes and returns the concatenated string. This is useful because `slot.textContent` does not work. */
export function getTextContent(
    slot: HTMLSlotElement | undefined | null,
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
