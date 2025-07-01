import { css } from "lit";

export const styles = css`
    :host {
        --error-color: var(--pc-color-danger-600);
        --success-color: var(--pc-color-success-600);
        display: inline-block;
    }

    .copy-button {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        background: transparent;
        border: none;
        border-radius: var(--pc-border-radius-m);
        font-size: inherit;
        color: inherit;
        padding: var(--pc-spacing-s);
        cursor: pointer;
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .copy-button:hover:not([disabled]),
    .copy-button:focus-visible:not([disabled]) {
        background-color: var(--pc-color-neutral-200);
    }

    .copy-button:active:not([disabled]) {
        background-color: var(--pc-color-neutral-100);
    }

    .copy-button-success .copy-button {
        color: var(--success-color);
    }

    .copy-button-error .copy-button {
        color: var(--error-color);
    }

    .copy-button:focus-visible {
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .copy-button[disabled] {
        opacity: 0.6;
        cursor: not-allowed !important;
    }

    slot {
        display: inline-flex;
    }

    /* This is included since browsers don’t handle the hidden attribute well on slot elements */
    slot[hidden] {
        display: none !important;
    }
`;
