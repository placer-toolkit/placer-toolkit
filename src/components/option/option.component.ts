import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../internal/watch.js";
import { PcIcon } from "../icon/icon.js";
import { styles } from "../option/option.styles.js";

/**
 * @summary Options define the selectable items within various form controls such as a [select](/components/select).
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-icon
 *
 * @slot — The option’s label.
 * @slot prefix — Used to prepend an icon or similar element to the menu item.
 * @slot suffix — Used to append an icon or similar element to the menu item.
 *
 * @csspart checked-icon — The checked icon, a `<pc-icon>` element.
 * @csspart base — The component’s base wrapper.
 * @csspart label — The option’s label.
 * @csspart prefix — The container that wraps the prefix.
 * @csspart suffix — The container that wraps the suffix.
 */
@customElement("pc-option")
export class PcOption extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = { "pc-icon": PcIcon };

    private isInitialized = false;

    @query(".option-label") defaultSlot!: HTMLSlotElement;

    @state() current = false;
    @state() selected = false;

    /** The option’s value. When selected, the containing form control will receive this value. The value must be unique from other options in the same group. Values must not contain spaces, as spaces are used as delimiters when listing multiple values. */
    @property({ reflect: true }) value = "";

    /** Disables the option, preventing selection. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "option");
        this.setAttribute("aria-selected", "false");
    }

    private handleDefaultSlotChange() {
        if (this.isInitialized) {
            customElements.whenDefined("pc-select").then(() => {
                const controller = this.closest("pc-select") as {
                    handleDefaultSlotChange?: () => void;
                } | null;
                if (
                    controller &&
                    typeof controller.handleDefaultSlotChange === "function"
                ) {
                    controller.handleDefaultSlotChange();
                }
            });
        } else {
            this.isInitialized = true;
        }
    }

    @watch("disabled")
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    @watch("selected")
    handleSelectedChange() {
        this.setAttribute("aria-selected", this.selected ? "true" : "false");
    }

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
            <div
                part="base"
                class=${classMap({
                    "option": true,
                    "option-current": this.current === true,
                    "option-selected": this.selected === true,
                    "option-disabled": this.disabled === true,
                })}
            >
                <pc-icon
                    class="option-check"
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
            </div>
        `;
    }
}
