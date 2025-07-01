import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { styles } from "./radio.styles.js";

@customElement("pc-radio")
export class PcRadio extends LitElement {
    static styles: CSSResultGroup = styles;

    @state() checked = false;
    @state() protected hasFocus = false;

    @property({ type: Boolean, reflect: true }) disabled = false;

    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    @property() value?: string;

    constructor() {
        super();

        this.addEventListener("click", this.handleClick);
        this.addEventListener("focus", this.handleFocus);
        this.addEventListener("blur", this.handleBlur);
    }

    connectedCallback() {
        super.connectedCallback();
        this.setInitialAttributes();
    }

    private handleClick() {
        if (!this.disabled && !this.checked) {
            this.checked = true;
        }
    }

    private handleFocus() {
        this.hasFocus = true;
        emit(this, "pc-focus");
    }

    private handleBlur() {
        this.hasFocus = false;
        emit(this, "pc-blur");
    }

    private setInitialAttributes() {
        this.setAttribute("role", "radio");
        this.setAttribute("tabindex", "-1");
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    @watch("checked")
    handleCheckedChange() {
        this.setAttribute("aria-checked", this.checked ? "true" : "false");
        this.setAttribute("tabindex", this.checked ? "0" : "-1");
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    render() {
        return html`
            <span
                part="base"
                class=${classMap({
                    "radio": true,
                    "radio-checked": this.checked,
                    "radio-disabled": this.disabled === true,
                    "radio-focused": this.hasFocus,
                    "radio-small": this.size === "small",
                    "radio-medium": this.size === "medium",
                    "radio-large": this.size === "large",
                })}
            >
                <span
                    class="radio-control"
                    part="${`control ${this.checked ? "control-checked" : ""}`}"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="checked-icon"
                        part="checked-icon"
                        viewBox="0 0 16 16"
                    >
                        <circle cx="8" cy="8" r="4.5" fill="currentColor" />
                    </svg>
                </span>

                <slot class="label" part="label"></slot>
            </span>
        `;
    }
}
