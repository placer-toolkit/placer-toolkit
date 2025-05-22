import { css } from "lit";

export const styles = css`
    :host {
        --max-width: 20rem;
        --hide-delay: 0s;
        --show-delay: 0.15s;

        display: contents;
    }

    .tooltip {
        --arrow-size: var(--pc-tooltip-arrow-size);
        --arrow-color: var(--pc-tooltip-background-color);
        box-shadow: var(--pc-shadow-xs);
    }

    .tooltip::part(popup) {
        z-index: var(--pc-z-index-tooltip);
    }

    .tooltip[placement^="top"]::part(popup) {
        transform-origin: bottom;
    }

    .tooltip[placement^="bottom"]::part(popup) {
        transform-origin: top;
    }

    .tooltip[placement^="left"]::part(popup) {
        transform-origin: right;
    }

    .tooltip[placement^="right"]::part(popup) {
        transform-origin: left;
    }

    .tooltip-body {
        display: block;
        width: max-content;
        max-width: var(--max-width);
        border-radius: var(--pc-tooltip-border-radius);
        background-color: var(--pc-tooltip-background-color);
        font-family: var(--pc-tooltip-font-family);
        font-size: var(--pc-tooltip-font-size);
        font-weight: var(--pc-tooltip-font-weight);
        line-height: var(--pc-tooltip-line-height);
        text-align: start;
        white-space: normal;
        color: var(--pc-tooltip-color);
        padding: var(--pc-tooltip-padding);
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
        box-shadow: var(--pc-shadow-xs);
    }
`;
