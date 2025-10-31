import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
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
 * @event pc-focus - Emitted when the radio gains focus.
 * @event pc-blur - Emitted when the radio loses focus (i.e., is blurred).
 *
 * @csspart base - The component’s base wrapper.
 * @csspart control - The circular container that wraps the radio’s checked state.
 * @csspart control-checked - The circular container that wraps the radio’s checked state only if it’s checked.
 * @csspart checked-icon - The checked icon, an `<svg>` element.
 * @csspart label - The radio’s label.
 */
@customElement("pc-radio")
export class PcRadio extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = [formControlStyles, sizeStyles, styles];

    /** @internal This is an internal class property. */
    @state() checked = false;
    /** @internal This is an internal class property. */
    @state() protected hasFocus = false;

    /** The radio’s value. When selected, the radio group will receive this value. */
    @property() value?: string;

    /** The radio’s size. When used inside a radio group, the size will be determined by the radio group’s size so this attribute can typically be omitted. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Disables the radio. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    constructor() {
        super();

        this.addEventListener("click", this.handleClick);
        this.addEventListener("focus", this.handleFocus);
        this.addEventListener("blur", this.handleBlur);
    }

    connectedCallback() {
        super.connectedCallback();
        this.setInitialAttributes();
    }

    private handleClick() {
        if (!this.disabled && !this.checked) {
            this.checked = true;
        }
    }

    private handleFocus() {
        this.hasFocus = true;
        emit(this, "pc-focus");
    }

    private handleBlur() {
        this.hasFocus = false;
        emit(this, "pc-blur");
    }

    private setInitialAttributes() {
        this.setAttribute("role", "radio");
        this.setAttribute("tabindex", "-1");
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    /** @internal This is an internal method. */
    @watch("checked")
    handleCheckedChange() {
        this.setAttribute("aria-checked", this.checked ? "true" : "false");
        this.setAttribute("tabindex", this.checked ? "0" : "-1");
    }

    /** @internal This is an internal method. */
    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    render() {
        return html`
            <span
                part="base"
                class=${classMap({
                    "radio": true,
                    "checked": this.checked,
                    "disabled": this.disabled,
                    "has-focus": this.hasFocus,
                })}
            >
                <span
                    class="control"
                    part="${`control ${this.checked ? "control-checked" : ""}`}"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="checked-icon"
                        part="checked-icon"
                        viewBox="0 0 16 16"
                    >
                        <circle cx="8" cy="8" r="4.5" fill="currentColor" />
                    </svg>
                </span>

                <slot class="label" part="label"></slot>
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-radio": PcRadio;
    }
}
