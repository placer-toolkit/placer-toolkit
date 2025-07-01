import { css } from "lit";

export const styles = css`
    :host {
        --icon-color: currentColor;
        --icon-size: var(--pc-font-size-l);
        --spacing: var(--pc-spacing-l);
    }

    .callout {
        display: flex;
        position: relative;
        align-items: stretch;
        gap: var(--spacing);
        border-radius: var(--pc-border-radius-l);
        padding: var(--spacing);
    }

    .callout ::slotted(p) {
        margin: 0;
    }

    .callout-primary {
        background-color: var(--pc-color-primary-50);
        color: var(--pc-color-primary-700);
        border: 1px solid var(--pc-color-primary-200);
    }

    .callout-success {
        background-color: var(--pc-color-success-50);
        color: var(--pc-color-success-700);
        border: 1px solid var(--pc-color-success-200);
    }

    .callout-neutral {
        background-color: var(--pc-color-neutral-50);
        color: var(--pc-color-neutral-700);
        border: 1px solid var(--pc-color-neutral-200);
    }

    .callout-warning {
        background-color: var(--pc-color-warning-50);
        color: var(--pc-color-warning-700);
        border: 1px solid var(--pc-color-warning-200);
    }

    .callout-danger {
        background-color: var(--pc-color-danger-50);
        color: var(--pc-color-danger-700);
        border: 1px solid var(--pc-color-danger-200);
    }

    div[part="icon"] {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        color: var(--icon-color);
        font-size: var(--icon-size);
    }

    div[part="message"] {
        display: block;
        flex: 1 1 auto;
        overflow: hidden;
    }
`;
