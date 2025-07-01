import { css } from "lit";

export const styles = css`
    :host {
        --color: var(--pc-panel-border-color);
        --stroke-width: var(--pc-panel-border-width);
        --spacing: var(--pc-spacing-l);
    }

    :host(:not([vertical])) {
        display: block;
        width: 100%;
        height: var(--stroke-width);
        background-color: var(--color);
        margin: var(--spacing) 0;
        border-radius: var(--pc-border-radius-pill);
    }

    :host([vertical]) {
        display: inline-block;
        height: 100%;
        width: var(--stroke-width);
        background-color: var(--color);
        margin: 0 var(--spacing);
        border-radius: var(--pc-border-radius-pill);
    }
`;
