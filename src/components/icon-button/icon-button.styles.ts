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
        background: none;
        border: none;
        border-radius: var(--pc-border-radius-m);
        font-size: inherit;
        color: inherit;
        padding: var(--pc-spacing-xs);
        cursor: pointer;
        -webkit-appearance: none;
        transition: all var(--pc-transition-extra-fast) ease-in-out;
    }

    .icon-button:hover:not(.icon-button.disabled),
    .icon-button:focus-visible:not(.icon-button-disabled) {
        color: var(--pc-color-primary-600);
    }

    .icon-button:hover:active:not(.icon-button-disabled) {
        color: var(--pc-color-primary-500);
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
