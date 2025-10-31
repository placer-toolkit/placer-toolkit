import { html } from "lit";
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
import formControlStyles from "../../styles/component-styles/form-control.css";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./switch.css";

/**
 * @summary Switches allow the user to toggle an option on or off.
 * @status experimental
 * @since 0.1.0
 *
 * @slot - The switch’s label.
 * @slot hint - Text that describes how to use the switch. Alternatively, you can use the `hint` attribute.
 *
 * @event pc-change - Emitted when the switch’s state changes.
 * @event pc-focus - Emitted when the switch gains focus.
 * @event pc-blur - Emitted when the switch loses focus (i.e., is blurred).
 * @event pc-input - Emitted when the switch receives input.
 * @event pc-invalid - Emitted when the form control has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart base - The component’s base wrapper.
 * @csspart control - The control that houses the switch’s thumb.
 * @csspart thumb - The switch’s thumb.
 * @csspart label - The switch’s label.
 * @csspart hint - The hint’s wrapper.
 *
 * @cssproperty --width: calc(var(--height) * 1.75) - The width of the switch.
 * @cssproperty --height: var(--pc-form-control-toggle-size) - The height of the switch.
 * @cssproperty --thumb-size: 0.75em - The size of the thumb.
 */
@customElement("pc-switch")
export class PcSwitch extends PlacerElement implements PlacerFormControl {
    /** @internal This is an internal static property. */
    static css = [formControlStyles, sizeStyles, styles];

    private readonly formControlController = new FormControlController(this, {
        value: (input: PlacerFormControl) => {
            const control = input as PcSwitch;
            return control.checked ? control.value || "on" : undefined;
        },
        defaultValue: (input: PlacerFormControl) => {
            const control = input as PcSwitch;
            return control.defaultChecked;
        },
        setValue: (input: PlacerFormControl, value: unknown) => {
            const control = input as PcSwitch;
            control.checked = Boolean(value);
        },
    });
    private readonly hasSlotController = new HasSlotController(this, "hint");

    /** @internal This is an internal class property. */
    @query('input[type="checkbox"]') input!: HTMLInputElement;

    @state() private hasFocus = false;

    /** @internal This is an internal property. */
    @property() title = "";

    /** The name of the switch, submitted as a name/value pair with form data. */
    @property() name = "";

    /** The current value of the switch, submitted as a name/value pair with form data. */
    @property() value!: string;

    /** The switch’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Disables the switch. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Enables the switch. */
    @property({ type: Boolean, reflect: true }) checked = false;

    /** The default value of the switch. Primarily used for resetting the switch. */
    @defaultValue("checked") defaultChecked = false;

    /** By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. */
    @property({ reflect: true }) form = "";

    /** Makes the switch a required field. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** The switch’s hint. if you need to display HTML, use the `hint` slot instead. */
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
        this.checked = !this.checked;
        emit(this, "pc-change");
    }

    private handleInput() {
        emit(this, "pc-input");
    }

    private handleFocus() {
        this.hasFocus = true;
        emit(this, "pc-focus");
    }

    private handleBlur() {
        this.hasFocus = false;
        emit(this, "pc-blur");
    }

    private handleInvalid(event: Event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            this.checked = false;
            emit(this, "pc-change");
            emit(this, "pc-input");
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            this.checked = true;
            emit(this, "pc-change");
            emit(this, "pc-input");
        }
    }

    /** @internal This is an internal method. */
    @watch("checked", { waitUntilFirstUpdate: true })
    handleCheckedChange() {
        this.input.checked = this.checked;
        this.formControlController.updateValidity();
    }

    /** @internal This is an internal method. */
    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.formControlController.setValidity(true);
    }

    /** Simulates a click on the switch. */
    click() {
        this.input.click();
    }

    /** Focuses the switch. */
    focus(options?: FocusOptions) {
        this.input.focus(options);
    }

    /** Unfocuses/blurs the switch. */
    blur() {
        this.input.blur();
    }

    /** Checks for validity but doesn’t show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
        return this.input.checkValidity();
    }

    /** Gets the associated form if one exists. */
    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    /** Checks for validity and shows the browser’s validation message if the control is invalid. */
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
                    checked: this.checked,
                    disabled: this.disabled,
                })}
            >
                <input
                    class="input"
                    type="checkbox"
                    role="switch"
                    title=${this.title}
                    name=${this.name}
                    value=${ifDefined(this.value)}
                    .checked=${live(this.checked)}
                    .disabled=${this.disabled}
                    .required=${this.required}
                    aria-checked=${this.checked ? "true" : "false"}
                    aria-describedby="hint"
                    @click=${this.handleClick}
                    @input=${this.handleInput}
                    @focus=${this.handleFocus}
                    @blur=${this.handleBlur}
                    @invalid=${this.handleInvalid}
                    @keydown=${this.handleKeyDown}
                />

                <span part="control" class="switch">
                    <span part="thumb" class="thumb"></span>
                </span>

                <slot class="label" part="label"></slot>
            </label>

            <slot
                part="hint"
                class=${classMap({ "has-hint": hasHint })}
                id="hint"
                name="hint"
                aria-hidden=${hasHint ? "false" : "true"}
            >
                ${this.hint}
            </slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-switch": PcSwitch;
    }
}
