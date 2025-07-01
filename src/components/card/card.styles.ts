import { css } from "lit";

export const styles = css`
    :host {
        --border-color: var(--pc-color-neutral-200);
        --border-radius: var(--pc-border-radius-l);
        --border-width: 1px;
        --padding: var(--pc-spacing-l);
        display: inline-block;
    }

    .card {
        display: flex;
        flex-direction: column;
        background-color: var(--pc-panel-background-color);
        border: var(--border-width) solid var(--border-color);
        border-radius: var(--border-radius);
        box-shadow: var(--pc-shadow-l);
    }

    .image {
        display: flex;
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        margin: calc(-1 * var(--border-width));
        overflow: hidden;
    }

    .image::slotted(img),
    .image::slotted(video) {
        display: block;
        width: 100%;
        border-radius: 0;
    }

    .card:not(.card-has-image) .image {
        display: none;
    }

    .header {
        display: block;
        border-bottom: var(--border-width) solid var(--border-color);
        padding: calc(var(--padding) / 2) var(--padding);
    }

    .card:not(.card-has-header) .header {
        display: none;
    }

    .body {
        display: block;
        padding: var(--padding);
    }

    .card-has-footer .footer {
        display: block;
        border-top: var(--border-width) solid var(--border-color);
        padding: var(--padding);
    }

    .card:not(.card-has-footer) .footer {
        display: none;
    }
`;
