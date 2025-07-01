import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
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

/**
 * @summary Switches allow the user to toggle an option on or off.
 * @status experimental
 * @since 0.1.0
 *
 * @slot — The switch’s label.
 * @slot hint — Text that describes how to use the switch. Alternatively, you can use the `hint` attribute.
 *
 * @event pc-change — Emitted when the switch’s state changes.
 * @event pc-focus — Emitted when the switch gains focus.
 * @event pc-blur — Emitted when the switch loses focus (i.e. is blurred).
 * @event pc-input — Emitted when the switch receives input.
 * @event pc-invalid — Emitted when the form control has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart base — The component’s base wrapper.
 * @csspart control — The control that houses the switch’s thumb.
 * @csspart thumb — The switch’s thumb.
 * @csspart label — The switch’s label.
 * @csspart hint — The hint’s wrapper.
 *
 * @cssproperty --width — The width of the switch.
 * @cssproperty --height — The height of the switch.
 * @cssproperty --thumb-size — The size of the thumb.
 */
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

    /** @internal This is an internal property. */
    @query("input[type='checkbox']") input!: HTMLInputElement;

    @state() private hasFocus = false;
    /** @internal This is an internal property. */
    @property() title = "";

    /** The name of the switch, submitted as a name/value pair with form data. */
    @property() name = "";

    /** The current value of the switch, submitted as a name/value pair with form data. */
    @property() value?: string;

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

    /** @internal This is an internal property. */
    @watch("checked", { waitUntilFirstUpdate: true })
    handleCheckedChange() {
        this.input.checked = this.checked;
        this.formControlController.updateValidity();
    }

    /** @internal This is an internal property. */
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
            <div
                class=${classMap({
                    "form-control": true,
                    "form-control-small": this.size === "small",
                    "form-control-medium": this.size === "medium",
                    "form-control-large": this.size === "large",
                    "form-control-has-hint": hasHint,
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
