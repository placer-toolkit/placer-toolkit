import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { HasSlotController } from "../../internal/slot.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { styles } from "./radio-button.styles.js";

@customElement("pc-radio-button")
export class PcRadioButton extends LitElement {
    static styles: CSSResultGroup = styles;

    private readonly hasSlotController = new HasSlotController(
        this,
        "[default]",
        "prefix",
        "suffix",
    );

    @query(".button") input!: HTMLInputElement;
    @query(".hidden-input") hiddenInput!: HTMLInputElement;

    @state() protected hasFocus = false;

    @property({ type: Boolean, reflect: true }) checked = false;

    @property({ type: Boolean, reflect: true }) disabled = false;

    @property({ type: Boolean, reflect: true }) pill = false;

    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    @property() value?: string;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "presentation");
    }

    private handleClick(e: MouseEvent) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();

            return;
        }

        this.checked = true;
    }

    private handleFocus() {
        this.hasFocus = true;
        emit(this, "pc-focus");
    }

    private handleBlur() {
        this.hasFocus = false;
        emit(this, "pc-blur");
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    focus(options?: FocusOptions) {
        this.input.focus(options);
    }

    blur() {
        this.input.blur();
    }

    render() {
        return html`
            <div part="base" role="presentation">
                <button
                    class=${classMap({
                        "radio": true,
                        "button": true,
                        "button-default": true,
                        "button-small": this.size === "small",
                        "button-medium": this.size === "medium",
                        "button-large": this.size === "large",
                        "button-checked": this.checked === true,
                        "button-disabled": this.disabled === true,
                        "button-focused": this.hasFocus === true,
                        "button-outlined": true,
                        "button-pill": this.pill === true,
                        "button-has-label":
                            this.hasSlotController.test("[default]"),
                        "button-has-prefix":
                            this.hasSlotController.test("prefix"),
                        "button-has-suffix":
                            this.hasSlotController.test("suffix"),
                    })}
                    part="button ${this.checked ? "button-checked" : ""}"
                    type="button"
                    role="radio"
                    aria-checked=${this.checked}
                    aria-disabled=${this.disabled}
                    value=${ifDefined(this.value)}
                    @click=${this.handleClick}
                    @focus=${this.handleFocus}
                    @blur=${this.handleBlur}
                >
                    <slot class="prefix" part="prefix" name="prefix"></slot>
                    <slot class="label" part="label"></slot>
                    <slot class="suffix" part="suffix" name="suffix"></slot>
                </button>
            </div>
        `;
    }
}
