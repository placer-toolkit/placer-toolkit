import { css } from "lit";

export const styles = css`
    :host {
        --divider-width: 2px;
        --handle-size: 2.5rem;
        display: inline-block;
        position: relative;
    }

    .comparer {
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
    }

    .comparer-before-content,
    .comparer-after-content {
        display: block;
        pointer-events: none;
    }

    .comparer-before-content ::slotted(*),
    .comparer-after-content ::slotted(*) {
        display: block;
        max-width: 100% !important;
        height: auto;
        border-radius: var(--pc-border-radius-m);
    }

    .comparer-after-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .comparer-divider {
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        top: 0;
        width: var(--divider-width);
        height: 100%;
        background-color: var(--pc-color-neutral-0);
        translate: calc(var(--divider-width) / -2);
        cursor: ew-resize;
    }

    .comparer-handle {
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        top: calc(50% - (var(--handle-size) / 2));
        width: var(--handle-size);
        height: var(--handle-size);
        background-color: var(--pc-color-neutral-0);
        border-radius: var(--pc-border-radius-circle);
        font-size: calc(var(--handle-size) * 0.5);
        color: var(--pc-color-neutral-700);
        cursor: inherit;
        z-index: 10;
        transition: outline var(--pc-transition-fast) ease-in-out;
    }

    .comparer-handle:focus-visible {
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring);
    }
`;
