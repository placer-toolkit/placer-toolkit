import { css } from "lit";

export const styles = css`
    :host {
        display: block;
    }

    .menu-label {
        display: inline-block;
        font-family: var(--pc-font-sans);
        font-size: var(--pc-font-size-s);
        font-weight: var(--pc-font-weight-semibold);
        line-height: var(--pc-line-height-normal);
        letter-spacing: var(--pc-letter-spacing-normal);
        color: var(--pc-color-neutral-500);
        padding: var(--pc-spacing-s) 2rem;
        user-select: none;
        -webkit-user-select: none;
    }
`;
