import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import styles from "./skeleton.css";

/**
 * @summary Skeletons are used to provide a visual representation of where content will eventually be shown.
 * @status experimental
 * @since 1.0.0-alpha.4
 *
 * @csspart indicator - The skeleton’s indicator.
 *
 * @cssproperty --color: var(--pc-color-neutral-fill-normal) - The colour of the skeleton.
 * @cssproperty --sheen-color: color-mix(in oklab, var(--color), var(--pc-color-surface-raised) 40%) - The sheen colour of the skeleton.
 */
@customElement("pc-skeleton")
export class PcSkeleton extends PlacerElement {
    static css = styles;

    /** Determines the effect the skeleton will use. */
    @property({ reflect: true }) effect: "pulse" | "sheen" | "none" = "none";

    render() {
        return html`<div part="indicator" class="indicator"></div>`;
    }
}
