import { CSSResultGroup, LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { defaultValue } from "../../internal/default-value.js";
import { FormControlController } from "../../internal/form.js";
import { HasSlotController } from "../../internal/slot.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { styles } from "./switch.styles.js";

@customElement("pc-switch")
export class PcSwitch extends LitElement {
    static styles: CSSResultGroup = styles;

    // @ts-expect-error
    private readonly formControlController = new FormControlController(this, {
        value: (control: PcSwitch) =>
            control.checked ? control.value || "on" : undefined,
        defaultValue: (control: PcSwitch) => control.defaultChecked,
        setValue: (control: PcSwitch, checked: boolean) =>
            (control.checked = checked),
    });
    private readonly hasSlotController = new HasSlotController(this, "hint");

    @query("input[type='checkbox']") input!: HTMLInputElement;

    @state() private hasFocus = false;
    @property() title = "";

    @property({ type: Boolean, reflect: true }) checked = false;

    @defaultValue("checked") defaultChecked = false;

    @property({ type: Boolean, reflect: true }) disabled = false;

    @property({ reflect: true }) form = "";

    @property({ attribute: "hint" }) hint = "";

    @property() name = "";

    @property({ type: Boolean, reflect: true }) required = false;

    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    @property() value?: string;

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

    @watch("checked", { waitUntilFirstUpdate: true })
    handleCheckedChange() {
        this.input.checked = this.checked;
        this.formControlController.updateValidity();
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.formControlController.setValidity(true);
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
                    "container": true,
                    "container-small": this.size === "small",
                    "container-medium": this.size === "medium",
                    "container-large": this.size === "large",
                    "container-has-hint": hasHint,
                })}
            >
                <label
                    part="base"
                    class=${classMap({
                        "switch": true,
                        "switch-checked": this.checked,
                        "switch-disabled": this.disabled,
                        "switch-focused": this.hasFocus,
                        "switch-small": this.size === "small",
                        "switch-medium": this.size === "medium",
                        "switch-large": this.size === "large",
                    })}
                >
                    <input
                        class="switch-input"
                        type="checkbox"
                        role="switch"
                        title=${this.title}
                        name=${this.name}
                        value=${ifDefined(this.value)}
                        .checked=${live(this.checked)}
                        .disabled=${this.disabled}
                        .required=${this.required}
                        aria-checked=${this.checked ? "true" : "false"}
                        aria-describedby="hint-text"
                        @click=${this.handleClick}
                        @input=${this.handleInput}
                        @focus=${this.handleFocus}
                        @blur=${this.handleBlur}
                        @invalid=${this.handleInvalid}
                        @keydown=${this.handleKeyDown}
                    />

                    <span part="control" class="control">
                        <span part="thumb" class="thumb"></span>
                    </span>

                    <div part="label" class="label">
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
