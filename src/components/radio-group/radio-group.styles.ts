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

    .label {
        padding: 0;
    }

    :host([required]) .label::after {
        content: var(--pc-input-required-content);
        color: var(--pc-input-required-content-color);
        margin-inline-start: var(--pc-input-required-content-offset);
    }

    .hint {
        color: var(--pc-input-hint-text-color);
        font-family: var(--pc-input-font-family);
    }
`;
