import { css } from "lit";

export const styles = css`
    :host {
        display: block;
        user-select: none;
        -webkit-user-select: none;
    }

    :host(:focus) {
        outline: none;
    }

    .option {
        display: flex;
        position: relative;
        align-items: center;
        font-family: var(--pc-font-sans);
        font-size: var(--pc-font-size-m);
        font-weight: var(--pc-font-weight-normal);
        line-height: var(--pc-line-height-normal);
        letter-spacing: var(--pc-letter-spacing-normal);
        color: var(--pc-color-neutral-700);
        padding: var(--pc-spacing-s) var(--pc-spacing-xxl) var(--pc-spacing-s)
            var(--pc-spacing-s);
        cursor: pointer;
        border-radius: var(--pc-border-radius-m);
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .option:hover:not(.option-disabled) {
        background-color: var(--pc-color-neutral-100);
        color: var(--pc-color-neutral-950);
    }

    .option:active:not(.option-disabled) {
        background-color: var(--pc-color-neutral-100);
        color: var(--pc-color-neutral-950);
        filter: brightness(95%);
    }

    .option-current,
    .option-current.option-disabled {
        background-color: var(--pc-color-neutral-100);
        opacity: 1;
    }

    .option-current:hover,
    .option-current.option-disabled:hover {
        background-color: var(--pc-color-neutral-100);
        filter: brightness(105%);
    }

    .option-current:active,
    .option-current.option-disabled:active {
        background-color: var(--pc-color-neutral-100);
        filter: brightness(95%);
    }

    .option-disabled {
        outline: none;
        opacity: 0.6;
        cursor: not-allowed;
    }

    .label {
        display: inline-block;
        flex: 1 1 auto;
        line-height: var(--pc-line-height-dense);
    }

    .option .option-check {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        visibility: hidden;
        padding-inline-end: var(--pc-spacing-s);
    }

    .option-selected .option-check {
        visibility: visible;
    }

    .prefix,
    .suffix {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
    }

    .prefix::slotted(*) {
        margin-inline-end: var(--pc-spacing-s);
    }

    .suffix::slotted(*) {
        margin-inline-start: var(--pc-spacing-s);
    }

    @media (forced-colors: active) {
        :host(:hover:not([aria-disabled="true"])) .option {
            outline: 1px dashed SelectedItem;
            outline-offset: -1px;
        }
    }
`;
