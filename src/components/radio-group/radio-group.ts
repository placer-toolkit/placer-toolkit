import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import {
    customErrorValidityState,
    FormControlController,
    validValidityState,
    valueMissingValidityState,
} from "../../internal/form.js";
import { HasSlotController } from "../../internal/slot.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import type { PcRadio } from "../radio/radio.js";
import formControlStyles from "../../styles/component-styles/form-control.css";
import sizeStyles from "../../styles/utilities/size.css";
import visuallyHiddenStyles from "../../styles/utilities/visually-hidden.css";
import styles from "./radio-group.css";

/**
 * @summary Radio groups are used to group multiple [radios](/components/radio) so they function as a single form control.
 * @status experimental
 * @since 0.3.0
 *
 * @slot - The default slot where `<pc-radio>` elements are placed.
 * @slot label - The radio group’s label. This is required for proper accessibility. Alternatively, you can use the `label` attribute.
 * @slot hint - Text that describes how to use the radio group. Alternatively, you can use the `hint` attribute.
 *
 * @event pc-change - Emitted when the radio group’s selected value changes.
 * @event pc-input - Emitted when the radio group receives user input.
 * @event pc-invalid - Emitted when the form control has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input and hint.
 * @csspart label - The radio group’s label.
 * @csspart input - The radio group.
 * @csspart hint - The radio group’s hint.
 */
