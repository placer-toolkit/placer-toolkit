import { CSSResultGroup, LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { HasSlotController } from "../../internal/slot.js";
import { styles } from "./card.styles.js";

@customElement("pc-card")
export class PcCard extends LitElement {
    static styles: CSSResultGroup = styles;

    private readonly hasSlotController = new HasSlotController(
        this,
        "image",
        "header",
        "footer"
    );

    render() {
        return html`
            <div
                part="base"
                class=${classMap({
                    "card": true,
                    "has-image": this.hasSlotController.test("image"),
                    "has-header": this.hasSlotController.test("header"),
                    "has-footer": this.hasSlotController.test("footer"),
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
