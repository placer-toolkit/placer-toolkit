import { css } from "lit";

export const styles = css`
    :host {
        --fa-primary-color: currentColor;
        --fa-secondary-color: currentColor;
        --fa-primary-opacity: 1;
        --fa-secondary-opacity: 0.4;

        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: content-box !important;
        width: 1em;
        height: 1em;
    }

    :host([fixed-width]) {
        width: 1.25em;
    }

    :host([swap-opacity]) .fa-primary {
        opacity: var(--fa-secondary-opacity) !important;
    }

    :host([swap-opacity]) .fa-secondary {
        opacity: var(--fa-primary-opacity) !important;
    }

    svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: currentColor;
        overflow: visible;
    }

    .fa-primary {
        color: var(--fa-primary-color);
        opacity: var(--fa-primary-opacity);
    }

    .fa-secondary {
        color: var(--fa-secondary-color);
        opacity: var(--fa-secondary-opacity);
    }
`;
