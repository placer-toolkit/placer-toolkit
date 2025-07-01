import { css } from "lit";

export const styles = css`
    :host {
        display: inline-block;
    }

    .dropdown::part(popup) {
        z-index: var(--pc-z-index-dropdown);
    }

    .dropdown[data-current-placement^="top"]::part(popup) {
        transform-origin: bottom;
    }

    .dropdown[data-current-placement^="bottom"]::part(popup) {
        transform-origin: top;
    }

    .dropdown[data-current-placement^="left"]::part(popup) {
        transform-origin: right;
    }

    .dropdown[data-current-placement^="right"]::part(popup) {
        transform-origin: left;
    }

    .dropdown-trigger {
        display: block;
    }

    .dropdown-panel {
        font-family: var(--pc-font-sans);
        font-size: var(--pc-font-size-m);
        font-weight: var(--pc-font-weight-normal);
        box-shadow: var(--pc-shadow-l);
        border-radius: var(--pc-border-radius-m);
        pointer-events: none;
    }

    .dropdown-open .dropdown-panel {
        display: block;
        pointer-events: all;
    }

    ::slotted(pc-menu) {
        max-width: var(--auto-size-available-width) !important;
        max-height: var(--auto-size-available-height) !important;
    }
`;
