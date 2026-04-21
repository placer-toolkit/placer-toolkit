import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { LocalizeController } from "../../utilities/localize.js";
import { getText } from "../../internal/get-text.js";
import "../icon/icon.js";
import styles from "./option.css";
import { PcSelect } from "../select/select.js";

/**
 * @summary Options define the selectable items within various form controls such as a select.
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
    static css = styles;

    private isInitialized = false;

    // The localise controller usage is dynamically added by the Select component.
    private readonly localize = new LocalizeController(this);

    @query(".label") defaultSlot!: HTMLSlotElement;

    @state() current = false;
    /** The default label, generated from the element contents. This is equal to the `label` property in most cases. */
    @state() defaultLabel = "";

    /** The option’s value. When selected, the containing form control will receive this value. The value must be unique from other options in the same group. Values must not contain spaces, as spaces are used as delimiters when listing multiple values. */
    @property({ reflect: true }) value = "";

    /** Disables the option, preventing selection. */
    @property({ type: Boolean }) disabled = false;

    /** @internal — An internal property to detect if the option is selected. */
    @property({ type: Boolean, attribute: false }) selected = false;

    /** Selects an option initially. */
    @property({ type: Boolean, attribute: "selected" }) defaultSelected = false;

    _label: string = "";

    get label(): string {
        if (this._label) {
            return this._label;
        }

        if (!this.defaultLabel) {
            this.updateDefaultLabel();
        }

        return this.defaultLabel;
    }

    /** The option’s plain text label. This is usually automatically generated, but can be useful to provide manually for cases involving complex content. */
    @property()
    set label(value) {
        const oldValue = this._label;

        this._label = value || "";

        if (this._label !== oldValue) {
            this.requestUpdate("label", oldValue);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "option");
        this.setAttribute("aria-selected", "false");

        this.addEventListener("mouseenter", this.handleHover);
        this.addEventListener("mouseleave", this.handleHover);

        this.updateDefaultLabel();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.removeEventListener("mouseenter", this.handleHover);
        this.removeEventListener("mouseleave", this.handleHover);
    }

    private handleDefaultSlotChange() {
        this.updateDefaultLabel();

        if (this.isInitialized) {
            customElements.whenDefined("pc-select").then(() => {
                const controller = this.closest("pc-select");

                if (controller) {
                    controller.handleDefaultSlotChange();
                    controller.selectionChanged?.();
                }
            });
        } else {
            this.isInitialized = true;
        }
    }

    private handleHover = (event: Event) => {
        if (event.type === "mouseenter") {
            this.customStates.set("hover", true);
        } else if (event.type === "mouseleave") {
            this.customStates.set("hover", false);
        }
    };

    protected willUpdate(changedProperties: PropertyValues<this>): void {
        if (changedProperties.has("defaultSelected")) {
            if (!this.closest<PcSelect>("pc-select")?.hasInteracted) {
                if (this.defaultSelected) {
                    const oldValue = this.selected;

                    this.selected = this.defaultSelected;
                    this.requestUpdate("selected", oldValue);
                }
            }
        }

        super.willUpdate(changedProperties);
    }

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

        if (changedProperties.has("value")) {
            if (typeof this.value !== "string") {
                this.value = String(this.value);
            }

            this.handleDefaultSlotChange();
        }

        if (changedProperties.has("current")) {
            this.customStates.set("current", this.current);
        }
    }

    protected firstUpdated(changedProperties: PropertyValues<this>) {
        super.firstUpdated(changedProperties);

        if (this.selected && !this.defaultSelected) {
            const parent = this.closest<PcSelect>("pc-select");

            if (parent && !parent.hasInteracted) {
                parent.selectionChanged?.();
            }
        }
    }

    private updateDefaultLabel() {
        let oldValue = this.defaultLabel;

        this.defaultLabel = getText(this).trim();

        let changed = this.defaultLabel !== oldValue;

        if (!this._label && changed) {
            this.requestUpdate("label", oldValue);
        }

        return changed;
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
