import { css } from "lit";

export const styles = css`
    :host {
        display: inline-flex;
        color: var(--pc-color-neutral-600);
    }

    .icon-button {
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
        -webkit-appearance: none;
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .icon-button:hover:not(.icon-button-disabled),
    .icon-button:focus-visible:not(.icon-button-disabled) {
        background-color: var(--pc-color-neutral-200);
    }

    .icon-button:active:not(.icon-button-disabled) {
        background-color: var(--pc-color-neutral-100);
        color: var(--pc-color-neutral-500);
    }

    .icon-button:focus {
        outline: none;
    }

    .icon-button-disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .icon-button:focus-visible {
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .icon {
        pointer-events: none;
    }
`;
