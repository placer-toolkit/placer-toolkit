import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { HasSlotController } from "../../internal/slot.js";
import { styles } from "./card.styles.js";

/**
 * @summary Cards can be used to group related subjects in a container.
 * @status experimental
 * @since 0.1.0
 *
 * @slot — The card’s main content.
 * @slot image — An optional image to render at the start of the card.
 * @slot header — An optional header for the card.
 * @slot footer — An optional footer for the card.
 * @slot image — An optional image to render at the start of the card.
 *
 * @csspart base — The component’s base wrapper.
 * @csspart image — The container that wraps the card’s image.
 * @csspart header — The container that wraps the card’s header.
 * @csspart body — The container that wraps the card’s main content.
 * @csspart footer — The container that wraps the card’s footer.
 *
 * @cssproperty --border-color — The card’s border colour, including borders inside the card.
 * @cssproperty --border-radius — The border radius of the card.
 * @cssproperty --border-width — The stroke width of the card’s borders.
 * @cssproperty --padding — The padding surrounding the card’s content.
 */
@customElement("pc-card")
export class PcCard extends LitElement {
    static styles: CSSResultGroup = styles;

    private readonly hasSlotController = new HasSlotController(
        this,
        "image",
        "header",
        "footer",
    );

    render() {
        return html`
            <div
                part="base"
                class=${classMap({
                    "card": true,
                    "card-has-image": this.hasSlotController.test("image"),
                    "card-has-header": this.hasSlotController.test("header"),
                    "card-has-footer": this.hasSlotController.test("footer"),
                })}
            >
                <slot class="image" name="image" part="image"></slot>
                <slot class="header" name="header" part="header"></slot>
                <slot class="body" part="body"></slot>
                <slot class="footer" name="footer" part="footer"></slot>
            </div>
        `;
    }
}
