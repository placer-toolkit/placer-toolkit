import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import { HasSlotController } from "../../internal/slot.js";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./card.css";

/**
 * @summary Cards can be used to group related subjects in a container.
 * @status experimental
 * @since 0.1.0
 *
 * @slot - The card’s main content.
 * @slot media - An optional media section to render at the start of the card.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 *
 * @csspart base - The component’s base wrapper.
 * @csspart media - The container that wraps the card’s media.
 * @csspart header - The container that wraps the card’s header.
 * @csspart body - The container that wraps the card’s main content.
 * @csspart footer - The container that wraps the card’s footer.
 *
 * @cssproperty --spacing: var(--pc-spacing-l) - The amount of space around and between sections of the card.
 */
@customElement("pc-card")
export class PcCard extends PlacerElement {
    static css = [sizeStyles, styles];

    private readonly hasSlotController = new HasSlotController(
        this,
        "media",
        "header",
        "footer",
    );

    /** The card’s variant. */
    @property({ reflect: true }) variant:
        | "accent"
        | "filled"
        | "outlined"
        | "filled outlined"
        | "plain" = "outlined";

    render() {
        return html`
            <div
                part="base"
                class=${classMap({
                    "card": true,
                    "has-media": this.hasSlotController.test("media"),
                    "has-header": this.hasSlotController.test("header"),
                    "has-footer": this.hasSlotController.test("footer"),
                })}
            >
                <slot class="media" name="media" part="media"></slot>
                <slot class="header" name="header" part="header"></slot>
                <slot class="body" part="body"></slot>
                <slot class="footer" name="footer" part="footer"></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-card": PcCard;
    }
}
