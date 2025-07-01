import { css } from "lit";

export const styles = css`
    :host {
        display: block;
        position: relative;
        background-color: var(--pc-panel-background-color);
        border: none;
        border-radius: var(--pc-border-radius-m);
        padding: var(--pc-spacing-xs);
        overflow: auto;
        overscroll-behavior: none;
    }

    ::slotted(pc-divider) {
        --spacing: var(--pc-spacing-xxs);
    }
`;
