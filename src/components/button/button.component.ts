import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
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
import { PcIcon } from "../icon/icon.js";
import { styles } from "./button.styles.js";

/**
 * @summary Buttons represent actions that are available to the user.
 * @status experimental
 * @since 0.1.0
 *
 * @dependency pc-icon
 *
 * @slot — The button’s label.
 * @slot prefix — A presentational prefix icon or similar element.
 * @slot suffix — A presentational suffix icon or similar element.
 *
 * @event pc-focus — Emitted when the button gains focus.
 * @event pc-blur — Emitted when the button loses focus (i.e. is blurred).
 * @event pc-invalid — Emitted when the form control has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart base — The component’s base wrapper.
 * @csspart prefix — The container that wraps the prefix.
 * @csspart label — The button’s label.
 * @csspart suffix — The container that wraps the suffix.
 */
@customElement("pc-button")
export class PcButton extends LitElement {
    static styles: CSSResultGroup = styles;
    /** @internal This is an internal property. */
    static dependencies = { "pc-icon": PcIcon };

    // @ts-expect-error
    private readonly formControlController = new FormControlController(this, {
        assumeInteractionOn: ["click"],
    });

    private readonly hasSlotController = new HasSlotController(
        this,
        "[default]",
        "prefix",
        "suffix",
    );

    /** @internal This is an internal property. */
    @query(".button") button!: HTMLButtonElement | HTMLLinkElement;

    @state() private hasFocus = false;
    /** @internal This is an internal property. */
    @state() invalid = false;
    /** @internal This is an internal property. */
    @property() title = "";

    /** The button’s appearance. */
    @property({ reflect: true }) appearance:
        | "default"
        | "primary"
        | "success"
        | "warning"
        | "danger"
        | "text" = "default";

    /** The button’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Disables the button. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Draws an outlined button. */
    @property({ type: Boolean, reflect: true }) outlined = false;

    /** Draws a pill‐style button. */
    @property({ type: Boolean, reflect: true }) pill = false;

    /** The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave. When the type is `submit`, the button will submit the surrounding form. */
    @property({ reflect: true }) type: "button" | "submit" | "reset" = "button";

    /** The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter. */
    @property() name = "";

    /** The value of the button, submitted as a pair with the button’s name as part of the form data, but only when this button is the submitter. This attribute is ignored when the `href` attribute is present. */
    @property() value = "";

    /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
    @property() href = "";

    /** Tells the browser where to open the link. It should only be used when the `href` attribute is present. */
    @property() target?: "_blank" | "_parent" | "_self" | "_top";

    /** When using the `href` attribute, this attribute will map to the underlying link’s `rel` attribute. Unlike regular links, the default set for this attribute is `noreferrer noopener` to prevent security exploits. However, if you’re using `target` to point to a specific tab or window, this will prevent that from working properly. You can remove or change the default value by setting the attribute to an empty string or a value of your choice, respectively. */
    @property() rel = "noreferrer noopener";

    /** Tells the browser to download the linked file as this file name. Only used when the `href` attribute is present. */
    @property() download?: string;

    /** This is the “form owner” to associate the button with. If omitted, the closest containing form will be used instead. The value of this attribute must be an id of a form in the same document or shadow root as the button. */
    @property() form?: string;

    /** Used to override the form owner’s `action` attribute. */
    @property({ attribute: "formaction" }) formAction?: string;

    /** Used to override the form owner’s `enctype` attribute. */
    @property({ attribute: "formenctype" }) formEnctype?:
        | "application/x-www-form-url-encoded"
        | "multipart/form-data"
        | "text/plain";

    /** Used to override the form owner’s `method` attribute. */
    @property({ attribute: "formmethod" }) formMethod?: "GET" | "POST";

    /** Used to override the form owner’s `novalidate` attribute. */
    @property({ attribute: "formnovalidate", type: Boolean })
    formNoValidate?: boolean;

    /** Used to override the form owner’s `target` attribute. */
    @property({ attribute: "formtarget" }) formTarget?:
        | "_self"
        | "_blank"
        | "_parent"
        | "_top"
        | string;

    @state() private direction: "ltr" | "rtl" = "ltr";

    /** Gets the validity state object. */
    get validity() {
        if (this.isButton()) {
            return (this.button as HTMLButtonElement).validity;
        }

        return validValidityState;
    }

    /** Gets the validation message. */
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

    private handleClick() {
        if (this.type === "submit") {
            this.formControlController.submit();
        }

        if (this.type === "reset") {
            this.formControlController.reset();
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

    /** @internal This is an internal property. */
    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        if (this.isButton()) {
            this.formControlController.setValidity(this.disabled);
        }
    }

    /** Simulates a click on the button. */
    click() {
        this.button.click();
    }

    /** Focuses the button. */
    focus(options?: FocusOptions) {
        this.button.focus(options);
    }

    /** Unfocuses the button (i.e. blurs it). */
    blur() {
        this.button.blur();
    }

    /** Checks for validity but doesn’t show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
        if (this.isButton()) {
            return (this.button as HTMLButtonElement).checkValidity();
        }

        return true;
    }

    /** Gets the associated form if one exists. */
    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    /** Checks for validity and shows the browser’s validation message if the control is invalid. */
    reportValidity() {
        if (this.isButton()) {
            return (this.button as HTMLButtonElement).reportValidity();
        }

        return true;
    }

    /** Sets a custom validation message. Pass an empty string to restore validity. */
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
                        "button-default": this.appearance === "default",
                        "button-primary": this.appearance === "primary",
                        "button-success": this.appearance === "success",
                        "button-warning": this.appearance === "warning",
                        "button-danger": this.appearance === "danger",
                        "button-text": this.appearance === "text",
                        "button-disabled": this.disabled === true,
                        "button-focused": this.hasFocus === true,
                        "button-outlined": this.outlined === true,
                        "button-pill": this.pill === true,
                        "button-small": this.size === "small",
                        "button-medium": this.size === "medium",
                        "button-large": this.size === "large",
                        "button-has-label":
                            this.hasSlotController.test("[default]"),
                        "button-has-prefix":
                            this.hasSlotController.test("prefix"),
                        "button-has-suffix":
                            this.hasSlotController.test("suffix"),
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
                        "button-default": this.appearance === "default",
                        "button-primary": this.appearance === "primary",
                        "button-success": this.appearance === "success",
                        "button-warning": this.appearance === "warning",
                        "button-danger": this.appearance === "danger",
                        "button-text": this.appearance === "text",
                        "button-disabled": this.disabled === true,
                        "button-focused": this.hasFocus === true,
                        "button-outlined": this.outlined === true,
                        "button-pill": this.pill === true,
                        "button-small": this.size === "small",
                        "button-medium": this.size === "medium",
                        "button-large": this.size === "large",
                        "button-has-label":
                            this.hasSlotController.test("[default]"),
                        "button-has-prefix":
                            this.hasSlotController.test("prefix"),
                        "button-has-suffix":
                            this.hasSlotController.test("suffix"),
                    })}
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
