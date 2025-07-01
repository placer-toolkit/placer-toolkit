import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styles } from "./spinner.styles.js";

/**
 * @summary Spinners are used to show the progress of an indeterminate operation.
 * @status experimental
 * @since 0.1.0
 *
 * @csspart base — The component’s base wrapper.
 *
 * @cssproperty --track-width — The width of the track.
 * @cssproperty --track-color — The colour of the track.
 * @cssproperty --indicator-color — The colour of the spinner’s indicator.
 * @cssproperty --speed — The time it takes for the spinner to complete one animation cycle.
 */
@customElement("pc-spinner")
export class PcSpinner extends LitElement {
    static styles: CSSResultGroup = styles;

    /** The switch’s label. */
    @property() label = "";

    render() {
        return html`
            <svg
                class="spinner"
                part="base"
                role="progressbar"
                aria-label=${this.label}
            >
                <circle class="track"></circle>
                <circle class="indicator"></circle>
            </svg>
        `;
    }
}
