import { CSSResultGroup, LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { FormControlController } from "../../internal/form.js";
import { HasSlotController } from "../../internal/slot.js";
import { defaultValue } from "../../internal/default-value.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcIcon } from "../icon/icon.js";
import { styles } from "./input.styles.js";

@customElement("pc-input")
export class PcInput extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = { "pc-icon": PcIcon };

    // @ts-expect-error
    private readonly formControlController = new FormControlController(this, {
        assumeInteractionOn: ["pc-blur", "pc-input"],
    });
    private readonly hasSlotController = new HasSlotController(
        this,
        "hint",
        "label",
    );

    @query(".input-control") input!: HTMLInputElement;

    @state() private hasFocus = false;
    @property() title = "";

    private __numberInput = Object.assign(document.createElement("input"), {
        type: "number",
    });
    private __dateInput = Object.assign(document.createElement("input"), {
        type: "date",
    });

    @property() autocapitalize:
        | "off"
        | "none"
        | "on"
        | "sentences"
        | "words"
        | "characters" = "none";

    @property() autocomplete?: string;

    @property() autocorrect: "off" | "on" = "off";

    @property({ type: Boolean }) autofocus!: boolean;

    @property({ type: Boolean }) clearable = false;

    @property({ type: Boolean, reflect: true }) disabled = false;

    @defaultValue() defaultValue = "";

    @property() enterkeyhint:
        | "enter"
        | "done"
        | "go"
        | "next"
        | "previous"
        | "search"
        | "send" = "enter";

    @property({ type: Boolean, reflect: true }) filled = false;

    @property({ reflect: true }) form = "";

    @property() hint = "";

    @property() inputmode:
        | "none"
        | "text"
        | "decimal"
        | "numeric"
        | "tel"
        | "search"
        | "email"
        | "url" = "text";

    @property() label = "";

    @property() min?: number | string;

    @property() minlength?: number;

    @property() max?: number | string;

    @property() maxlength?: number;

    @property() name = "";

    @property({ attribute: "no-spin-buttons", type: Boolean }) noSpinButtons =
        false;

    @property({ attribute: "password-toggle", type: Boolean }) passwordToggle =
        false;

    @property() pattern?: string;

    @property({ attribute: "password-visible", type: Boolean })
    passwordVisible = false;

    @property({ type: Boolean, reflect: true }) pill = false;

    @property() placeholder = "";

    @property({ type: Boolean, reflect: true }) readonly = false;

    @property({ type: Boolean, reflect: true }) required = false;

    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    @property({
        type: Boolean,
        converter: {
            fromAttribute: (value) =>
                !value || value === "false" ? false : true,
            toAttribute: (value) => (value ? "true" : "false"),
        },
    })
    spellcheck = true;

    @property() step?: number | "any";

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

    @property() value = "";

    get valueAsDate() {
        this.__dateInput.type = this.type;
        this.__dateInput.value = this.value;
        return this.input?.valueAsDate || this.__dateInput.valueAsDate;
    }

    set valueAsDate(newValue: Date | null) {
        this.__dateInput.type = this.type;
        this.__dateInput.valueAsDate = newValue;
        this.value = this.__dateInput.value;
    }

    get valueAsNumber() {
        this.__numberInput.value = this.value;
        return this.input?.valueAsNumber || this.__numberInput.valueAsNumber;
    }

    set valueAsNumber(newValue: number) {
        this.__numberInput.valueAsNumber = newValue;
        this.value = this.__numberInput.value;
    }

    get validity() {
        return this.input.validity;
    }

    get validationMessage() {
        return this.input.validationMessage;
    }

    firstUpdated() {
        this.formControlController.updateValidity();
    }

    private handleFocus() {
        this.hasFocus = true;
        emit(this, "pc-focus");
    }

    private handleBlur() {
        this.hasFocus = false;
        emit(this, "pc-blur");
    }

    private handleChange() {
        this.value = this.input.value;
        emit(this, "pc-change");
    }

    private handleInput() {
        this.value = this.input.value;
        this.formControlController.updateValidity();
        emit(this, "pc-input");
    }

    private handleClearClick(event: MouseEvent) {
        event.preventDefault();

        if (this.value !== "") {
            this.value = "";
            emit(this, "pc-clear");
            emit(this, "pc-input");
            emit(this, "pc-change");
        }

        this.input.focus();
    }

    private handleKeyDown(event: KeyboardEvent) {
        const hasModifier =
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

        if (event.key === "Enter" && !hasModifier) {
            setTimeout(() => {
                if (!event.defaultPrevented && !event.isComposing) {
                    this.formControlController.submit();
                }
            });
        }
    }

    private handlePasswordToggle() {
        this.passwordVisible = !this.passwordVisible;
    }

    private handleInvalid(event: Event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.formControlController.setValidity(this.disabled);
    }

    @watch("step", { waitUntilFirstUpdate: true })
    handleStepChange() {
        this.input.step = String(this.step);
        this.formControlController.updateValidity();
    }

    @watch("value", { waitUntilFirstUpdate: true })
    async handleValueChange() {
        await this.updateComplete;
        this.formControlController.updateValidity();
    }

    focus(options?: FocusOptions) {
        this.input.focus(options);
    }

    blur() {
        this.input.blur();
    }

    select() {
        this.input.select();
    }

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

    showPicker() {
        if ("showPicker" in HTMLInputElement.prototype) {
            this.input.showPicker();
        }
    }

    stepUp() {
        this.input.stepUp();
        if (this.value !== this.input.value) {
            this.value = this.input.value;
        }
    }

    stepDown() {
        this.input.stepDown();
        if (this.value !== this.input.value) {
            this.value = this.input.value;
        }
    }

    checkValidity() {
        return this.input.checkValidity();
    }

    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    reportValidity() {
        return this.input.reportValidity();
    }

    setCustomValidity(message: string) {
        this.input.setCustomValidity(message);
        this.formControlController.updateValidity();
    }

    render() {
        const hasLabelSlot = this.hasSlotController.test("label");
        const hasHintSlot = this.hasSlotController.test("hint");
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHint = this.hint ? true : !!hasHintSlot;
        const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
        const isClearIconVisible =
            hasClearIcon &&
            (typeof this.value === "number" || this.value.length > 0);

        return html`
            <div
                part="form-control"
                class=${classMap({
                    "form-control": true,
                    "form-control-small": this.size === "small",
                    "form-control-medium": this.size === "medium",
                    "form-control-large": this.size === "large",
                    "form-control-has-label": hasLabel === true,
                    "form-control-has-hint": hasHint === true,
                })}
            >
                <label
                    part="label"
                    class="label"
                    for="input"
                    aria-hidden=${hasLabel ? "false" : "true"}
                >
                    <slot name="label">${this.label}</slot>
                </label>

                <div part="form-control-input" class="form-control-input">
                    <div
                        part="base"
                        class=${classMap({
                            "input": true,
                            "input-small": this.size === "small",
                            "input-medium": this.size === "medium",
                            "input-large": this.size === "large",
                            "input-pill": this.pill === true,
                            "input-standard": this.filled === false,
                            "input-filled": this.filled === true,
                            "input-disabled": this.disabled === true,
                            "input-focused": this.hasFocus === true,
                            "input-empty": !this.value,
                            "input-no-spin-buttons": this.noSpinButtons,
                        })}
                    >
                        <span part="prefix" class="prefix">
                            <slot name="prefix"></slot>
                        </span>

                        <input
                            part="input"
                            class="input-control"
                            id="input"
                            type=${this.type === "password" &&
                            this.passwordVisible
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
                            aria-describedby="hint-text"
                            @focus=${this.handleFocus}
                            @blur=${this.handleBlur}
                            @change=${this.handleChange}
                            @input=${this.handleInput}
                            @keydown=${this.handleKeyDown}
                            @invalid=${this.handleInvalid}
                        />

                        ${isClearIconVisible
                            ? html`
                                  <button
                                      class="clear-input-button"
                                      part="clear-button"
                                      type="button"
                                      aria-label="Clear input"
                                      @click=${this.handleClearClick}
                                      tabindex="-1"
                                  >
                                      <slot name="clear-icon">
                                          <pc-icon
                                              library="default"
                                              icon-style="solid"
                                              name="circle-xmark"
                                          ></pc-icon>
                                      </slot>
                                  </button>
                              `
                            : ""}
                        ${this.passwordToggle && !this.disabled
                            ? html`
                                  <button
                                      class="password-toggle-button"
                                      part="password-toggle-button"
                                      type="button"
                                      aria-label=${this.passwordVisible
                                          ? "Hide password"
                                          : "Show password"}
                                      @click=${this.handlePasswordToggle}
                                      tabindex="-1"
                                  >
                                      ${this.passwordVisible
                                          ? html`
                                                <slot name="show-password-icon">
                                                    <pc-icon
                                                        library="default"
                                                        icon-style="solid"
                                                        name="eye-slash"
                                                    ></pc-icon>
                                                </slot>
                                            `
                                          : html`
                                                <slot name="hide-password-icon">
                                                    <pc-icon
                                                        library="default"
                                                        icon-style="solid"
                                                        name="eye"
                                                    ></pc-icon>
                                                </slot>
                                            `}
                                  </button>
                              `
                            : ""}

                        <span part="suffix" class="suffix">
                            <slot name="suffix"></slot>
                        </span>
                    </div>
                </div>

                <div
                    part="hint"
                    class="hint"
                    id="hint-text"
                    aria-hidden=${hasHint ? "false" : "true"}
                >
                    <slot name="hint">${this.hint}</slot>
                </div>
            </div>
        `;
    }
}
