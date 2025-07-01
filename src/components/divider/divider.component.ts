import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property } from "lit/decorators.js";
import { watch } from "../../internal/watch.js";
import { styles } from "./divider.styles.js";

/**
 * @summary Dividers are used to visually separate or group elements.
 * @status experimental
 * @since 0.5.1
 *
 * @cssproperty --color — The colour of the divider.
 * @cssproperty --stroke-width — The stroke width of the divider line.
 * @cssproperty --spacing — The spacing of the divider.
 */
@customElement("pc-divider")
export class PcDivider extends LitElement {
    static styles: CSSResultGroup = styles;

    /** Vertically orientates the divider. */
    @property({ type: Boolean, reflect: true }) vertical = false;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "separator");
    }

    /** @internal This is an internal property. */
    @watch("vertical")
    handleVerticalChange() {
        this.setAttribute(
            "aria-orientation",
            this.vertical ? "vertical" : "horizontal",
        );
    }

    render() {
        /* The divider is a simple element that does not require any
           content. This is why we’re rendering an empty shadow root. */
        return html``;
    }
}
