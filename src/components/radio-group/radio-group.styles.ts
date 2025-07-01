import { css } from "lit";

export const styles = css`
    :host {
        display: block;
    }

    .form-control {
        position: relative;
        border: none;
        margin: 0;
        padding: 0;
    }

    .form-control .label,
    .form-control .hint {
        display: none;
    }

    .form-control-has-label .label {
        display: inline-block;
        color: var(--pc-input-label-color);
        line-height: var(--pc-line-height-normal);
        margin-bottom: var(--pc-spacing-xs);
        padding: 0;
        transition: color var(--pc-transition-fast) ease-in-out;
    }

    :host([required]) .label::after {
        content: var(--pc-input-required-content);
        color: var(--pc-input-required-content-color);
        margin-inline-start: var(--pc-input-required-content-offset);
    }

    .form-control-has-hint .hint {
        color: var(--pc-input-hint-color);
        font-family: var(--pc-input-font-family);
        margin-top: var(--pc-spacing-xs);
    }
`;
