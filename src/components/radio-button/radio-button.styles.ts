import { css } from "lit";
import { styles as buttonStyles } from "../button/button.styles.js";

export const styles = css`
    ${buttonStyles}

    .prefix,
    .label,
    .suffix {
        display: inline-flex;
        position: relative;
        align-items: center;
    }

    .hidden-input {
        all: unset;
        position: absolute;
        inset: 0;
        opacity: 0;
        outline: 1px dotted var(--pc-color-danger-500);
        z-index: -1;
    }
`;
