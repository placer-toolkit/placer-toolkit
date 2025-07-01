import { css } from "lit";

export const styles = css`
    :host {
        display: inline-block;
    }

    .checkbox {
        display: inline-flex;
        align-items: flex-start;
        position: relative;
        font-family: var(--pc-input-font-family);
        font-weight: var(--pc-input-font-weight);
        color: var(--pc-input-label-color);
        vertical-align: middle;
        cursor: pointer;
    }

    .checkbox-small {
        --toggle-size: var(--pc-toggle-size-s);
        font-size: var(--pc-input-font-size-s);
    }

    .checkbox-medium {
        --toggle-size: var(--pc-toggle-size-m);
        font-size: var(--pc-input-font-size-m);
    }

    .checkbox-large {
        --toggle-size: var(--pc-toggle-size-l);
        font-size: var(--pc-input-font-size-l);
    }

    .control {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        position: relative;
        width: var(--toggle-size);
        height: var(--toggle-size);
        border: var(--pc-input-border-width) solid var(--pc-input-border-color);
        border-radius: var(--pc-border-radius-s);
        background-color: transparent;
        color: var(--pc-color-neutral-0);
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .control pc-icon {
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--pc-transition-fast) ease-in-out,
            visibility var(--pc-transition-fast) ease-in-out;
    }

    .checkbox-checked .control pc-icon,
    .checkbox-indeterminate .control pc-icon {
        opacity: 1;
        visibility: visible;
    }

    .checkbox-checked:not(.checkbox-fading-out) .control pc-icon {
        opacity: 1;
        visibility: visible;
    }

    .checkbox-fading-out .control pc-icon {
        opacity: 0;
        visibility: hidden;
    }

    .checkbox-input {
        position: absolute;
        margin: 0;
        padding: 0;
        opacity: 0;
        pointer-events: none;
    }

    pc-icon {
        display: inline-flex;
        width: calc(var(--toggle-size) / 1.25);
        height: calc(var(--toggle-size) / 1.25);
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .checkbox:not(.checkbox-checked):not(.checkbox-disabled) .control:hover,
    .checkbox:not(.checkbox-checked):not(.checkbox-disabled)
        .control:focus-visible {
        border-color: var(--pc-input-border-color-hover);
    }

    .checkbox:not(.checkbox-checked):not(.checkbox-disabled) .control:active {
        border-color: var(--pc-input-border-color-active);
    }

    .checkbox:not(.checkbox-checked):not(.checkbox-disabled)
        .checkbox-input:focus-visible
        ~ .control {
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .checkbox-checked .control,
    .checkbox-indeterminate .control {
        border-color: var(--pc-color-primary-500);
        background-color: var(--pc-color-primary-500);
    }

    .checkbox.checkbox-checked:not(.checkbox-disabled) .control:hover,
    .checkbox.checkbox-checked:not(.checkbox-disabled) .control:focus-visible,
    .checkbox.checkbox-indeterminate:not(.checkbox-disabled) .control:hover,
    .checkbox.checkbox-indeterminate:not(.checkbox-disabled)
        .control:focus-visible {
        border-color: var(--pc-color-primary-600);
        background-color: var(--pc-color-primary-600);
    }

    .checkbox.checkbox-checked:not(.checkbox-disabled) .control:active,
    .checkbox.checkbox-indeterminate:not(.checkbox-disabled) .control:active {
        border-color: var(--pc-color-primary-400);
        background-color: var(--pc-color-primary-400);
    }

    .checkbox.checkbox-checked:not(.checkbox-disabled)
        .checkbox-input:focus-visible
        ~ .control,
    .checkbox.checkbox-indeterminate:not(.checkbox-disabled)
        .checkbox-input:focus-visible
        ~ .control {
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .checkbox-disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .label {
        display: inline-block;
        color: var(--pc-input-label-color);
        line-height: var(--toggle-size);
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

    .form-control .hint {
        display: none;
    }

    .form-control-has-hint .hint {
        color: var(--pc-input-hint-color);
        font-family: var(--pc-input-font-family);
    }
`;
