import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { emit } from "../../internal/emit.js";
import { PcIconButton } from "../icon-button/icon-button.js";
import { styles } from "./tag.styles.js";

/**
 * @summary Tags are used as labels to organise things or to indicate a selection.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-icon-button
 *
 * @slot — The tag’s content.
 *
 * @event pc-remove — Emitted when the remove button is pressed.
 *
 * @csspart base — The tag’s base wrapper.
 * @csspart content — The tag’s content.
 * @csspart remove-button — The tag’s remove button, a `<pc-icon-button>`.
 * @csspart remove-button__base — The remove button’s base part.
 */
@customElement("pc-tag")
export class PcTag extends LitElement {
    static styles: CSSResultGroup = styles;
    /** @internal This is an internal property. */
    static dependencies = { "pc-icon-button": PcIconButton };

    /** The tag’s appearance. */
    @property({ reflect: true }) appearance:
        | "primary"
        | "success"
        | "neutral"
        | "warning"
        | "danger" = "neutral";

    /** The tag’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Draws an outlined tag. */
    @property({ type: Boolean, reflect: true }) outlined = false;

    /** Draws a pill‐style tag. */
    @property({ type: Boolean, reflect: true }) pill = false;

    /** Adds a remove button to the tag. */
    @property({ type: Boolean }) removable = false;

    private handleRemoveClick() {
        emit(this, "pc-remove");
    }

    render() {
        return html`
            <span
                part="base"
                class=${classMap({
                    "tag": true,
                    "tag-primary": this.appearance === "primary",
                    "tag-success": this.appearance === "success",
                    "tag-neutral": this.appearance === "neutral",
                    "tag-warning": this.appearance === "warning",
                    "tag-danger": this.appearance === "danger",
                    "tag-small": this.size === "small",
                    "tag-medium": this.size === "medium",
                    "tag-large": this.size === "large",
                    "tag-outlined": this.outlined === true,
                    "tag-pill": this.pill === true,
                    "tag-removable": this.removable === true,
                })}
            >
                <slot class="tag-content" part="content"></slot>

                ${this.removable
                    ? html`
                          <pc-icon-button
                              class="remove-tag-button"
                              part="remove-button"
                              library="system"
                              icon-style="solid"
                              name="xmark"
                              label="Remove tag"
                              tabindex="-1"
                              @click=${this.handleRemoveClick}
                              exportparts="base:remove-button__base"
                          ></pc-icon-button>
                      `
                    : ""}
            </span>
        `;
    }
}
