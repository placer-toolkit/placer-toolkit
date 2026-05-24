import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { PlacerElement } from "../../internal/placer-element.js";
import type { PcButton } from "../button/button.js";
import styles from "./button-group.css";

function findButton(element: HTMLElement) {
    const selector = "pc-button";

    return element.closest(selector) ?? element.querySelector(selector);
}

/**
 * @summary Button groups can be used to group related buttons into groups.
 * @status experimental
 * @since 0.3.0
 *
 * @slot - One or more `<pc-button>` elements to display in the button group.
 *
 * @csspart base - The component’s base wrapper.
 */
@customElement("pc-button-group")
export class PcButtonGroup extends PlacerElement {
    static css = styles;

    @query("slot") defaultSlot!: HTMLSlotElement;

    @state() hasOutlined = false;
    @state() disableRole = false;

    /** A label to use for the button group. This won’t be displayed on the screen, but it will be announced by assistive devices when interacting with the control and is highly recommended. */
    @property() label = "";

    /** The button group’s orientation. */
    @property({ reflect: true }) orientation: "horizontal" | "vertical" =
        "horizontal";

    updated(changedProperties: PropertyValues<this>) {
        super.updated(changedProperties);

        if (changedProperties.has("orientation")) {
            this.setAttribute("aria-orientation", this.orientation);

            this.updateClassNames();
        }
    }

    private handleFocus(event: Event) {
        const button = findButton(event.target as HTMLElement);

        button?.classList.add("button-focus");
    }

    private handleBlur(event: Event) {
        const button = findButton(event.target as HTMLElement);

        button?.classList.remove("button-focus");
    }

    private handleMouseOver(event: Event) {
        const button = findButton(event.target as HTMLElement);

        button?.classList.add("button-hover");
    }

    private handleMouseOut(event: Event) {
        const button = findButton(event.target as HTMLElement);

        button?.classList.remove("button-hover");
    }

    private handleSlotChange() {
        this.updateClassNames();
    }

    private updateClassNames() {
        const slottedElements = [
            ...this.defaultSlot.assignedElements({ flatten: true }),
        ] as HTMLElement[];

        this.hasOutlined = false;

        slottedElements.forEach((element) => {
            const index = slottedElements.indexOf(element);
            const button = findButton(element);

            if (button) {
                if (
                    (button as PcButton).variant.split(" ").includes("outlined")
                ) {
                    this.hasOutlined = true;
                }

                button.classList.add("pc-button-group-button");
                button.classList.toggle(
                    "pc-button-group-horizontal",
                    this.orientation === "horizontal",
                );
                button.classList.toggle(
                    "pc-button-group-vertical",
                    this.orientation === "vertical",
                );
                button.classList.toggle(
                    "pc-button-group-button-first",
                    index === 0,
                );
                button.classList.toggle(
                    "pc-button-group-button-inner",
                    index > 0 && index < slottedElements.length - 1,
                );
                button.classList.toggle(
                    "pc-button-group-button-last",
                    index === slottedElements.length - 1,
                );
            }
        });
    }

    render() {
        return html`
            <slot
                part="base"
                class=${classMap({
                    "button-group": true,
                    "has-outlined": this.hasOutlined,
                })}
                role=${this.disableRole ? "presentation" : "group"}
                aria-label=${this.label}
                aria-orientation=${this.orientation}
                @focusin=${this.handleFocus}
                @focusout=${this.handleBlur}
                @mouseover=${this.handleMouseOver}
                @mouseout=${this.handleMouseOut}
                @slotchange=${this.handleSlotChange}
            ></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-button-group": PcButtonGroup;
    }
}
