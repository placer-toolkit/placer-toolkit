import { CSSResultGroup, LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styles } from "./button-group.styles.js";

function findButton(element: HTMLElement) {
    const selector = "pc-button, pc-radio-button";

    return element.closest(selector) ?? element.querySelector(selector);
}

@customElement("pc-button-group")
export class PcButtonGroup extends LitElement {
    static styles: CSSResultGroup = styles;

    @query("slot") defaultSlot!: HTMLSlotElement;

    @state() disableRole = false;

    @property() label = "";

    private handleFocus(event: Event) {
        const button = findButton(event.target as HTMLElement);
        button?.toggleAttribute("data-pc-button-group-button-focus", true);
    }

    private handleBlur(event: Event) {
        const button = findButton(event.target as HTMLElement);
        button?.toggleAttribute("data-pc-button-group-button-focus", false);
    }

    private handleMouseOver(event: Event) {
        const button = findButton(event.target as HTMLElement);
        button?.toggleAttribute("data-pc-button-group-button-hover", true);
    }

    private handleMouseOut(event: Event) {
        const button = findButton(event.target as HTMLElement);
        button?.toggleAttribute("data-pc-button-group-button-hover", false);
    }

    private handleSlotChange() {
        const slottedElements = [
            ...this.defaultSlot.assignedElements({ flatten: true }),
        ] as HTMLElement[];

        slottedElements.forEach((element) => {
            const index = slottedElements.indexOf(element);
            const button = findButton(element);

            if (button) {
                button.toggleAttribute("data-pc-button-group-button", true);
                button.toggleAttribute(
                    "data-pc-button-group-button-first",
                    index === 0
                );
                button.toggleAttribute(
                    "data-pc-button-group-button-inner",
                    index > 0 && index < slottedElements.length - 1
                );
                button.toggleAttribute(
                    "data-pc-button-group-button-last",
                    index === slottedElements.length - 1
                );
                button.toggleAttribute(
                    "data-pc-button-group-button-radio",
                    button.tagName.toLowerCase() === "pc-radio-button"
                );
            }
        });
    }

    render() {
        return html`
            <div
                class="button-group"
                part="base"
                role=${this.disableRole ? "presentation" : "group"}
                aria-label=${this.label}
                @focusin=${this.handleFocus}
                @focusout=${this.handleBlur}
                @mouseover=${this.handleMouseOver}
                @mouseout=${this.handleMouseOut}
            >
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `;
    }
}
