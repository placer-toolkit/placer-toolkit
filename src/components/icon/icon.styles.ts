import { css } from "lit";

export const styles = css`
    :host {
        display: inline-block;
        box-sizing: content-box !important;
        width: 1em;
        height: 1em;
    }

    svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: currentColor;
    }
`;
