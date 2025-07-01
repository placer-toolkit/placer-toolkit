import { css } from "lit";

export const styles = css`
    :host {
        display: block;
    }

    .details {
        border: 1px solid var(--pc-color-neutral-200);
        border-radius: var(--pc-border-radius-l);
        overflow-anchor: none;
    }

    .details-disabled {
        opacity: 0.6;
    }

    .details-header {
        display: flex;
        align-items: center;
        border-radius: inherit;
        padding: var(--pc-spacing-m);
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
    }

    .details-header::-webkit-details-marker {
        display: none;
    }

    .details-header:focus {
        outline: none;
    }

    .details-header:focus-visible {
        outline: var(--pc-focus-ring);
        outline-offset: calc(var(--pc-focus-ring-offset) + 1px);
    }

    .details-disabled .details-header {
        cursor: not-allowed;
    }

    .details-disabled .details-header:focus-visible {
        outline: none;
        box-shadow: none;
    }

    .details-summary {
        display: flex;
        align-items: center;
        flex: 1 1 auto;
    }

    .summary-icon {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        transition: rotate var(--pc-transition-fast) ease-in-out;
    }

    .details-open .summary-icon {
        rotate: 90deg;
    }

    .details-open.details-rtl .summary-icon {
        rotate: -90deg;
    }

    .details-open slot[name="expand-icon"],
    .details:not(.details-open) slot[name="collapse-icon"] {
        display: none;
    }

    .details-body {
        overflow: hidden;
    }

    .details-content {
        display: block;
        padding: var(--pc-spacing-m);
    }
`;
