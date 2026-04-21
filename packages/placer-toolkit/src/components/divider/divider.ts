import { customElement, property } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { watch } from "../../internal/watch.js";
import styles from "./divider.css";

/**
 * @summary Dividers are used to visually separate or group elements.
 * @status experimental
 * @since 0.5.1
 *
 * @cssproperty --color: var(--pc-color-surface-border) - The colour of the divider.
 * @cssproperty --stroke-width: var(--pc-panel-border-width) - The stroke width of the divider line.
 * @cssproperty --spacing: var(--pc-content-spacing) - The spacing of the divider.
 */
@customElement("pc-divider")
export class PcDivider extends PlacerElement {
    static css = styles;

    /** Sets the orientation of the divider. */
    @property({ reflect: true }) orientation: "horizontal" | "vertical" =
        "horizontal";

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "separator");
    }

    @watch("vertical")
    handleVerticalChange() {
        this.setAttribute("aria-orientation", this.orientation);
    }

    /* The divider is a simple custom element that does not require
       any content. This is why we’re rendering an empty shadow root. */
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-divider": PcDivider;
    }
}
