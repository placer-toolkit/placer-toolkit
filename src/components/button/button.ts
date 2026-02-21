import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerFormAssociatedElement } from "../../internal/placer-form-associated-element.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { HasSlotController } from "../../internal/slot.js";
import { MirrorValidator } from "../../internal/validators/mirror-validator.js";
import { PcInvalidEvent } from "../../events/pc-invalid.js";
import { watch } from "../../internal/watch.js";
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
 * @event focus - Emitted when the button gains focus.
 * @event blur - Emitted when the button loses focus (i.e., is blurred).
 * @event pc-invalid - Emitted when the form control has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart base - The component’s base wrapper.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The button’s label.
 * @csspart suffix - The container that wraps the suffix.
 */
@customElement("pc-button")
export class PcButton extends PlacerFormAssociatedElement {
    static shadowRootOptions = {
        ...PlacerFormAssociatedElement.shadowRootOptions,
        delegatesFocus: true,
    };
    static css = [appearanceStyles, sizeStyles, styles];

    static get validators() {
        return [...super.validators, MirrorValidator()];
    }

    assumeInteractionOn = ["click"];

    private readonly hasSlotController = new HasSlotController(
        this,
        "[default]",
        "prefix",
        "suffix",
    );

    @query(".button") button!: HTMLButtonElement | HTMLLinkElement;
    @query("slot:not([name])") labelSlot!: HTMLSlotElement;

    @state() private hasFocus = false;
    @state() isIconButton = false;
    @state() invalid = false;

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
        | "filled outlined"
        | "plain" = "accent";

    /** The button’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Disables the button. */
    @property({ type: Boolean }) disabled = false;

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

    private constructLightDOMButton() {
        const button = document.createElement("button");

        for (const attribute of this.attributes) {
            if (attribute.name === "style") {
                continue;
            }

            button.setAttribute(attribute.name, attribute.value);
        }

        button.hidden = true;
        button.type = this.type;

        if (this.name) {
            button.name = this.name;
        }

        button.value = this.value || "";

        return button;
    }

    private handleClick(event: PointerEvent) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();

            return;
        }

        if (this.type !== "submit" && this.type !== "reset") {
            return;
        }

        const form = this.getForm();

        if (!form) {
            return;
        }

        const lightDOMButton = this.constructLightDOMButton();

        this.parentElement?.append(lightDOMButton);

        lightDOMButton.click();
        lightDOMButton.remove();
    }

    private handleInvalid() {
        this.dispatchEvent(new PcInvalidEvent());
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

    private isButton() {
        return this.href ? false : true;
    }

    private isLink() {
        return this.href ? true : false;
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.updateValidity();
    }

    setValue(..._args: Parameters<PlacerFormAssociatedElement["setValue"]>) {
        // This is a stub. We don’t want to set a value on the form.
        // That happens when the button is clicked and added via the light DOM button.
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
