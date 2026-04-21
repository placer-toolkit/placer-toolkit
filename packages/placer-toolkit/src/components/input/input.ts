import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerFormAssociatedElement } from "../../internal/placer-form-associated-element.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { MirrorValidator } from "../../internal/validators/mirror-validator.js";
import { HasSlotController } from "../../internal/slot.js";
import { LocalizeController } from "../../utilities/localize.js";
import { PcClearEvent } from "../../events/pc-clear.js";
import { submitOnEnter } from "../../internal/submit-on-enter.js";
import { watch } from "../../internal/watch.js";
import "../icon/icon.js";
import formControlStyles from "../../styles/component-styles/form-control.css";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./input.css";

/**
 * @summary Inputs collect data from the user.
 * @status experimental
 * @since 0.4.0
 *
 * @dependency pc-icon
 *
 * @slot - The input’s label. Alternatively, you can use the `label` attribute.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 * @slot clear-icon - An icon to use to replace the default clear icon.
 * @slot show-password-icon - An icon to use to replace the default show password icon.
 * @slot hide-password-icon - An icon to use to replace the default hide password icon.
 * @slot hint - Text that describes how to use the input. Alternatively, you can use the `hint` attribute.
 *
 * @event change - Emitted when an alteration to the input’s value is committed by the user.
 * @event input - Emitted when the input receives input.
 * @event focus - Emitted when the input gains focus.
 * @event blur - Emitted when the input loses focus (i.e., is blurred).
 * @event pc-clear - Emitted when the clear button is activated.
 * @event pc-invalid - Emitted when the form control has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input and hint.
 * @csspart label - The input’s label.
 * @csspart input - The input.
 * @csspart hint - The input’s hint.
 * @csspart combobox - The container the wraps the prefix, suffix, input and clear icon.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart suffix - The container that wraps the suffix slot.
 * @csspart display-input - The element that displays the input.
 * @csspart clear-button - The clear button.
 */
@customElement("pc-input")
export class PcInput extends PlacerFormAssociatedElement {
    static css = [formControlStyles, sizeStyles, styles];

    static shadowRootOptions = {
        ...PlacerFormAssociatedElement.shadowRootOptions,
        delegatesFocus: true,
    };

    static get validators() {
        return [...super.validators, MirrorValidator()];
    }

    assumeInteractionOn = ["input", "blur"];

    private readonly hasSlotController = new HasSlotController(
        this,
        "label",
        "hint",
    );
    private readonly localize = new LocalizeController(this);

    @query(".control") input!: HTMLInputElement;

    @property() title = "";

    /** The type of input. Works the same as a native `<input>` element, but only a subset of types are supported. */
    @property({ reflect: true }) type:
        | "date"
        | "datetime-local"
        | "email"
        | "number"
        | "password"
        | "search"
        | "tel"
        | "text"
        | "time"
        | "url" = "text";

    /** The name of the input, submitted as a name/value pair with form data. */
    @property() name = "";

    private _value: string | null = null;

    /** The current value of the input, submitted as a name/value pair with form data. */
    get value() {
        if (this.valueHasChanged) {
            return this._value;
        }

        return this._value ?? this.defaultValue;
    }

    @state()
    set value(value: string | null) {
        if (this._value === value) {
            return;
        }

        this.valueHasChanged = true;
        this._value = value;
    }

    /** The default value of the input. Primarily used for resetting the input. */
    @property({ attribute: "value", reflect: true }) defaultValue:
        | string
        | null = this.getAttribute("value") || null;

    /** The input’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Draws a filled input. */
    @property({ type: Boolean, reflect: true }) filled = false;

    /** Draws a pill‐style input. */
    @property({ type: Boolean, reflect: true }) pill = false;

    /** The input’s label. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";

    /** The input’s hint. If you need to display HTML, use the `hint` slot instead. */
    @property() hint = "";

    /** Adds a clear button when the input is not empty. */
    @property({ type: Boolean }) clearable = false;

    /** Disables the input. */
    @property({ type: Boolean }) disabled = false;

    /** Placeholder text to show as a hint when the input is empty. */
    @property() placeholder = "";

    /** Makes the input readonly. */
    @property({ type: Boolean, reflect: true }) readonly = false;

    /** Adds a button to toggle the password’s visibility. Only applies when the input’s `type` is set to `password`. */
    @property({ attribute: "password-toggle", type: Boolean }) passwordToggle =
        false;

    /** Determines whether or not the password is visible by default. Only applies when the input’s `type` is set to `password`. */
    @property({ attribute: "password-visible", type: Boolean })
    passwordVisible = false;

