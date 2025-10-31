import { html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import type { PlacerFormControl } from "../../internal/placer-form-control.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { defaultValue } from "../../internal/default-value.js";
import { FormControlController } from "../../internal/form.js";
import { HasSlotController } from "../../internal/slot.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcIcon } from "../icon/icon.js";
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
 * @event pc-input - Emitted when the checkbox receives input.
 * @event pc-change - Emitted when the checkbox’s state changes.
 * @event pc-focus - Emitted when the checkbox gains focus.
 * @event pc-blur - Emitted when the checkbox loses focus.
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
export class PcCheckbox extends PlacerElement implements PlacerFormControl {
    /** @internal This is an internal static property. */
    static css = [formControlStyles, sizeStyles, styles];
    /** @internal This is an internal static property. */
    static dependencies = { "pc-icon": PcIcon };

    private readonly formControlController = new FormControlController(this, {
        value: (input: PlacerFormControl) => {
            const control = input as PcCheckbox;
            return control.checked ? control.value || "on" : undefined;
        },
        defaultValue: (input: PlacerFormControl) => {
            const control = input as PcCheckbox;
            return control.defaultChecked;
        },
        setValue: (input: PlacerFormControl, value: unknown) => {
            const control = input as PcCheckbox;
            control.checked = Boolean(value);
        },
    });
    private readonly hasSlotController = new HasSlotController(this, "hint");

    /** @internal This is an internal class property. */
    @query('input[type="checkbox"]') input!: HTMLInputElement;

    @state() private hasFocus = false;
    @state() private isFadingOut = false;

    /** @internal This is an internal property. */
    @property() title = "";

    /** The name of the checkbox, submitted as a name/value pair with form data.  */
    @property() name = "";

    /** The current value of the checkbox, submitted as a name/value pair with form data. */
    @property() value = "";

    /** The checkbox’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Disables the checkbox. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Checks the checkbox off. */
    @property({ type: Boolean, reflect: true }) checked = false;

    /** Sets the checkbox’s state to indeterminate. This is usually applied to checkboxes that represent a “Select all/none” behaviour when associated checkboxes have a mix of checked and unchecked states. */
    @property({ type: Boolean, reflect: true }) indeterminate = false;

    /** The default value of the checkbox. Primarily used for resetting the checkbox. */
    @defaultValue("checked") defaultChecked = false;

    /** By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. */
    @property({ reflect: true }) form = "";

    /** Indicates that the checkbox must be checked. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** The checkbox’s hint. If you need to display HTML, use the `hint` slot instead. */
    @property() hint = "";

    /** Gets the validity state object. */
    get validity() {
        return this.input.validity;
    }

    /** Gets the validation message. */
    get validationMessage() {
        return this.input.validationMessage;
    }

    firstUpdated() {
        this.formControlController.updateValidity();
    }

    private handleClick() {
        if (!this.indeterminate) {
            if (this.checked) {
                this.isFadingOut = true;
                setTimeout(() => (this.isFadingOut = false), 150);
            }
        }

        this.checked = !this.checked;
        this.indeterminate = false;
        emit(this, "pc-change");
    }

    private handleFocus() {
        this.hasFocus = true;
        emit(this, "pc-focus");
    }

    private handleBlur() {
        this.hasFocus = false;
        emit(this, "pc-blur");
    }

    private handleInput() {
        emit(this, "pc-input");
    }

    private handleInvalid(event: Event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
    }

    /** @internal This is an internal method. */
    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.formControlController.setValidity(this.disabled);
    }

    /** @internal This is an internal method. */
    @watch(["checked", "indeterminate"], { waitUntilFirstUpdate: true })
    handleStateChange() {
        if (!this.indeterminate && this.checked) {
            this.isFadingOut = false;
        }
        this.input.checked = this.checked;
        this.input.indeterminate = this.indeterminate;
        this.formControlController.updateValidity();
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

    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
        return this.input.checkValidity();
    }

    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    /** Checks for validity and shows the browser’s validation message if the checkbox is invalid. */
    reportValidity() {
        return this.input.reportValidity();
    }

    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string) {
        this.input.setCustomValidity(message);
        this.formControlController.updateValidity();
    }

    render() {
        const hasHintSlot = this.hasSlotController.test("hint");
        const hasHint = this.hint ? true : !!hasHintSlot;

        return html`
            <label
                part="base"
                class=${classMap({
                    "checkbox": true,
                    "checked": this.checked && !this.isFadingOut,
                    "indeterminate": this.indeterminate,
                    "disabled": this.disabled,
                    "has-focus": this.hasFocus,
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
                    @input=${this.handleInput}
                    @focus=${this.handleFocus}
                    @blur=${this.handleBlur}
                    @invalid=${this.handleInvalid}
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
                                  library="system"
                                  icon-style="solid"
                                  name="check"
                                  part="icon-checked"
                              ></pc-icon>
                          `
                        : ""}
                    ${this.indeterminate
                        ? html`
                              <pc-icon
                                  library="system"
                                  icon-style="solid"
                                  name="minus"
                                  part="icon-indeterminate"
                              ></pc-icon>
                          `
                        : ""}
                </span>

                <slot class="label" part="label"></slot>
            </label>

            <div
                class=${classMap({ "has-hint": hasHint })}
                part="hint"
                id="hint"
                aria-hidden=${hasHint ? "false" : "true"}
            >
                <slot name="hint">${this.hint}</slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-checkbox": PcCheckbox;
    }
}
