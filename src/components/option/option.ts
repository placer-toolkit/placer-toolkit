import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { watch } from "../../internal/watch.js";
import { PcIcon } from "../icon/icon.js";
import styles from "./option.css";

/**
 * @summary Options define the selectable items within various form controls such as a [select](/components/select).
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-icon
 *
 * @slot - The option’s label.
 * @slot prefix - Used to prepend an icon or similar element to the option.
 * @slot suffix - Used to append an icon or similar element to the option.
 *
 * @csspart checked-icon - The checked icon, a `<pc-icon>` element.
 * @csspart base - The component’s base wrapper.
 * @csspart label - The option’s label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 */
@customElement("pc-option")
export class PcOption extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;
    /** @internal This is an internal static property. */
    static dependencies = { "pc-icon": PcIcon };

    private isInitialized = false;

    /** @internal This is an internal class property. */
    @query(".label") defaultSlot!: HTMLSlotElement;

    /** @internal This is an internal class property. */
    @state() current = false;
    /** @internal This is an internal class property. */
    @state() selected = false;

    /** The option’s value. When selected, the containing form control will receive this value. The value must be unique from other options in the same group. Values must not contain spaces, as spaces are used as delimiters when listing multiple values. */
    @property({ reflect: true }) value = "";

    /** Disables the option, preventing selection. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "option");
        this.setAttribute("aria-selected", "false");

        this.addEventListener("mouseenter", this.handleHover);
        this.addEventListener("mouseleave", this.handleHover);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.removeEventListener("mouseenter", this.handleHover);
        this.removeEventListener("mouseleave", this.handleHover);
    }

    private handleDefaultSlotChange() {
        if (!this.isInitialized) {
            this.isInitialized = true;

            queueMicrotask(() => {
                customElements.whenDefined("pc-select").then(() => {
                    const controller = this.closest("pc-select");

                    if (controller) {
                        controller.handleDefaultSlotChange();
                    }
                });
            });
        }
    }

    private handleHover = (event: Event) => {
        if (event.type === "mouseenter") {
            this.customStates.set("hover", true);
        } else if (event.type === "mouseleave") {
            this.customStates.set("hover", false);
        }
    };

    updated(changedProperties: PropertyValues<this>) {
        super.updated(changedProperties);

        if (changedProperties.has("disabled")) {
            this.setAttribute(
                "aria-disabled",
                this.disabled ? "true" : "false",
            );
        }

        if (changedProperties.has("selected")) {
            this.setAttribute(
                "aria-selected",
                this.selected ? "true" : "false",
            );
            this.customStates.set("selected", this.selected);
            this.handleDefaultSlotChange();
        }

        if (changedProperties.has("current")) {
            this.customStates.set("current", this.current);
        }
    }

    /** @internal This is an internal method. */
    @watch("disabled")
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    /** @internal This is an internal method. */
    @watch("selected")
    handleSelectedChange() {
        this.setAttribute("aria-selected", this.selected ? "true" : "false");
    }

    /** @internal This is an internal method. */
    @watch("value")
    handleValueChange() {
        if (typeof this.value !== "string") {
            this.value = String(this.value);
        }

        if (this.value.includes(" ")) {
            console.warn(
                `Option values must not contain a space. All spaces have been replaced with underscores. ${this}`,
            );
            this.value = this.value.replace(/ /g, "_");
        }
    }

    /** Returns a plain text label based on the option’s content. */
    getTextLabel() {
        const nodes = this.childNodes;
        let label = "";

        [...nodes].forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (!(node as HTMLElement).hasAttribute("slot")) {
                    label += (node as HTMLElement).textContent;
                }
            }

            if (node.nodeType === Node.TEXT_NODE) {
                label += node.textContent;
            }
        });

        return label.trim();
    }

    render() {
        return html`
            <pc-icon
                class="check"
                part="checked-icon"
                library="system"
                icon-style="solid"
                name="check"
                aria-hidden="true"
            ></pc-icon>
            <slot class="prefix" part="prefix" name="prefix"></slot>
            <slot
                class="label"
                part="label"
                @slotchange=${this.handleDefaultSlotChange}
            ></slot>
            <slot class="suffix" part="suffix" name="prefix"></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-option": PcOption;
    }
}
