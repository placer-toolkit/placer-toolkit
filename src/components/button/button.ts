import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import type { PlacerFormControl } from "../../internal/placer-form-control.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import {
    FormControlController,
    validValidityState,
} from "../../internal/form.js";
import { HasSlotController } from "../../internal/slot.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import type { PcIcon } from "../icon/icon.js";
import appearanceStyles from "../../styles/utilities/appearance.css";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./button.css";

/**
 * @summary Buttons represent actions that are available to the user.
 * @status experimental
 * @since 0.1.0
 *
 * @slot - The button’s label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @event pc-focus - Emitted when the button gains focus.
 * @event pc-blur - Emitted when the button loses focus (i.e., is blurred).
 * @event pc-invalid - Emitted when the form control has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart base - The component’s base wrapper.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The button’s label.
 * @csspart suffix - The container that wraps the suffix.
 */
@customElement("pc-button")
export class PcButton extends PlacerElement implements PlacerFormControl {
    /** @internal This is an internal static property. */
    static css = [appearanceStyles, sizeStyles, styles];

    private readonly formControlController = new FormControlController(this, {
        assumeInteractionOn: ["click"],
    });

    private readonly hasSlotController = new HasSlotController(
        this,
        "[default]",
        "prefix",
        "suffix",
    );

    /** @internal This is an internal class property. */
    @query(".button") button!: HTMLButtonElement | HTMLLinkElement;
    /** @internal This is an internal class property. */
    @query("slot:not([name])") labelSlot!: HTMLSlotElement;

    @state() private hasFocus = false;
    /** @internal This is an internal class property. */
    @state() isIconButton = false;
    /** @internal This is an internal class property. */
    @state() invalid = false;

    /** @internal This is an internal property. */
    @property() title = "";

    /** The button’s appearance. */
    @property({ reflect: true }) appearance:
        | "primary"
        | "success"
        | "neutral"
        | "warning"
        | "danger"
        | "text" = "neutral";

    /** The button’s variant. */
    @property({ reflect: true }) variant:
        | "accent"
        | "filled"
        | "outlined"
        | "plain" = "accent";

    /** The button’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Disables the button. */
    @property({ type: Boolean, reflect: true }) disabled = false;

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

        this.handleLabelSlotChange();
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

    private handleLabelSlotChange() {
        const nodes = this.labelSlot.assignedNodes({ flatten: true });

        let hasIconLabel = false;
        let hasIcon = false;
        let hasText = false;
        let hasOtherElements = false;

        [...nodes].forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;

                if (element.localName === "pc-icon") {
                    hasIcon = true;

                    if (!hasIconLabel) {
                        hasIconLabel = (element as PcIcon).label !== undefined;
                    }
                } else {
                    hasOtherElements = true;
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent?.trim() || "";

                if (text.length > 0) {
                    hasText = true;
                }
            }
        });

        this.isIconButton = hasIcon && !hasText && !hasOtherElements;

        if (this.isIconButton && !hasIconLabel) {
            console.warn(
                `<pc-icon> is missing an accessible label. Add a label attribute/property to help screen reader users. ${this}`,
            );
        }
    }

    /** @internal This is an internal method. */
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

    /** Unfocuses the button (i.e., blurs it). */
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
                        "disabled": this.disabled,
                        "focused": this.hasFocus,
                        "icon-button": this.isIconButton,
                        "has-label": this.hasSlotController.test("[default]"),
                        "has-prefix": this.hasSlotController.test("prefix"),
                        "has-suffix": this.hasSlotController.test("suffix"),
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
                    <slot class="prefix" part="prefix" name="prefix"></slot>
                    <slot
                        class="label"
                        part="label"
                        @slotchange=${this.handleLabelSlotChange}
                    ></slot>
                    <slot class="suffix" part="suffix" name="suffix"></slot>
                </a>
            `;
        } else {
            return html`
                <button
                    part="base"
                    class=${classMap({
                        "button": true,
                        "disabled": this.disabled,
                        "focused": this.hasFocus,
                        "icon-button": this.isIconButton,
                        "has-label": this.hasSlotController.test("[default]"),
                        "has-prefix": this.hasSlotController.test("prefix"),
                        "has-suffix": this.hasSlotController.test("suffix"),
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
                    <slot class="prefix" part="prefix" name="prefix"></slot>
                    <slot
                        class="label"
                        part="label"
                        @slotchange=${this.handleLabelSlotChange}
                    ></slot>
                    <slot class="suffix" part="suffix" name="suffix"></slot>
                </button>
            `;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-button": PcButton;
    }
}
