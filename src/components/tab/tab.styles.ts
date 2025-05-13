import { css } from "lit";

export const styles = css`
    :host {
        display: inline-block;
    }

    :host(:focus) {
        outline: transparent;
    }

    :host(:focus-visible) {
        color: var(--pc-color-primary-800);
        outline: var(--pc-focus-ring);
        outline-offset: calc(
            -1 * var(--pc-focus-ring-width) - var(--pc-focus-ring-offset)
        );
    }

    .tab {
        display: inline-flex;
        align-items: center;
        font-family: var(--pc-font-sans);
        font-size: var(--pc-font-size-s);
        font-weight: var(--pc-font-weight-semibold);
        border-radius: var(--pc-border-radius-m);
        color: var(--pc-color-neutral-600);
        padding: var(--pc-spacing-m);
        white-space: nowrap;
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .tab:hover:not(.tab-disabled, .tab-active) {
        color: var(--pc-color-neutral-700);
    }

    .tab:hover:active:not(.tab-disabled, .tab-active) {
        color: var(--pc-color-neutral-500);
    }

    .tab.tab-active:not(.tab-disabled) {
        color: var(--pc-color-neutral-900);
    }

    .tab.tab-closable {
        padding-inline-end: var(--pc-spacing-s);
    }

    .tab.tab-disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .close-button {
        font-size: var(--pc-font-size-s);
        margin-inline-start: var(--pc-spacing-s);
    }

    .close-button::part(base) {
        padding: var(--pc-spacing-xxxs);
    }

    @media (forced-colors: active) {
        .tab.tab-active:not(.tab-disabled) {
            outline: 1px solid transparent;
            outline-offset: -3px;
        }
    }
`;
