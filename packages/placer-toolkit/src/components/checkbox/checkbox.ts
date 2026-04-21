import { html, nothing } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerFormAssociatedElement } from "../../internal/placer-form-associated-element.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { HasSlotController } from "../../internal/slot.js";
import { RequiredValidator } from "../../internal/validators/required-validator.js";
import { watch } from "../../internal/watch.js";
import "../icon/icon.js";
import formControlStyles from "../../styles/component-styles/form-control.css";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./checkbox.css";

/**
 * @summary Checkboxes allow the user to toggle an option on or off.
 * @status experimental
 * @since 0.1.0
 *
 * @dependency pc-icon
 *
 * @slot - The checkbox’s label.
 * @slot hint - Text that describes how to use the checkbox. Alternatively, you can use the `hint` attribute.
 *
 * @event input - Emitted when the checkbox receives input.
 * @event change - Emitted when the checkbox’s state changes.
 * @event focus - Emitted when the checkbox gains focus.
 * @event blur - Emitted when the checkbox loses focus.
 * @event pc-invalid - Emitted when the checkbox has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart base - The component’s base wrapper.
 * @csspart control - The container that wraps the checkbox’s state.
 * @csspart checkbox-checked - Matches the `control` part when the checkbox is checked.
 * @csspart checkbox-indeterminate - Matches the `control` part when the checkbox is indeterminate.
 * @csspart icon-checked - The checked icon, a `<pc-icon>` element.
 * @csspart icon-indeterminate - The indeterminate icon, a `<pc-icon>` element.
 * @csspart label - The container that wraps the checkbox’s label.
 * @csspart hint - The container that wraps the checkbox’s hint.
 */
@customElement("pc-checkbox")
export class PcCheckbox extends PlacerFormAssociatedElement {
    static css = [formControlStyles, sizeStyles, styles];

    static shadowRootOptions = {
        ...PlacerFormAssociatedElement.shadowRootOptions,
        delegatesFocus: true,
    };

    static get validators() {
        const validators = [
            RequiredValidator({
                validationProperty: "checked",
                validationElement: Object.assign(
                    document.createElement("input"),
                    {
                        type: "checkbox",
                        required: true,
                    },
                ),
            }),
        ];

        return [...super.validators, ...validators];
    }

    private readonly hasSlotController = new HasSlotController(this, "hint");

    @query('input[type="checkbox"]') input!: HTMLInputElement;

    @state() private isFadingOut = false;

    @property() title = "";

    /** The name of the checkbox, submitted as a name/value pair with form data. */
    @property() name = "";

    private _value: string | null = this.getAttribute("value") ?? null;

    /** The current value of the checkbox, submitted as a name/value pair with form data. */
    get value(): string | null {
        const value = this._value || "on";

        return this.checked ? value : null;
    }

    @property({ reflect: true })
    set value(value: string | null) {
        this._value = value;
    }

    /** The checkbox’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Disables the checkbox. */
    @property({ type: Boolean }) disabled = false;

    /** Checks the checkbox. */
    @property({ type: Boolean, reflect: true }) checked = false;

    /** Sets the checkbox’s state to indeterminate. This is usually applied to checkboxes that represent a “Select all/none” behaviour when associated checkboxes have a mix of checked and unchecked states. */
    @property({ type: Boolean, reflect: true }) indeterminate = false;

    /** The default value of the checkbox. Primarily used for resetting the checkbox. */
    @property({ type: Boolean, reflect: true, attribute: "checked" })
    defaultChecked: boolean = this.hasAttribute("checked");

    /** Indicates that the checkbox must be checked. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** The checkbox’s hint. If you need to display HTML, use the `hint` slot instead. */
    @property() hint = "";

    private handleClick() {
        if (!this.indeterminate) {
            if (this.checked) {
                this.isFadingOut = true;
                setTimeout(() => (this.isFadingOut = false), 150);
            }
        }

        this.hasInteracted = true;
        this.checked = !this.checked;
        this.indeterminate = false;

        this.updateComplete.then(() => {
            this.dispatchEvent(
                new Event("change", { bubbles: true, composed: true }),
            );
        });
    }

