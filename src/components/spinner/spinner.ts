import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { LocalizeController } from "../../utilities/localize.js";
import styles from "./spinner.css";

/**
 * @summary Spinners are used to show the progress of an indeterminate operation.
 * @status experimental
 * @since 0.1.0
 *
 * @csspart base - The component’s base wrapper.
 *
 * @cssproperty --track-width: 0.125rem - The width of the track.
 * @cssproperty --track-color: var(--pc-color-neutral-fill-normal) - The colour of the track.
 * @cssproperty --indicator-color: var(--pc-color-primary-fill-loud) - The colour of the spinner’s indicator.
 * @cssproperty --speed: 2s - The time it takes for the spinner to complete one animation cycle.
 */
@customElement("pc-spinner")
export class PcSpinner extends PlacerElement {
    static css = styles;

    private readonly localize = new LocalizeController(this);

    render() {
        return html`
            <svg
                class="spinner"
                part="base"
                role="progressbar"
                aria-label=${this.localize.term("loading")}
            >
                <circle class="track"></circle>
                <circle class="indicator"></circle>
            </svg>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-spinner": PcSpinner;
    }
}
