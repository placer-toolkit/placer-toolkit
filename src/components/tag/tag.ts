import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { LocalizeController } from "../../utilities/localize.js";
import { emit } from "../../internal/emit.js";
import { PcButton } from "../button/button.js";
import appearanceStyles from "../../styles/utilities/appearance.css";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./tag.css";

/**
 * @summary Tags are used as labels to organise things or to indicate a selection.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-button
 *
 * @slot - The tag’s content.
 *
 * @event pc-remove - Emitted when the remove button is pressed.
 *
 * @csspart content - The tag’s content.
 * @csspart remove-button - The tag’s remove button, a `<pc-button>`.
 * @csspart remove-button-base - The remove button’s base part.
 */
@customElement("pc-tag")
export class PcTag extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = [appearanceStyles, sizeStyles, styles];
    /** @internal This is an internal static property. */
    static dependencies = { "pc-button": PcButton };

    private readonly localize = new LocalizeController(this);

    /** The tag’s appearance. */
    @property({ reflect: true }) appearance:
        | "primary"
        | "success"
        | "neutral"
        | "warning"
        | "danger" = "neutral";

    /** The tag’s variant. */
    @property({ reflect: true }) variant:
        | "accent"
        | "filled"
        | "outlined"
        | "filled outlined" = "filled outlined";

    /** The tag’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Draws a pill‐style tag. */
    @property({ type: Boolean, reflect: true }) pill = false;

    /** Adds a remove button to the tag. */
    @property({ type: Boolean }) removable = false;

    private handleRemoveClick() {
        emit(this, "pc-remove");
    }

    render() {
        return html`
            <slot class="tag-content" part="content"></slot>

            ${this.removable
                ? html`
                      <pc-button
                          class="remove-tag-button"
                          part="remove-button"
                          tabindex="-1"
                          @click=${this.handleRemoveClick}
                          exportparts="base:remove-button-base"
                      >
                          <pc-icon
                              library="system"
                              icon-style="solid"
                              name="xmark"
                              label=${this.localize.term("remove")}
                          ></pc-icon>
                      </pc-button>
                  `
                : ""}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-tag": PcTag;
    }
}