    /** Hides the browser’s built‐in increment and decrement spin buttons. Only applies when the input’s `type` is set to `number`. */
    @property({ attribute: "no-spin-buttons", type: Boolean }) noSpinButtons =
        false;

    /** Indicates if the input must be filled in or not. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** A RegEx pattern to validate the input against. */
    @property() pattern?: string;

    /** The minimum length of input that will be considered valid. */
    @property() minlength?: number;

    /** The maximum length of input that will be considered valid. */
    @property() maxlength?: number;

    /** The input’s minimum value. Only applies when the input’s `type` is set to `date` or `number`. */
    @property() min?: number | string;

    /** The input’s maximum value. Only applies when the input’s `type` is set to `date` or `number`. */
    @property() max?: number | string;

    /** Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is implied, allowing any numeric value. Only applies when the input’s `type` is set to `date` or `number`. */
    @property() step?: number | "any";

    /** Controls whether and how text input is automatically capitalised as it is entered by the user. */
    @property() autocapitalize:
        | "off"
        | "none"
        | "on"
        | "sentences"
        | "words"
        | "characters" = "none";

    /** Indicates whether the browser’s autocorrect feature is on or off. */
    @property({
        type: Boolean,
        converter: {
            fromAttribute: (value) =>
                !value || value === "off" ? false : true,
            toAttribute: (value) => (value ? "on" : "off"),
        },
    })
    autocorrect = false;

    /** Specifies what permission the browser has to provide assistance in filling out form field values. Refer to [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values. */
    @property() autocomplete?: string;

    /** Indicates that the input should receive focus on page load. */
    @property({ type: Boolean }) autofocus!: boolean;

    /** Used to customise the label or icon of the Enter key on virtual keyboards. */
    @property() enterkeyhint:
        | "enter"
        | "done"
        | "go"
        | "next"
        | "previous"
        | "search"
        | "send" = "enter";

    /** Enables spellcheck on the input. */
    @property({
        type: Boolean,
        converter: {
            fromAttribute: (value) =>
                !value || value === "off" ? false : true,
            toAttribute: (value) => (value ? "on" : "off"),
        },
    })
    spellcheck = true;

    /** Tells the browser what type of data will be entered by the user, allowing virtual keyboards to display the correct keyboard type to the user. */
    @property() inputmode:
        | "none"
        | "text"
        | "decimal"
        | "numeric"
        | "tel"
        | "search"
        | "email"
        | "url" = "text";

    private handleChange(event: Event) {
        this.value = this.input.value;

        this.relayNativeEvent(event, { bubbles: true, composed: true });
    }

    private handleInput() {
        this.value = this.input.value;
    }

    private handleClearClick(event: MouseEvent) {
        event.preventDefault();

        if (this.value !== "") {
            this.value = "";

            this.updateComplete.then(() => {
                this.dispatchEvent(new PcClearEvent());
                this.dispatchEvent(
                    new Event("change", { bubbles: true, composed: true }),
                );
                this.dispatchEvent(
                    new InputEvent("input", { bubbles: true, composed: true }),
                );
            });
        }

        this.input.focus();
    }

    private handleKeyDown(event: KeyboardEvent) {
        submitOnEnter(event, this);
    }

    private handlePasswordToggle() {
        this.passwordVisible = !this.passwordVisible;
    }

    @watch("step", { waitUntilFirstUpdate: true })
    handleStepChange() {
        this.input.step = String(this.step);
        this.updateValidity();
    }

    /** Focuses the input. */
    focus(options?: FocusOptions) {
        this.input.focus(options);
    }

    /** Unfocuses the input (i.e., blurs it). */
    blur() {
        this.input.blur();
    }

    /** Selects all the text in the input. */
    select() {
        this.input.select();
    }

    /** Sets the start and end positions of the text selection (0‐based). */
    setSelectionRange(
        selectionStart: number,
        selectionEnd: number,
        selectionDirection: "forward" | "backward" | "none" = "none",
    ) {
        this.input.setSelectionRange(
            selectionStart,
            selectionEnd,
            selectionDirection,
        );
    }

    /** Replaces a range of text with a new string. */
    setRangeText(
        replacement: string,
        start?: number,
        end?: number,
        selectMode: "select" | "start" | "end" | "preserve" = "preserve",
    ) {
        const selectionStart = start ?? this.input.selectionStart!;
        const selectionEnd = end ?? this.input.selectionEnd!;

        this.input.setRangeText(
            replacement,
            selectionStart,
            selectionEnd,
            selectMode,
        );

        if (this.value !== this.input.value) {
            this.value = this.input.value;
        }
    }

