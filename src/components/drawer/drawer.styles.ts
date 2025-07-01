import { css } from "lit";

export const styles = css`
    :host {
        --size: 25rem;
        --header-spacing: var(--pc-spacing-xl);
        --body-spacing: var(--pc-spacing-s) var(--pc-spacing-xl);
        --footer-spacing: var(--pc-spacing-s) var(--pc-spacing-xl)
            var(--pc-spacing-xl);

        display: contents;
    }

    .drawer {
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    }

    .drawer-contained {
        position: absolute;
        z-index: initial;
    }

    .drawer-fixed {
        position: fixed;
        z-index: var(--pc-z-index-drawer);
    }

    .drawer-panel {
        display: flex;
        position: absolute;
        flex-direction: column;
        z-index: 2;
        max-width: 100%;
        max-height: 100%;
        background-color: var(--pc-panel-background-color);
        box-shadow: var(--pc-shadow-xl);
        overflow: auto;
        pointer-events: all;
    }

    .drawer-panel:focus {
        outline: none;
    }

    .drawer-top .drawer-panel {
        inset-inline-start: 0;
        inset-inline-end: auto;
        top: 0;
        bottom: auto;
        width: 100%;
        height: var(--size);
    }

    .drawer-end .drawer-panel {
        inset-inline-start: auto;
        inset-inline-end: 0;
        top: 0;
        bottom: auto;
        width: var(--size);
        height: 100%;
    }

    .drawer-bottom .drawer-panel {
        inset-inline-start: 0;
        inset-inline-end: auto;
        top: auto;
        bottom: 0;
        width: 100%;
        height: var(--size);
    }

    .drawer-start .drawer-panel {
        inset-inline-start: 0;
        inset-inline-end: auto;
        top: 0;
        bottom: auto;
        width: var(--size);
        height: 100%;
    }

    .drawer-header {
        display: flex;
    }

    .drawer-title {
        margin: 0;
        padding: var(--header-spacing);
        flex: 1 1 auto;
        font: inherit;
        font-size: var(--pc-font-size-l);
        font-weight: var(--pc-font-weight-bold);
        line-height: var(--pc-line-height-dense);
    }

    .drawer-header-actions {
        display: flex;
        justify-content: end;
        gap: var(--pc-spacing-xs);
        flex-wrap: wrap;
        flex-shrink: 0;
        padding: 0 var(--header-spacing);
    }

    .drawer-header-actions pc-icon-button,
    .drawer-header-actions ::slotted(pc-icon-button) {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        font-size: var(--pc-font-size-m);
    }

    .drawer-body {
        display: block;
        flex: 1 1 auto;
        padding: var(--body-spacing);
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }

    .drawer-footer {
        text-align: right;
        padding: var(--footer-spacing);
    }

    .drawer-footer ::slotted(pc-button:not(:last-of-type)) {
        margin-inline-end: var(--pc-spacing-xs);
    }

    .drawer:not(.drawer-has-footer) .drawer-footer {
        display: none;
    }

    .drawer-overlay {
        display: block;
        position: fixed;
        inset: 0;
        background-color: var(--pc-overlay-background-color);
        pointer-events: all;
    }

    .drawer-contained .drawer-overlay {
        display: none;
    }

    @media (forced-colors: active) {
        .drawer-panel {
            border: 1px solid var(--pc-color-neutral-0);
        }
    }
`;