    @watch("defaultChecked")
    handleDefaultCheckedChange() {
        if (!this.hasInteracted && this.checked !== this.defaultChecked) {
            this.checked = this.defaultChecked;
            this.handleValueOrCheckedChange();
        }
    }

    handleValueOrCheckedChange() {
        this.setValue(this.checked ? this.value : null, this._value);
        this.updateValidity();
    }

    @watch("disabled")
    handleDisabledChange() {
        this.customStates.set("disabled", this.disabled);
    }

    @watch(["checked", "indeterminate"])
    handleStateChange() {
        if (!this.indeterminate && this.checked) {
            this.isFadingOut = false;
        }

        if (this.hasUpdated) {
            this.input.checked = this.checked;
            this.input.indeterminate = this.indeterminate;
        }

        this.customStates.set("checked", this.checked);
        this.customStates.set("indeterminate", this.indeterminate);

        this.updateValidity();
    }

    protected willUpdate(changedProperties: PropertyValues<this>): void {
        super.willUpdate(changedProperties);

        if (changedProperties.has("defaultChecked")) {
            if (!this.hasInteracted) {
                this.checked = this.defaultChecked;
            }
        }

        if (
            changedProperties.has("value") ||
            changedProperties.has("checked")
        ) {
            this.handleValueOrCheckedChange();
        }
    }

    formResetCallback() {
        this.checked = this.defaultChecked;

        super.formResetCallback();

        this.handleValueOrCheckedChange();
    }

    /** Simulates a click on the checkbox. */
    click() {
        this.input.click();
    }

    /** Focuses the checkbox. */
    focus(options?: FocusOptions) {
        this.input.focus(options);
    }

    /** Unfocuses the checkbox (i.e., blurs it). */
    blur() {
        this.input.blur();
    }

    render() {
        const hasHintSlot = this.hasSlotController.test("hint");
        const hasHint = this.hint ? true : !!hasHintSlot;

        return html`
            <label
                part="base"
                class=${classMap({
                    checkbox: true,
                    checked: this.checked && !this.isFadingOut,
                    indeterminate: this.indeterminate,
                    disabled: this.disabled,
                })}
            >
                <input
                    class="input"
                    type="checkbox"
                    title=${this.title}
                    name=${this.name}
                    value=${ifDefined(this.value)}
                    .indeterminate=${live(this.indeterminate)}
                    .checked=${live(this.checked)}
                    .disabled=${this.disabled}
                    .required=${this.required}
                    aria-checked=${this.checked ? "true" : "false"}
                    aria-describedby=${this.hint ? "hint" : nothing}
                    @click=${this.handleClick}
                />

                <span
                    part="control ${this.checked
                        ? "checkbox-checked"
                        : ""} ${this.indeterminate
                        ? "checkbox-indeterminate"
                        : ""}"
                    class=${classMap({
                        "control": true,
                        "fade-in": this.checked && !this.isFadingOut,
                        "fade-out": this.isFadingOut,
                    })}
                >
                    ${this.checked || this.isFadingOut
                        ? html`
                              <pc-icon
                                  part="icon-checked"
                                  library="system"
                                  icon-style="solid"
                                  name="check"
                              ></pc-icon>
                          `
                        : ""}
                    ${this.indeterminate
                        ? html`
                              <pc-icon
                                  part="icon-indeterminate"
                                  library="system"
                                  icon-style="solid"
                                  name="minus"
                              ></pc-icon>
                          `
                        : ""}
                </span>

                <slot class="label" part="label"></slot>
            </label>

            <slot
                part="hint"
                class=${classMap({ "has-hint": hasHint })}
                name="hint"
                id="hint"
                aria-hidden=${hasHint ? "false" : "true"}
            >
                ${this.hint}
            </slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-checkbox": PcCheckbox;
    }
}
