import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerFormAssociatedElement } from "../../internal/placer-form-associated-element.js";
import { classMap } from "lit/directives/class-map.js";
import { RequiredValidator } from "../../internal/validators/required-validator.js";
import { HasSlotController } from "../../internal/slot.js";
import { uniqueID } from "../../internal/math.js";
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
 * @event change - Emitted when the radio group’s selected value changes.
 * @event input - Emitted when the radio group receives user input.
 * @event pc-invalid - Emitted when the form control has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input and hint.
 * @csspart label - The radio group’s label.
 * @csspart input - The radio group.
 * @csspart hint - The radio group’s hint.
 */
@customElement("pc-radio-group")
export class PcRadioGroup extends PlacerFormAssociatedElement {
    static shadowRootOptions = {
        ...PlacerFormAssociatedElement.shadowRootOptions,
        delegatesFocus: true,
    };
    static css = [formControlStyles, sizeStyles, visuallyHiddenStyles, styles];

    static get validators() {
        const validators = [
            RequiredValidator({
                validationElement: Object.assign(
                    document.createElement("input"),
                    {
                        required: true,
                        type: "radio",
                        name: uniqueID("__pc-radio"),
                    },
                ),
            }),
        ];

        return [...super.validators, ...validators];
    }

    private readonly hasSlotController = new HasSlotController(
        this,
        "hint",
        "label",
    );

    @query("slot:not([name])") defaultSlot!: HTMLSlotElement;

    /** The radio group’s label. This is required for proper accessibility. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";

    /** The radio group’s hint. This is required for proper accessibility. If you need to display HTML, use the `hint` slot instead. */
    @property() hint = "";

    /** The name of the radio group, submitted as a name/value pair with form data. */
    @property() name: string | null = null;

    private _value: string | null = null;

    get value() {
        if (this.valueHasChanged) {
            return this._value;
        }

        return this._value ?? this.defaultValue;
    }

    /** The current value of the radio group, submitted as a name/value pair with form data. */
    @state()
    set value(value: string | number | null) {
        if (typeof value === "number") {
            value = String(value);
        }

        this.valueHasChanged = true;
        this._value = value;
    }

    /** The default value of the radio group. Primarily used for resetting the radio group. */
    @property({ attribute: "value", reflect: true }) defaultValue:
        | string
        | null = this.getAttribute("value") || null;

    /** The radio group’s size. This size will be applied to all child radios. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Indicates if an option of the radio group must be chosen or not. */
    @property({ type: Boolean, reflect: true }) required = false;

    constructor() {
        super();

        this.addEventListener("click", this.handleRadioClick);
        this.addEventListener("keydown", this.handleKeyDown);
    }

    /** We use the first available radio as the `validationTarget` similar to native HTML that shows the validation popup on the first radio element. */
    get validationTarget() {
        const radio = this.querySelector<PcRadio>(
            ":is(pc-radio):not([disabled])",
        );

        if (!radio) {
            return undefined;
        }

        return radio;
    }

    updated(changedProperties: PropertyValues<this>) {
        if (
            changedProperties.has("disabled") ||
            changedProperties.has("size") ||
            changedProperties.has("value")
        ) {
            this.syncRadioElements();
        }
    }

    formResetCallback(
        ...args: Parameters<PlacerFormAssociatedElement["formResetCallback"]>
    ) {
        this.value = this.defaultValue;

        super.formResetCallback(...args);

        this.syncRadioElements();
    }

    private handleRadioClick = (event: Event) => {
        const clickedRadio = (event.target as HTMLElement).closest<PcRadio>(
            "pc-radio",
        );

        if (
            !clickedRadio ||
            clickedRadio.disabled ||
            (clickedRadio as any).forceDisabled ||
            this.disabled
        ) {
            return;
        }

        const oldValue = this.value;

        this.value = clickedRadio.value ?? null;

        clickedRadio.checked = true;

        const radios = this.getAllRadios();

        for (const radio of radios) {
            if (clickedRadio === radio) {
                continue;
            }

            radio.checked = false;
            radio.setAttribute("tabindex", "-1");
        }

        if (this.value !== oldValue) {
            this.updateComplete.then(() => {
                this.dispatchEvent(
                    new Event("change", { bubbles: true, composed: true }),
                );
                this.dispatchEvent(
                    new InputEvent("input", { bubbles: true, composed: true }),
                );
            });
        }
    };

    private getAllRadios() {
        return [...this.querySelectorAll<PcRadio>("pc-radio")];
    }

    private handleLabelClick() {
        this.focus();
    }

    private async syncRadioElements() {
        const radios = this.getAllRadios();

        await Promise.all(
            radios.map(async (radio) => {
                await radio.updateComplete;

                if (!radio.disabled && radio.value === this.value) {
                    radio.checked = true;
                } else {
                    radio.checked = false;
                }
            }),
        );

        if (this.disabled) {
            radios.forEach((radio) => {
                radio.tabIndex = -1;
            });
        } else {
            const enabledRadios = radios.filter((radio) => !radio.disabled);
            const checkedRadio = enabledRadios.find((radio) => radio.checked);

            if (enabledRadios.length > 0) {
                if (checkedRadio) {
                    enabledRadios.forEach((radio) => {
                        radio.tabIndex = radio.checked ? 0 : -1;
                    });
                } else {
                    enabledRadios.forEach((radio, index) => {
                        radio.tabIndex = index === 0 ? 0 : -1;
                    });
                }
            }

            radios
                .filter((radio) => radio.disabled)
                .forEach((radio) => {
                    radio.tabIndex = -1;
                });
        }
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (
            !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(
                event.key,
            ) ||
            this.disabled
        ) {
            return;
        }

        const radios = this.getAllRadios().filter((radio) => !radio.disabled);

        if (radios.length <= 0) {
            return;
        }

        event.preventDefault();

        const oldValue = this.value;

        const checkedRadio = radios.find((radio) => radio.checked) ?? radios[0];
        const increment =
            event.key === " "
                ? 0
                : ["ArrowUp", "ArrowLeft"].includes(event.key)
                  ? -1
                  : 1;

        let index = radios.indexOf(checkedRadio) + increment;

        if (!index) index = 0;

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

        this.value = radios[index].value ?? null;
        radios[index].checked = true;

        radios[index].setAttribute("tabindex", "0");
        radios[index].focus();

        if (this.value !== oldValue) {
            this.updateComplete.then(() => {
                this.dispatchEvent(
                    new InputEvent("input", { bubbles: true, composed: true }),
                );
                this.dispatchEvent(
                    new Event("change", { bubbles: true, composed: true }),
                );
            });
        }

        event.preventDefault();
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

    /** Sets focus on the radio group. */
    focus(options?: FocusOptions) {
        if (this.disabled) {
            return;
        }

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
                    aria-hidden=${hasLabel ? "false" : "true"}
                    @click=${this.handleLabelClick}
                >
                    <slot name="label">${this.label}</slot>
                </label>

                <slot
                    part="input"
                    class="input"
                    @slotchange=${this.syncRadios}
                    @click=${this.handleRadioClick}
                    @keydown=${this.handleKeyDown}
                ></slot>

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
