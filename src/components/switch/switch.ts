import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { PlacerFormAssociatedElement } from "../../internal/placer-form-associated-element.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { MirrorValidator } from "../../internal/validators/mirror-validator.js";
import { HasSlotController } from "../../internal/slot.js";
import { watch } from "../../internal/watch.js";
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
 * @event change - Emitted when the switch’s state changes.
 * @event input - Emitted when the switch receives input.
 * @event focus - Emitted when the switch gains focus.
 * @event blur - Emitted when the switch loses focus (i.e., is blurred).
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
export class PcSwitch extends PlacerFormAssociatedElement {
    static shadowRootOptions = {
        ...PlacerFormAssociatedElement.shadowRootOptions,
        delegatesFocus: true,
    };
    static css = [formControlStyles, sizeStyles, styles];

    static get validators() {
        return [...super.validators, MirrorValidator()];
    }

    private readonly hasSlotController = new HasSlotController(this, "hint");

    @query('input[type="checkbox"]') input!: HTMLInputElement;

    @property() title = "";

    /** The name of the switch, submitted as a name/value pair with form data. */
    @property() name = "";

    private _value: string | null = this.getAttribute("value") ?? null;

    /** The current value of the switch, submitted as a name/value pair with form data. */
    get value(): string | null {
        return this._value ?? "on";
    }

    @property({ reflect: true })
    set value(value: string | null) {
        this._value = value;
    }

    /** The switch’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Disables the switch. */
    @property({ type: Boolean }) disabled = false;

    /** Checks the switch off. */
    @property({ type: Boolean, reflect: true }) checked = false;

    /** The default value of the switch. Primarily used for resetting the switch. */
    @property({ type: Boolean, attribute: "checked", reflect: true })
    defaultChecked: boolean = this.hasAttribute("checked");

    /** Makes the switch a required field. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** The switch’s hint. if you need to display HTML, use the `hint` slot instead. */
    @property() hint = "";

    firstUpdated(changedProperties: PropertyValues<typeof this>) {
        super.firstUpdated(changedProperties);

        this.handleValueOrCheckedChange();
    }

    private handleClick() {
        this.hasInteracted = true;
        this.checked = !this.checked;

        this.updateComplete.then(() => {
            this.dispatchEvent(
                new Event("change", { bubbles: true, composed: true }),
            );
        });
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (event.key === "ArrowLeft") {
            event.preventDefault();

            this.checked = false;

            this.updateComplete.then(() => {
                this.dispatchEvent(
                    new Event("change", { bubbles: true, composed: true }),
                );
                this.dispatchEvent(
                    new InputEvent("input", { bubbles: true, composed: true }),
                );
            });
        } else if (event.key === "ArrowRight") {
            event.preventDefault();

            this.checked = true;

            this.updateComplete.then(() => {
                this.dispatchEvent(
                    new Event("change", { bubbles: true, composed: true }),
                );
                this.dispatchEvent(
                    new InputEvent("input", { bubbles: true, composed: true }),
                );
            });
        }
    }

    protected willUpdate(changedProperties: PropertyValues<this>): void {
        super.willUpdate(changedProperties);

        if (changedProperties.has("defaultChecked")) {
            if (!this.hasInteracted) {
                this.checked = this.defaultChecked;
            }
        }

        if (
            changedProperties.has("value") ||
            changedProperties.has("checked")
        ) {
            this.handleValueOrCheckedChange();
        }
    }

    handleValueOrCheckedChange() {
        this.setValue(this.checked ? this.value : null, this._value);
        this.updateValidity();
    }

    @watch("defaultChecked")
    handleDefaultCheckedChange() {
        if (!this.hasInteracted && this.checked !== this.defaultChecked) {
            this.checked = this.defaultChecked;
            this.handleValueOrCheckedChange();
        }
    }

    @watch(["checked"])
    handleStateChange() {
        if (this.hasUpdated) {
            this.input.checked = this.checked;
        }

        this.customStates.set("checked", this.checked);
        this.updateValidity();
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.updateValidity();
    }

    /** Simulates a click on the switch. */
    click() {
        this.input.click();
    }

    /** Focuses the switch. */
    focus(options?: FocusOptions) {
        this.input.focus(options);
    }

    /** Unfocuses the switch (i.e., blurs it). */
    blur() {
        this.input.blur();
    }

    setValue(
        value: string | File | FormData | null,
        stateValue?: string | File | FormData | null | undefined,
    ): void {
        if (!this.checked) {
            this.internals.setFormValue(null, null);

            return;
        }

        this.internals.setFormValue(value ?? "on", stateValue);
    }

    formResetCallback(): void {
        this.checked = this.defaultChecked;
        super.formResetCallback();
        this.handleValueOrCheckedChange();
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
