import { css } from "lit";

export const styles = css`
    :host {
        --width: 31rem;
        --header-spacing: var(--pc-spacing-xl);
        --body-spacing: var(--pc-spacing-s) var(--pc-spacing-xl);
        --footer-spacing: var(--pc-spacing-s) var(--pc-spacing-xl)
            var(--pc-spacing-xl);

        display: contents;
    }

    .dialog {
        display: flex;
        position: fixed;
        align-items: center;
        justify-content: center;
        inset: 0;
        z-index: var(--pc-z-index-dialog);
    }

    .dialog[hidden] {
        display: none !important;
    }

    .dialog-open {
        pointer-events: auto;
    }

    .dialog-panel {
        display: flex;
        flex-direction: column;
        z-index: 2;
        width: var(--width);
        max-width: calc(100% - var(--pc-spacing-xxl));
        max-height: calc(100% - var(--pc-spacing-xxl));
        background-color: var(--pc-panel-background-color);
        border-radius: var(--pc-border-radius-l);
        box-shadow: var(--pc-shadow-xl);
    }

    .dialog-panel:focus {
        outline: none;
    }

    .dialog-header {
        display: flex;
        flex: 0 0 auto;
    }

    .dialog-title {
        flex: 1 1 auto;
        font-size: var(--pc-font-size-l);
        line-height: var(--pc-line-height-dense);
        margin: 0;
        padding: var(--header-spacing);
    }

    .dialog-header-actions {
        display: flex;
        justify-content: end;
        gap: var(--pc-spacing-xs);
        flex-wrap: wrap;
        flex-shrink: 0;
        padding: 0 var(--header-spacing);
    }

    .dialog-header-actions pc-icon-button,
    .dialog-header-actions ::slotted(pc-icon-button) {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        font-size: var(--pc-font-size-m);
    }

    .dialog-body {
        display: block;
        flex: 1 1 auto;
        padding: var(--body-spacing);
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }

    .dialog-footer {
        flex: 0 0 auto;
        text-align: right;
        padding: var(--footer-spacing);
    }

    .dialog-footer ::slotted(pc-button:not(:first-of-type)) {
        margin-inline-start: var(--pc-spacing-xs);
    }

    .dialog:not(.dialog-has-footer) .dialog-footer {
        display: none;
    }

    .dialog-overlay {
        position: fixed;
        inset: 0;
        background-color: var(--pc-overlay-background-color);
        pointer-events: auto;
    }

    .dialog-overlay[hidden] {
        display: none !important;
    }

    @media (forced-colors: active) {
        .dialog-panel {
            border: 1px solid var(--pc-color-neutral-0);
        }
    }

    @media screen and (max-width: 420px) {
        .dialog-panel {
            max-height: 80vh;
        }
    }
`;
