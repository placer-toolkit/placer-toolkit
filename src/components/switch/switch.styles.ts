import { css } from "lit";

export const styles = css`
    :host {
        display: inline-block;
    }

    :host([size="small"]) {
        --height: var(--pc-toggle-size-s);
        --thumb-size: calc(var(--pc-toggle-size-s) - 2px);
        --width: calc(var(--height) * 1.75);
        font-size: var(--pc-input-font-size-s);
    }

    :host([size="medium"]) {
        --height: var(--pc-toggle-size-m);
        --thumb-size: calc(var(--pc-toggle-size-m) - 2px);
        --width: calc(var(--height) * 1.75);
        font-size: var(--pc-input-font-size-m);
    }

    :host([size="large"]) {
        --height: var(--pc-toggle-size-l);
        --thumb-size: calc(var(--pc-toggle-size-l) - 2px);
        --width: calc(var(--height) * 1.75);
        font-size: var(--pc-input-font-size-l);
    }

    .switch {
        display: inline-flex;
        position: relative;
        align-items: center;
        vertical-align: middle;
        color: var(--pc-input-label-color);
        font-size: inherit;
        font-family: var(--pc-input-font-family);
        font-weight: var(--pc-input-font-weight);
        cursor: pointer;
    }

    .control {
        display: inline-flex;
        position: relative;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        width: var(--width);
        height: var(--height);
        background-color: var(--pc-color-neutral-200);
        border: var(--pc-input-border-width) solid var(--pc-color-neutral-200);
        border-radius: var(--height);
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .control .thumb {
        background-color: hsl(220, 25%, 96%);
        width: var(--thumb-size);
        height: var(--thumb-size);
        border-radius: 50%;
        translate: calc((var(--width) - var(--height)) / -2);
        box-shadow: var(--pc-shadow-xs);
        transition: outline var(--pc-transition-fast) ease-in-out,
            translate var(--pc-transition-medium)
                cubic-bezier(0.34, 1.35, 0.64, 1);
    }

    .switch-input {
        position: absolute;
        margin: 0;
        padding: 0;
        opacity: 0;
        pointer-events: none;
    }

    .switch:not(.switch-checked):not(.switch-disabled) .control:hover {
        background-color: var(--pc-color-neutral-300);
        border-color: var(--pc-color-neutral-300);
    }

    .switch:not(.switch-checked):not(.switch-disabled) .control:hover:active {
        background-color: var(--pc-color-neutral-100);
        border-color: var(--pc-color-neutral-100);
    }

    .switch:not(.switch-checked):not(.switch-disabled)
        .switch-input:focus-visible
        ~ .control
        .thumb {
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .switch-checked .control {
        background-color: var(--pc-color-primary-400);
        border-color: var(--pc-color-primary-400);
    }

    .switch-checked .control .thumb {
        translate: calc((var(--width) - var(--height)) / 2);
    }

    .switch.switch-checked:not(.switch-disabled) .control:hover {
        background-color: var(--pc-color-primary-500);
        border-color: var(--pc-color-primary-500);
    }

    .switch.switch-checked:not(.switch-disabled) .control:hover:active {
        background-color: var(--pc-color-primary-300);
        border-color: var(--pc-color-primary-300);
    }

    .switch.switch-checked:not(.switch-disabled)
        .switch-input:focus-visible
        ~ .control {
        background-color: var(--pc-color-primary-600);
        border-color: var(--pc-color-primary-600);
    }

    .switch.switch-checked:not(.switch-disabled)
        .switch-input:focus-visible
        ~ .control
        .thumb {
        outline: var(--pc-focus-ring);
        outline-color: var(--pc-color-primary-300);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .switch-disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .label {
        display: inline-block;
        line-height: var(--height);
        margin-inline-start: var(--pc-spacing-s);
        user-select: none;
        -webkit-user-select: none;
        transition: color var(--pc-transition-fast) ease-in-out;
    }

    :host([required]) .label::after {
        content: var(--pc-input-required-content);
        color: var(--pc-input-required-content-color);
        margin-inline-start: var(--pc-input-required-content-offset);
    }

    .hint {
        color: var(--pc-input-hint-text-color);
        font-family: var(--pc-input-font-family);
    }

    @media (forced-colors: active) {
        .switch:not(.switch-disabled) .control:hover .thumb,
        .switch .control .thumb {
            border: 1px solid ButtonText;
            width: calc(var(--thumb-size) - 2px);
            height: calc(var(--thumb-size) - 2px);
        }

        .switch.switch-checked:not(.switch-disabled) .control:hover .thumb,
        .switch-checked .control .thumb {
            background-color: ButtonText;
        }
    }
`;
