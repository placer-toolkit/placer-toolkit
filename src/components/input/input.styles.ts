import { css } from "lit";

export const styles = css`
    :host {
        display: block;
    }

    .input {
        display: flex;
        position: relative;
        align-items: stretch;
        justify-content: start;
        flex: 1 1 auto;
        width: 100%;
        font-family: var(--pc-input-font-family);
        font-weight: var(--pc-input-font-weight);
        letter-spacing: var(--pc-input-letter-spacing);
        vertical-align: middle;
        overflow: hidden;
        cursor: text;
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .input-standard {
        background-color: var(--pc-input-background-color);
        border: var(--pc-input-border-width) solid var(--pc-input-border-color);
    }

    .input-standard:hover:not(.input-disabled) {
        background-color: var(--pc-input-background-color-hover);
        border-color: var(--pc-input-border-color-hover);
    }

    .input-standard.input-focused:not(.input-disabled) {
        background-color: var(--pc-input-background-color-focus);
        border-color: var(--pc-input-border-color);
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .input-standard.input-focused:not(.input-disabled) .input-control {
        color: var(--pc-input-color-focus);
    }

    .input-standard.input-disabled {
        background-color: var(--pc-input-background-color-disabled);
        border-color: var(--pc-input-border-color-disabled);
        opacity: 0.6;
        cursor: not-allowed;
    }

    .input-standard.input-disabled .input-control {
        color: var(--pc-input-color-disabled);
    }

    .input-standard.input-disabled .input-control::placeholder {
        color: var(--pc-input-placeholder-color-disabled);
    }

    .input-filled {
        background-color: var(--pc-input-filled-background-color);
        color: var(--pc-input-color);
        border: var(--pc-input-border-width) solid transparent;
    }

    .input-filled:hover:not(.input-disabled) {
        background-color: var(--pc-input-filled-background-color-hover);
    }

    .input-filled.input-focused:not(.input-disabled) {
        background-color: var(--pc-input-filled-background-color-focus);
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .input-filled.input-disabled {
        background-color: var(--pc-input-filled-background-color-disabled);
        opacity: 0.6;
        cursor: not-allowed;
    }

    .input-control {
        margin: 0;
        padding: 0;
        flex: 1 1 auto;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        min-width: 0;
        height: 100%;
        color: var(--pc-input-color);
        border: none;
        background: inherit;
        box-shadow: none;
        cursor: inherit;
        -webkit-appearance: none;
    }

    .input-control::-webkit-search-decoration,
    .input-control::-webkit-search-cancel-button,
    .input-control::-webkit-search-results-button,
    .input-control::-webkit-search-results-decoration {
        -webkit-appearance: none;
    }

    .input-control:-webkit-autofill,
    .input-control:-webkit-autofill:hover,
    .input-control:-webkit-autofill:active,
    .input-control:-webkit-autofill:focus {
        box-shadow: inset 0 0 0 var(--pc-input-height-l)
            var(--pc-input-background-color-hover) !important;
        -webkit-text-fill-color: var(--pc-color-primary-500);
        caret-color: var(--pc-input-color);
    }

    .input-filled .input-control:-webkit-autofill,
    .input-filled .input-control:-webkit-autofill:hover,
    .input-filled .input-control:-webkit-autofill:active,
    .input-filled .input-control:-webkit-autofill:focus {
        box-shadow: inset 0 0 0 var(--pc-input-height-l)
            var(--pc-input-background-color-hover) !important;
    }

    .input-control::placeholder {
        color: var(--pc-input-placeholder-color);
        user-select: none;
        -webkit-user-select: none;
    }

    .input:hover:not(.input-disabled) .input-control {
        color: var(--pc-input-color-hover);
    }

    .input-control:focus {
        outline: none;
    }

    .prefix,
    .suffix {
        display: inline-flex;
        align-items: center;
        flex: 0 0 auto;
        cursor: default;
    }

    .prefix ::slotted(*),
    .suffix ::slotted(*) {
        color: var(--pc-input-icon-color);
    }

    .input-small {
        height: var(--pc-input-height-s);
        font-size: var(--pc-input-font-size-s);
        border-radius: var(--pc-input-border-radius-s);
    }

    .input-small .input-control {
        height: calc(
            var(--pc-input-height-s) - var(--pc-input-border-width) * 2
        );
        padding: 0 var(--pc-input-spacing-s);
    }

    .input-small .clear-input-button,
    .input-small .password-toggle-button {
        width: calc(1em + var(--pc-input-spacing-s) * 2);
    }

    .input-small .prefix ::slotted(*) {
        margin-inline-start: var(--pc-input-spacing-s);
        transform: translateY(1px);
    }

    .input-small .suffix ::slotted(*) {
        margin-inline-end: var(--pc-input-spacing-s);
        transform: translateY(1px);
    }

    .input-medium {
        height: var(--pc-input-height-m);
        font-size: var(--pc-input-font-size-m);
        border-radius: var(--pc-input-border-radius-m);
    }

    .input-medium .input-control {
        height: calc(
            var(--pc-input-height-m) - var(--pc-input-border-width) * 2
        );
        padding: 0 var(--pc-input-spacing-m);
    }

    .input-medium .clear-input-button,
    .input-medium .password-toggle-button {
        width: calc(1em + var(--pc-input-spacing-m) * 2);
    }

    .input-medium .prefix ::slotted(*) {
        margin-inline-start: var(--pc-input-spacing-m);
        transform: translateY(1px);
    }

    .input-medium .suffix ::slotted(*) {
        margin-inline-end: var(--pc-input-spacing-m);
        transform: translateY(1px);
    }

    .input-large {
        height: var(--pc-input-height-l);
        font-size: var(--pc-input-font-size-l);
        border-radius: var(--pc-input-border-radius-l);
    }

    .input-large .input-control {
        height: calc(
            var(--pc-input-height-l) - var(--pc-input-border-width) * 2
        );
        padding: 0 var(--pc-input-spacing-l);
    }

    .input-large .clear-input-button,
    .input-large .password-toggle-button {
        width: calc(1em + var(--pc-input-spacing-l) * 2);
    }

    .input-large .prefix ::slotted(*) {
        margin-inline-start: var(--pc-input-spacing-l);
        transform: translateY(2px);
    }

    .input-large .suffix ::slotted(*) {
        margin-inline-end: var(--pc-input-spacing-l);
        transform: translateY(2px);
    }

    .input-pill {
        border-radius: var(--pc-border-radius-pill);
    }

    .clear-input-button,
    .password-toggle-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: inherit;
        color: var(--pc-input-icon-color);
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        transition: color var(--pc-transition-fast) ease-in-out;
    }

    .clear-input-button:hover,
    .password-toggle-button:hover {
        color: var(--pc-input-icon-color-hover);
    }

    .clear-input-button:hover:active,
    .password-toggle-button:hover:active {
        color: var(--pc-input-icon-color-active);
    }

    .clear-input-button:focus,
    .password-toggle-button:focus {
        outline: none;
    }

    ::-ms-reveal {
        display: none;
    }

    .input-no-spin-buttons input[type="number"] {
        -moz-appearance: textfield;
    }

    .input-no-spin-buttons input[type="number"]::-webkit-outer-spin-button,
    .input-no-spin-buttons input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        display: none;
    }

    .label {
        display: inline-block;
        color: var(--pc-input-label-color);
        line-height: var(--pc-line-height-normal);
        margin-bottom: var(--pc-spacing-xs);
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
        margin-top: var(--pc-spacing-xs);
    }
`;
