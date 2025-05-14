import { CSSResultGroup, LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import {
    FormControlController,
    validValidityState,
} from "../../internal/form.js";
import { HasSlotController } from "../../internal/slot.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { styles } from "./button.styles.js";
import { PcIcon } from "../icon/icon.js";

@customElement("pc-button")
export class PcButton extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = { "pc-icon": PcIcon };

    // @ts-expect-error
    private readonly formControlController = new FormControlController(this, {
        assumeInteractionOn: ["click"],
    });

    private readonly hasSlotController = new HasSlotController(
        this,
        "[default]",
        "prefix",
        "suffix"
    );

    @query(".button") button!: HTMLButtonElement | HTMLLinkElement;

    @state() private hasFocus = false;
    @state() invalid = false;
    @property() title = "";

    @property({ reflect: true }) appearance:
        | "default"
        | "primary"
        | "success"
        | "warning"
        | "danger"
        | "text" = "default";

    @property({ type: Boolean, reflect: true }) disabled = false;

    @property() download?: string;

    @property() form?: string;

    @property({ attribute: "formaction" }) formAction?: string;

    @property({ attribute: "formenctype" }) formEnctype?:
        | "application/x-www-form-url-encoded"
        | "multipart/form-data"
        | "text/plain";

    @property({ attribute: "formmethod" }) formMethod?: "GET" | "POST";

    @property({ attribute: "formnovalidate", type: Boolean })
    formNoValidate?: boolean;

    @property({ attribute: "formtarget" }) formTarget?:
        | "_self"
        | "_blank"
        | "_parent"
        | "_top"
        | string;

    @property() href = "";

    @property() name = "";

    @property({ type: Boolean, reflect: true }) outlined = false;

    @property({ type: Boolean, reflect: true }) pill = false;

    @property() rel = "noreferrer noopener";

    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    @property() target?: "_blank" | "_parent" | "_self" | "_top";

    @property({ type: Boolean, reflect: true }) type:
        | "button"
        | "submit"
        | "reset" = "button";

    @property() value = "";

    @state() private direction: "ltr" | "rtl" = "ltr";

    get validity() {
        if (this.isButton()) {
            return (this.button as HTMLButtonElement).validity;
        }

        return validValidityState;
    }

    get validationMessage() {
        if (this.isButton()) {
            return (this.button as HTMLButtonElement).validationMessage;
        }

        return "";
    }

    firstUpdated() {
        if (this.isButton()) {
            this.formControlController.updateValidity();
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.updateDirection();
    }

    private updateDirection() {
        const dir = document.documentElement.getAttribute("dir");
        this.direction = dir === "rtl" ? "rtl" : "ltr";
    }

    private handleBlur() {
        this.hasFocus = false;
        emit(this, "pc-blur");
    }

    private handleFocus() {
        this.hasFocus = true;
        emit(this, "pc-focus");
    }

    private handleClick() {
        if (this.type === "submit") {
            this.formControlController.submit(this.button as HTMLInputElement);
        }

        if (this.type === "reset") {
            this.formControlController.reset(this.button as HTMLInputElement);
        }
    }

    private handleInvalid(event: Event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
    }

    private isButton() {
        return this.href ? false : true;
    }

    private isLink() {
        return this.href ? true : false;
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        if (this.isButton()) {
            this.formControlController.setValidity(this.disabled);
        }
    }

    click() {
        this.button.click();
    }

    focus(options?: FocusOptions) {
        this.button.focus(options);
    }

    blur() {
        this.button.blur();
    }

    checkValidity() {
        if (this.isButton()) {
            return (this.button as HTMLButtonElement).checkValidity();
        }

        return true;
    }

    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    reportValidity() {
        if (this.isButton()) {
            return (this.button as HTMLButtonElement).reportValidity();
        }

        return true;
    }

    setCustomValidity(message: string) {
        if (this.isButton()) {
            (this.button as HTMLButtonElement).setCustomValidity(message);
            this.formControlController.updateValidity();
        }
    }

    render() {
        const isLink = this.isLink();

        if (isLink) {
            return html`
                <a
                    part="base"
                    class=${classMap({
                        "button": true,
                        "appearance-default": this.appearance === "default",
                        "appearance-primary": this.appearance === "primary",
                        "appearance-success": this.appearance === "success",
                        "appearance-warning": this.appearance === "warning",
                        "appearance-danger": this.appearance === "danger",
                        "appearance-text": this.appearance === "text",
                        "focused": this.hasFocus === true,
                        "outlined": this.outlined === true,
                        "pill": this.pill === true,
                        "size-small": this.size === "small",
                        "size-medium": this.size === "medium",
                        "size-large": this.size === "large",
                        "has-label": this.hasSlotController.test("[default]"),
                        "has-prefix": this.hasSlotController.test("prefix"),
                        "has-suffix": this.hasSlotController.test("suffix"),
                        "is-rtl": this.direction === "rtl",
                    })}
                    href=${ifDefined(!this.disabled ? this.href : undefined)}
                    target=${ifDefined(this.target)}
                    download=${ifDefined(this.download)}
                    rel=${ifDefined(this.rel)}
                    aria-disabled=${this.disabled ? "true" : "false"}
                    tabindex=${this.disabled ? "-1" : "0"}
                    @click=${this.handleClick}
                    @focus=${this.handleFocus}
                    @blur=${this.handleBlur}
                >
                    <slot class="prefix" name="prefix" part="prefix"></slot>
                    <slot class="label" part="label"></slot>
                    <slot class="suffix" name="suffix" part="suffix"></slot>
                </a>
            `;
        } else {
            return html`
                <button
                    part="base"
                    class=${classMap({
                        "button": true,
                        "appearance-default": this.appearance === "default",
                        "appearance-primary": this.appearance === "primary",
                        "appearance-success": this.appearance === "success",
                        "appearance-warning": this.appearance === "warning",
                        "appearance-danger": this.appearance === "danger",
                        "appearance-text": this.appearance === "text",
                        "focused": this.hasFocus === true,
                        "outlined": this.outlined === true,
                        "pill": this.pill === true,
                        "size-small": this.size === "small",
                        "size-medium": this.size === "medium",
                        "size-large": this.size === "large",
                        "has-label": this.hasSlotController.test("[default]"),
                        "has-prefix": this.hasSlotController.test("prefix"),
                        "has-suffix": this.hasSlotController.test("suffix"),
                    })}
                    ?disabled=${this.disabled}
                    type=${this.type}
                    title=${this.title}
                    name=${this.name}
                    value=${this.value}
                    role="button"
                    aria-disabled=${this.disabled ? "true" : "false"}
                    tabindex=${this.disabled ? "-1" : "0"}
                    @click=${this.handleClick}
                    @focus=${this.handleFocus}
                    @blur=${this.handleBlur}
                    @invalid=${this.handleInvalid}
                >
                    <slot class="prefix" name="prefix" part="prefix"></slot>
                    <slot class="label" part="label"></slot>
                    <slot class="suffix" name="suffix" part="suffix"></slot>
                </button>
            `;
        }
    }
}
