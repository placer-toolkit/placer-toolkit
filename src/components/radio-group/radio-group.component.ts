import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
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
import type { PcRadioButton } from "../radio-button/radio-button.js";
import { PcButtonGroup } from "../button-group/button-group.js";
import { styles } from "./radio-group.styles.js";

@customElement("pc-radio-group")
export class PcRadioGroup extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = {
        "pc-button-group": PcButtonGroup,
    };

    // @ts-expect-error
    protected readonly formControlController = new FormControlController(this);
    private readonly hasSlotController = new HasSlotController(
        this,
        "hint",
        "label",
    );
    private customValidityMessage = "";
    private validationTimeout!: number;

    @query("slot:not([name])") defaultSlot!: HTMLSlotElement;
    @query(".radio-group-validation-input") validationInput!: HTMLInputElement;

    @state() private hasButtonGroup = false;
    @state() private errorMessage = "";
    @state() defaultValue = "";

    @property({ reflect: true }) form = "";

    @property() hint = "";

    @property() label = "";

    @property() name = "option";

    @property({ type: Boolean, reflect: true }) required = false;

    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    @property({ reflect: true }) value = "";

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
        return [
            ...this.querySelectorAll<PcRadio | PcRadioButton>(
                "pc-radio, pc-radio-button",
            ),
        ];
    }

    private handleRadioClick(event: MouseEvent) {
        const target = (event.target as HTMLElement).closest<
            PcRadio | PcRadioButton
        >("pc-radio, pc-radio-button")!;
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

            if (!this.hasButtonGroup) {
                radio.setAttribute("tabindex", "-1");
            }
        });

        this.value = radios[index].value ?? "";
        radios[index].checked = true;

        if (!this.hasButtonGroup) {
            radios[index].setAttribute("tabindex", "0");
            radios[index].focus();
        } else {
            radios[index].shadowRoot!.querySelector("button")!.focus();
        }

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
                radio.size = this.size;
            }),
        );

        this.hasButtonGroup = radios.some(
            (radio) => radio.tagName.toLowerCase() === "pc-radio-button",
        );

        if (radios.length > 0 && !radios.some((radio) => radio.checked)) {
            if (this.hasButtonGroup) {
                const buttonRadio =
                    radios[0].shadowRoot?.querySelector("button");

                if (buttonRadio) {
                    buttonRadio.setAttribute("tabindex", "0");
                }
            } else {
                radios[0].setAttribute("tabindex", "0");
            }
        }

        if (this.hasButtonGroup) {
            const buttonGroup =
                this.shadowRoot?.querySelector("pc-button-group");

            if (buttonGroup) {
                (buttonGroup as PcButtonGroup).disableRole = true;
            }
        }
    }

    private syncRadios() {
        if (
            customElements.get("pc-radio") &&
            customElements.get("pc-radio-button")
        ) {
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

        if (customElements.get("pc-radio-button")) {
            this.syncRadioElements();
        } else {
            customElements
                .whenDefined("pc-radio-button")
                .then(() => this.syncRadios());
        }
    }

    private updateCheckedRadio() {
        const radios = this.getAllRadios();

        radios.forEach((radio) => (radio.checked = radio.value === this.value));
        this.formControlController.setValidity(this.validity.valid);
    }

    @watch("size", { waitUntilFirstUpdate: true })
    handleSizeChange() {
        this.syncRadios();
    }

    @watch("value")
    handleValueChange() {
        if (this.hasUpdated) {
            this.updateCheckedRadio();
        }
    }

    checkValidity() {
        const isRequiredAndEmpty = this.required && !this.value;
        const hasCustomValidityMessage = this.customValidityMessage !== "";

        if (isRequiredAndEmpty || hasCustomValidityMessage) {
            this.formControlController.emitInvalidEvent();
            return false;
        }

        return true;
    }

    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

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

    setCustomValidity(message = "") {
        this.customValidityMessage = message;
        this.errorMessage = message;
        this.validationInput.setCustomValidity(message);
        this.formControlController.updateValidity();
    }

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
        const defaultSlot = html`
            <slot
                @slotchange=${this.syncRadios}
                @click=${this.handleRadioClick}
                @keydown=${this.handleKeyDown}
            ></slot>
        `;

        return html`
            <fieldset
                part="form-control"
                class=${classMap({
                    "form-control": true,
                    "form-control-small": this.size === "small",
                    "form-control-medium": this.size === "medium",
                    "form-control-large": this.size === "large",
                    "form-control-radio-group": true,
                    "form-control-has-label": hasLabel,
                    "form-control-has-hint": hasHint,
                })}
                role="radiogroup"
                aria-labelledby="label"
                aria-describedby="hint-text"
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

                <div class="form-control-input" part="form-control-input">
                    <div class="pc-visually-hidden">
                        <div id="error-message" aria-live="assertive">
                            ${this.errorMessage}
                        </div>
                        <label class="radio-group-validation">
                            <input
                                type="text"
                                class="radio-group-validation-input"
                                tabindex="-1"
                                hidden=""
                                ?required=${this.required}
                                @invalid=${this.handleInvalid}
                            />
                        </label>
                    </div>

                    ${this.hasButtonGroup
                        ? html`
                              <pc-button-group
                                  part="button-group"
                                  role="presentation"
                                  exportparts="base:button-group__base"
                              >
                                  ${defaultSlot}
                              </pc-button-group>
                          `
                        : defaultSlot}
                </div>

                <div
                    class="hint"
                    part="hint"
                    id="hint-text"
                    aria-hidden=${hasHint ? "false" : "true"}
                >
                    <slot name="hint">${this.hint}</slot>
                </div>
            </fieldset>
        `;
    }
}
