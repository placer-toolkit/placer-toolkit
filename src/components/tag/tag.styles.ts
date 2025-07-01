import { css } from "lit";

export const styles = css`
    :host {
        display: inline-block;
    }

    .tag {
        display: flex;
        align-items: center;
        line-height: var(--pc-line-height-denser);
        white-space: nowrap;
        user-select: none;
        -webkit-user-select: none;
    }

    .remove-tag-button::part(base) {
        background-color: transparent;
        padding: 0;
    }

    .tag-primary {
        background-color: var(--pc-color-primary-50);
        border: 1px solid var(--pc-color-primary-200);
        color: var(--pc-color-primary-700);
    }

    .tag-primary > pc-icon-button::part(base) {
        color: var(--pc-color-primary-500);
    }

    .tag-primary > pc-icon-button:hover::part(base) {
        color: var(--pc-color-primary-600);
    }

    .tag-primary > pc-icon-button:active::part(base) {
        color: var(--pc-color-primary-400);
    }

    .tag-success {
        background-color: var(--pc-color-success-50);
        border: 1px solid var(--pc-color-success-200);
        color: var(--pc-color-success-700);
    }

    .tag-success > pc-icon-button::part(base) {
        color: var(--pc-color-success-500);
    }

    .tag-success > pc-icon-button:hover::part(base) {
        color: var(--pc-color-success-600);
    }

    .tag-success > pc-icon-button:active::part(base) {
        color: var(--pc-color-success-400);
    }

    .tag-neutral {
        background-color: var(--pc-color-neutral-50);
        border: 1px solid var(--pc-color-neutral-200);
        color: var(--pc-color-neutral-700);
    }

    .tag-neutral > pc-icon-button::part(base) {
        color: var(--pc-color-neutral-500);
    }

    .tag-neutral > pc-icon-button:hover::part(base) {
        color: var(--pc-color-neutral-600);
    }

    .tag-neutral > pc-icon-button:active::part(base) {
        color: var(--pc-color-neutral-400);
    }

    .tag-warning {
        background-color: var(--pc-color-warning-50);
        border: 1px solid var(--pc-color-warning-200);
        color: var(--pc-color-warning-700);
    }

    .tag-warning > pc-icon-button::part(base) {
        color: var(--pc-color-warning-500);
    }

    .tag-warning > pc-icon-button:hover::part(base) {
        color: var(--pc-color-warning-600);
    }

    .tag-warning > pc-icon-button:active::part(base) {
        color: var(--pc-color-warning-400);
    }

    .tag-danger {
        background-color: var(--pc-color-danger-50);
        border: 1px solid var(--pc-color-danger-200);
        color: var(--pc-color-danger-700);
    }

    .tag-danger > pc-icon-button::part(base) {
        color: var(--pc-color-danger-500);
    }

    .tag-danger > pc-icon-button:hover::part(base) {
        color: var(--pc-color-danger-600);
    }

    .tag-danger > pc-icon-button:active::part(base) {
        color: var(--pc-color-danger-400);
    }

    .tag-small {
        font-size: var(--pc-button-font-size-s);
        height: calc(var(--pc-input-height-s) * 0.8);
        line-height: calc(
            var(--pc-input-height-s) - var(--pc-input-border-width) * 2
        );
        border-radius: var(--pc-border-radius-s);
        padding: 0 var(--pc-spacing-s);
    }

    .tag-medium {
        font-size: var(--pc-button-font-size-m);
        height: calc(var(--pc-input-height-m) * 0.8);
        line-height: calc(
            var(--pc-input-height-m) - var(--pc-input-border-width) * 2
        );
        border-radius: var(--pc-border-radius-m);
        padding: 0 var(--pc-spacing-m);
    }

    .tag-large {
        font-size: var(--pc-button-font-size-l);
        height: calc(var(--pc-input-height-l) * 0.8);
        line-height: calc(
            var(--pc-input-height-l) - var(--pc-input-border-width) * 2
        );
        border-radius: var(--pc-border-radius-l);
        padding: 0 var(--pc-spacing-l);
    }

    .remove-tag-button {
        margin-inline-start: var(--pc-spacing-s);
    }

    .tag-outlined {
        background-color: transparent;
    }

    .tag-pill {
        border-radius: var(--pc-border-radius-pill);
    }
`;
