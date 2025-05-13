import { css } from "lit";

export const styles = css`
    :host(:not(:focus-within)) {
        position: absolute !important;
        margin: -1px !important;
        padding: 0 !important;
        width: 1px !important;
        height: 1px !important;
        clip-path: inset(50%) !important;
        border: none !important;
        overflow: hidden !important;
        white-space: nowrap !important;
    }
`;
