import { CSSResultGroup, LitElement, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { defaultValue } from "../../internal/default-value.ts";
import { FormControlController } from "../../internal/form.ts";
import { HasSlotController } from "../../internal/slot.ts";
import { watch } from "../../internal/watch.ts";
import { emit } from "../../internal/emit.ts";
import { PcIcon } from "../icon/icon.ts";
import { styles } from "./checkbox.styles.ts";

@customElement("pc-checkbox")
export class PcCheckbox extends LitElement {
    static styles?: CSSResultGroup = styles;
    static dependencies = { "pc-icon": PcIcon };

    // @ts-expect-error
    private readonly formControlController = new FormControlController(this, {
        value: (control: PcCheckbox) =>
            control.checked ? control.value || "on" : undefined,
        defaultValue: (control: PcCheckbox) => control.defaultChecked,
        setValue: (control: PcCheckbox, checked: boolean) =>
            (control.checked = checked),
    });
    private readonly hasSlotController = new HasSlotController(this, "hint");

    @query("input[type='checkbox']") input!: HTMLInputElement;

    @state() private hasFocus = false;
    @state() private isFadingOut = false;

    @property({ type: Boolean, reflect: true }) checked = false;

    @defaultValue("checked") defaultChecked = false;

    @property({ type: Boolean, reflect: true }) disabled = false;

    @property({ reflect: true }) form = "";

    @property({ attribute: "hint" }) hint = "";

    @property({ type: Boolean, reflect: true }) indeterminate = false;

    @property({ type: Boolean, reflect: true }) invalid = false;

    @property() name = "";

    @property({ type: Boolean, reflect: true }) pressed = false;

    @property({ type: Boolean }) required = false;

    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    @property() title = "";

    @property() value: string = "";

    get validity() {
        return this.input.validity;
    }

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

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.formControlController.setValidity(this.disabled);
    }

    @watch(["checked", "indeterminate"], { waitUntilFirstUpdate: true })
    handleStateChange() {
        if (!this.indeterminate && this.checked) {
            this.isFadingOut = false;
        }
        this.input.checked = this.checked;
        this.input.indeterminate = this.indeterminate;
        this.formControlController.updateValidity();
    }

    click() {
        this.input.click();
    }

    focus(options?: FocusOptions) {
        this.input.focus(options);
    }

    blur() {
        this.input.blur();
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
        const hasHintSlot = this.hasSlotController.test("hint");
        const hasHint = this.hint ? true : !!hasHintSlot;

        return html`
            <div
                class=${classMap({
                    "size-small": this.size === "small",
                    "size-medium": this.size === "medium",
                    "size-large": this.size === "large",
                })}
            >
                <label
                    part="base"
                    class=${classMap({
                        "checkbox": true,
                        "size-small": this.size === "small",
                        "size-medium": this.size === "medium",
                        "size-large": this.size === "large",
                        "has-focus": this.hasFocus,
                        "is-invalid": this.invalid,
                        "is-disabled": this.disabled,
                        "is-checked": this.checked && !this.isFadingOut,
                        "is-indeterminate": this.indeterminate,
                    })}
                >
                    <input
                        class="checkbox-input"
                        type="checkbox"
                        title=${this.title}
                        name=${this.name}
                        value=${ifDefined(this.value)}
                        .indeterminate=${live(this.indeterminate)}
                        .checked=${live(this.checked)}
                        .disabled=${this.disabled}
                        .required=${this.required}
                        aria-checked=${this.checked ? "true" : "false"}
                        aria-describedby=${this.hint ? "hint-text" : nothing}
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
                            "checkbox-control": true,
                            "fade-in": this.checked && !this.isFadingOut,
                            "fade-out": this.isFadingOut,
                        })}
                    >
                        ${this.checked || this.isFadingOut
                            ? html`
                                  <pc-icon
                                      library="default"
                                      family="solid"
                                      name="check"
                                      part="icon-checked"
                                  ></pc-icon>
                              `
                            : ""}
                        ${this.indeterminate
                            ? html`
                                  <pc-icon
                                      library="default"
                                      family="solid"
                                      name="minus"
                                      part="icon-indeterminate"
                                  ></pc-icon>
                              `
                            : ""}
                    </span>

                    <div class="label" part="label">
                        <slot></slot>
                    </div>
                </label>

                <div
                    class="hint"
                    part="hint"
                    id="hint-text"
                    aria-hidden=${hasHint ? "false" : "true"}
                >
                    <slot name="hint">${this.hint}</slot>
                </div>
            </div>
        `;
    }
}
