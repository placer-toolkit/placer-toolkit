import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { PlacerFormAssociatedElement } from "../../internal/placer-form-associated-element.js";
import formControlStyles from "../../styles/component-styles/form-control.css";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./radio.css";

/**
 * @summary Radios allow the user to select a single option from a [radio group](/components/radio-group).
 * @status experimental
 * @since 0.2.0
 *
 * @slot - The radio’s label.
 *
 * @event focus - Emitted when the radio gains focus.
 * @event blur - Emitted when the radio loses focus (i.e., is blurred).
 *
 * @csspart control - The circular container that wraps the radio’s checked state.
 * @csspart checked-icon - The checked icon, an `<svg>` element.
 * @csspart label - The radio’s label.
 *
 * @cssproperty --checked-background-color: var(--pc-form-control-activated-color) - The background colour for checked radios. This does not apply for segmented radios.
 * @cssproperty --checked-icon-scale: 0.8 - The scale of the icon for checked radios. This does not apply for segmented radios.
 */
@customElement("pc-radio")
export class PcRadio extends PlacerFormAssociatedElement {
    static css = [formControlStyles, sizeStyles, styles];

    @state() checked = false;

    /** @internal This is used by the radio group to force disable radios while preserving their original disabled state. */
    @state() forceDisabled = false;

    /** The radio’s value. When selected, the radio group will receive this value. */
    @property() value?: string;

    /** The radio’s visual appearance. */
    @property({ reflect: true }) appearance: "default" | "segmented" =
        "default";

    /** The radio’s size. When used inside a radio group, the size will be determined by the radio group’s size so this attribute can typically be omitted. */
    @property({ reflect: true }) size?: "small" | "medium" | "large";

    /** Disables the radio. */
    @property({ type: Boolean }) disabled = false;

    constructor() {
        super();

        this.addEventListener("click", this.handleClick);
    }

    connectedCallback() {
        super.connectedCallback();
        this.setInitialAttributes();
    }

    private setInitialAttributes() {
        this.setAttribute("role", "radio");
        this.tabIndex = 0;
        this.setAttribute(
            "aria-disabled",
            this.disabled || this.forceDisabled ? "true" : "false",
        );
    }

    updated(changedProperties: PropertyValues<this>) {
        super.updated(changedProperties);

        if (changedProperties.has("checked")) {
            this.customStates.set("checked", this.checked);
            this.setAttribute("aria-checked", this.checked ? "true" : "false");

            if (!this.disabled && !this.forceDisabled) {
                this.tabIndex = this.checked ? 0 : -1;
            }
        }

        if (
            changedProperties.has("disabled") ||
            changedProperties.has("forceDisabled")
        ) {
            const effectivelyDisabled = this.disabled || this.forceDisabled;

            this.customStates.set("disabled", effectivelyDisabled);
            this.setAttribute(
                "aria-disabled",
                effectivelyDisabled ? "true" : "false",
            );

            if (effectivelyDisabled) {
                this.tabIndex = -1;
            } else {
                this.tabIndex = this.checked ? 0 : -1;
            }
        }
    }

    /** @override */
    setValue(): void {
        // We’re overriding setValue() because we don’t want to set form values from here.
        // We want to do it in the Radio Group component itself.
    }

    private handleClick = () => {
        if (!this.disabled && !this.forceDisabled) {
            this.checked = true;
        }
    };

    render() {
        return html`
            <span class="control" part="control">
                <svg
                    class="checked-icon"
                    part="checked-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                >
                    <circle cx="8" cy="8" r="4.5" fill="currentColor" />
                </svg>
            </span>

            <slot class="label" part="label"></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-radio": PcRadio;
    }
}