@customElement("pc-radio-group")
export class PcRadioGroup extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = [formControlStyles, sizeStyles, visuallyHiddenStyles, styles];

    /** @internal This is an internal class property. */
    protected readonly formControlController = new FormControlController(this);
    private readonly hasSlotController = new HasSlotController(
        this,
        "hint",
        "label",
    );
    private customValidityMessage = "";
    private validationTimeout!: number;

    /** @internal This is an internal class property. */
    @query("slot:not([name])") defaultSlot!: HTMLSlotElement;
    /** @internal This is an internal class property. */
    @query(".validation-input") validationInput!: HTMLInputElement;

    @state() private errorMessage = "";
    /** @internal This is an internal class property. */
    @state() defaultValue = "";

    /** The radio group’s label. This is required for proper accessibility. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";

    /** The radio group’s hint. This is required for proper accessibility. If you need to display HTML, use the `hint` slot instead. */
    @property() hint = "";

    /** The name of the radio group, submitted as a name/value pair with form data. */
    @property() name = "option";

    /** The current value of the radio group, submitted as a name/value pair with form data. */
    @property({ reflect: true }) value = "";

    /** The radio group’s size. This size will be applied to all child radios. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. */
    @property({ reflect: true }) form = "";

    /** Indicates if an option of the radio group must be chosen or not. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** Gets the validity state object. */
    get validity() {
        const isRequiredAndEmpty = this.required && !this.value;
        const hasCustomValidityMessage = this.customValidityMessage !== "";

        if (hasCustomValidityMessage) {
            return customErrorValidityState;
        } else if (isRequiredAndEmpty) {
            return valueMissingValidityState;
        }

        return validValidityState;
    }

    /** Gets the validation message. */
    get validationMessage() {
        const isRequiredAndEmpty = this.required && !this.value;
        const hasCustomValidityMessage = this.customValidityMessage !== "";

        if (hasCustomValidityMessage) {
            return this.customValidityMessage;
        } else if (isRequiredAndEmpty) {
            return this.validationInput.validationMessage;
        }

        return "";
    }

    connectedCallback() {
        super.connectedCallback();
        this.defaultValue = this.value;
    }

    firstUpdated() {
        this.formControlController.updateValidity();
    }

    private getAllRadios() {
        return [...this.querySelectorAll<PcRadio>("pc-radio")];
    }

    private handleRadioClick(event: MouseEvent) {
        const target = (event.target as HTMLElement).closest<PcRadio>(
            "pc-radio",
        )!;
        const radios = this.getAllRadios();
        const oldValue = this.value;

        if (!target || target.disabled) {
            return;
        }

        this.value = target.value ?? "";
        radios.forEach((radio) => (radio.checked = radio === target));

        if (this.value !== oldValue) {
            emit(this, "pc-change");
            emit(this, "pc-input");
        }
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (
            !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(
                event.key,
            )
        ) {
            return;
        }

        const radios = this.getAllRadios().filter((radio) => !radio.disabled);
        const checkedRadio = radios.find((radio) => radio.checked) ?? radios[0];
        const increment =
            event.key === " "
                ? 0
                : ["ArrowUp", "ArrowLeft"].includes(event.key)
                  ? -1
                  : 1;
        const oldValue = this.value;
        let index = radios.indexOf(checkedRadio) + increment;

        if (index < 0) {
            index = radios.length - 1;
        }

        if (index > radios.length - 1) {
            index = 0;
        }

        this.getAllRadios().forEach((radio) => {
            radio.checked = false;
            radio.setAttribute("tabindex", "-1");
        });

        this.value = radios[index].value ?? "";
        radios[index].checked = true;

        radios[index].setAttribute("tabindex", "0");
        radios[index].focus();

        if (this.value !== oldValue) {
            emit(this, "pc-change");
            emit(this, "pc-input");
        }

        event.preventDefault();
    }

    private handleLabelClick() {
        this.focus();
    }

    private handleInvalid(event: Event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
    }

    private async syncRadioElements() {
        const radios = this.getAllRadios();

        await Promise.all(
            radios.map(async (radio) => {
                await radio.updateComplete;
                radio.checked = radio.value === this.value;
            }),
        );

        if (radios.length > 0 && !radios.some((radio) => radio.checked)) {
            radios[0].setAttribute("tabindex", "0");
        }
    }

    private syncRadios() {
        if (customElements.get("pc-radio")) {
            this.syncRadioElements();
            return;
        }

        if (customElements.get("pc-radio")) {
            this.syncRadioElements();
        } else {
            customElements
                .whenDefined("pc-radio")
                .then(() => this.syncRadios());
        }
    }

    private updateCheckedRadio() {
        const radios = this.getAllRadios();

        radios.forEach((radio) => (radio.checked = radio.value === this.value));
        this.formControlController.setValidity(this.validity.valid);
    }

    /** @internal This is an internal method. */
    @watch("size", { waitUntilFirstUpdate: true })
    handleSizeChange() {
        this.syncRadios();
    }

    /** @internal This is an internal method. */
    @watch("value")
    handleValueChange() {
        if (this.hasUpdated) {
            this.updateCheckedRadio();
        }
    }

    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
        const isRequiredAndEmpty = this.required && !this.value;
        const hasCustomValidityMessage = this.customValidityMessage !== "";

        if (isRequiredAndEmpty || hasCustomValidityMessage) {
            this.formControlController.emitInvalidEvent();
            return false;
        }

        return true;
    }

    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    /** Checks for validity and shows the browser’s validation message if the radio group is invalid. */
    reportValidity(): boolean {
        const isValid = this.validity.valid;

        this.errorMessage =
            this.customValidityMessage || isValid
                ? ""
                : this.validationInput.validationMessage;
        this.formControlController.setValidity(isValid);
        this.validationInput.hidden = true;
        clearTimeout(this.validationTimeout);

        if (!isValid) {
            this.validationInput.hidden = false;
            this.validationInput.reportValidity();
            this.validationTimeout = setTimeout(
                () => (this.validationInput.hidden = true),
                10000,
            ) as unknown as number;
        }

        return isValid;
    }

    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string) {
        this.customValidityMessage = message;
        this.errorMessage = message;
        this.validationInput.setCustomValidity(message);
        this.formControlController.updateValidity();
    }

    /** Sets focus on the radio group. */
    public focus(options?: FocusOptions) {
        const radios = this.getAllRadios();
        const checked = radios.find((radio) => radio.checked);
        const firstEnabledRadio = radios.find((radio) => !radio.disabled);
        const radioToFocus = checked || firstEnabledRadio;

        if (radioToFocus) {
            radioToFocus.focus(options);
        }
    }

    render() {
        const hasLabelSlot = this.hasSlotController.test("label");
        const hasHintSlot = this.hasSlotController.test("hint");
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHint = this.hint ? true : !!hasHintSlot;

        return html`
            <fieldset
                part="form-control"
                class=${classMap({
                    "form-control": true,
                    "radio-group": true,
                    "has-label": hasLabel,
                    "has-hint": hasHint,
                })}
                role="radiogroup"
                aria-labelledby="label"
                aria-describedby="hint"
                aria-errormessage="error-message"
            >
                <label
                    class="label"
                    part="label"
                    id="label"
                    @click=${this.handleLabelClick}
                    aria-hidden=${hasLabel ? "false" : "true"}
                >
                    <slot name="label">${this.label}</slot>
                </label>

                <div class="input" part="input">
                    <div class="pc-visually-hidden-force">
                        <div id="error-message" aria-live="assertive">
                            ${this.errorMessage}
                        </div>
                        <label class="validation">
                            <input
                                type="text"
                                class="validation-input"
                                tabindex="-1"
                                hidden=""
                                ?required=${this.required}
                                @invalid=${this.handleInvalid}
                            />
                        </label>
                    </div>

                    <slot
                        @slotchange=${this.syncRadios}
                        @click=${this.handleRadioClick}
                        @keydown=${this.handleKeyDown}
                    ></slot>
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
            </fieldset>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-radio-group": PcRadioGroup;
    }
}