    /** Displays the browser picker for an input element. This only works if the browser supports it for the input type. */
    showPicker() {
        if ("showPicker" in HTMLInputElement.prototype) {
            this.input.showPicker();
        }
    }

    /** Increments the value of a numeric input type by the value of the step attribute. */
    stepUp() {
        this.input.stepUp();
        if (this.value !== this.input.value) {
            this.value = this.input.value;
        }
    }

    /** Decrements the value of a numeric input type by the value of the step attribute. */
    stepDown() {
        this.input.stepDown();
        if (this.value !== this.input.value) {
            this.value = this.input.value;
        }
    }

    formResetCallback() {
        this.value = this.defaultValue;

        super.formResetCallback();
    }

    render() {
        const hasLabelSlot = this.hasSlotController.test("label");
        const hasHintSlot = this.hasSlotController.test("hint");
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHint = this.hint ? true : !!hasHintSlot;
        const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
        const isClearIconVisible =
            hasClearIcon &&
            (typeof this.value === "number" ||
                (this.value && this.value.length > 0));

        return html`
            <div
                part="form-control"
                class="form-control form-control-has-label"
            >
                <label
                    part="label"
                    class="label"
                    for="input"
                    aria-hidden=${hasLabel ? "false" : "true"}
                >
                    <slot name="label">${this.label}</slot>
                </label>

                <div part="input" class="text-field">
                    <slot class="prefix" part="prefix" name="prefix"></slot>

                    <input
                        part="base"
                        class="control"
                        id="input"
                        type=${this.type === "password" && this.passwordVisible
                            ? "text"
                            : this.type}
                        title=${this.title}
                        name=${ifDefined(this.name)}
                        ?disabled=${this.disabled}
                        ?readonly=${this.readonly}
                        ?required=${this.required}
                        placeholder=${ifDefined(this.placeholder)}
                        min=${ifDefined(this.min)}
                        minlength=${ifDefined(this.minlength)}
                        max=${ifDefined(this.max)}
                        maxlength=${ifDefined(this.maxlength)}
                        step=${ifDefined(this.step as number)}
                        .value=${live(this.value)}
                        autocapitalize=${ifDefined(this.autocapitalize)}
                        autocomplete=${ifDefined(this.autocomplete)}
                        autocorrect=${ifDefined(this.autocorrect)}
                        ?autofocus=${this.autofocus}
                        spellcheck=${this.spellcheck}
                        pattern=${ifDefined(this.pattern)}
                        enterkeyhint=${ifDefined(this.enterkeyhint)}
                        inputmode=${ifDefined(this.inputmode)}
                        aria-describedby="hint"
                        @change=${this.handleChange}
                        @input=${this.handleInput}
                        @keydown=${this.handleKeyDown}
                    />

                    ${isClearIconVisible
                        ? html`
                              <button
                                  class="clear"
                                  part="clear-button"
                                  type="button"
                                  aria-label=${this.localize.term("clearEntry")}
                                  @click=${this.handleClearClick}
                                  tabindex="-1"
                              >
                                  <slot name="clear-icon">
                                      <pc-icon
                                          library="system"
                                          icon-style="regular"
                                          name="circle-xmark"
                                      ></pc-icon>
                                  </slot>
                              </button>
                          `
                        : ""}
                    ${this.passwordToggle && !this.disabled
                        ? html`
                              <button
                                  class="password-toggle"
                                  part="password-toggle-button"
                                  type="button"
                                  aria-label=${this.localize.term(
                                      this.passwordVisible
                                          ? "hidePassword"
                                          : "showPassword",
                                  )}
                                  @click=${this.handlePasswordToggle}
                                  tabindex="-1"
                              >
                                  ${!this.passwordVisible
                                      ? html`
                                            <slot name="show-password-icon">
                                                <pc-icon
                                                    library="system"
                                                    icon-style="regular"
                                                    name="eye-slash"
                                                ></pc-icon>
                                            </slot>
                                        `
                                      : html`
                                            <slot name="hide-password-icon">
                                                <pc-icon
                                                    library="system"
                                                    icon-style="regular"
                                                    name="eye"
                                                ></pc-icon>
                                            </slot>
                                        `}
                              </button>
                          `
                        : ""}

                    <slot class="suffix" part="suffix" name="suffix"></slot>
                </div>

                <slot
                    class=${classMap({ "has-hint": hasHint })}
                    part="hint"
                    id="hint"
                    name="hint"
                    aria-hidden=${hasHint ? "false" : "true"}
                >
                    ${this.hint}
                </slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-input": PcInput;
    }
}
