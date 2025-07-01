import { css } from "lit";

export const styles = css`
    :host {
        position: relative;
        display: inline-block;
        width: auto;
        cursor: pointer;
    }

    .button {
        display: inline-flex;
        align-items: stretch;
        justify-content: center;
        width: auto;
        min-width: 100%;
        border: none;
        padding: 0;
        box-sizing: border-box;
        color: var(--pc-color-neutral-900);
        font-family: var(--pc-input-font-family);
        font-weight: var(--pc-font-weight-bold);
        vertical-align: middle;
        white-space: nowrap;
        user-select: none;
        -webkit-user-select: none;
        cursor: inherit;
        text-decoration: none;
        transition: all var(--pc-transition-fast) ease-in-out;
        text-align: center;
    }

    .button::-moz-focus-inner {
        border: 0;
    }

    .button:focus {
        outline: none;
    }

    .button:focus-visible {
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .prefix,
    .suffix {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        pointer-events: none;
    }

    .label {
        display: inline-block;
        transition: color var(--pc-transition-fast) ease-in-out;
    }

    .button-disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .button-disabled * {
        pointer-events: none;
    }

    .button,
    .button.button-default {
        background-color: var(--pc-color-neutral-200);
        border: var(--pc-input-border-width) solid var(--pc-color-neutral-100);
    }

    .button:hover:not(.button-disabled),
    .button.button-default:hover:not(.button-disabled) {
        background-color: var(--pc-color-neutral-300);
        border: var(--pc-input-border-width) solid var(--pc-color-neutral-200);
    }

    .button:active:not(.button-disabled),
    .button.button-default:active:not(.button-disabled) {
        background-color: var(--pc-color-neutral-100);
        border: var(--pc-input-border-width) solid var(--pc-color-neutral-100);
        color: var(--pc-color-neutral-800);
    }

    .button.button-primary {
        background-color: var(--pc-color-primary-200);
        border: var(--pc-input-border-width) solid var(--pc-color-primary-100);
    }

    .button.button-primary:hover:not(.button-disabled) {
        background-color: var(--pc-color-primary-300);
        border: var(--pc-input-border-width) solid var(--pc-color-primary-200);
    }

    .button.button-primary:active:not(.button-disabled) {
        background-color: var(--pc-color-primary-100);
        border: var(--pc-input-border-width) solid var(--pc-color-primary-100);
        color: var(--pc-color-primary-800);
    }

    .button.button-success {
        background-color: var(--pc-color-success-200);
        border: var(--pc-input-border-width) solid var(--pc-color-success-100);
    }

    .button.button-success:hover:not(.button-disabled) {
        background-color: var(--pc-color-success-300);
        border: var(--pc-input-border-width) solid var(--pc-color-success-200);
    }

    .button.button-success:active:not(.button-disabled) {
        background-color: var(--pc-color-success-100);
        border: var(--pc-input-border-width) solid var(--pc-color-success-100);
        color: var(--pc-color-success-800);
    }

    .button.button-warning {
        background-color: var(--pc-color-warning-200);
        border: var(--pc-input-border-width) solid var(--pc-color-warning-100);
    }

    .button.button-warning:hover:not(.button-disabled) {
        background-color: var(--pc-color-warning-300);
        border: var(--pc-input-border-width) solid var(--pc-color-warning-200);
    }

    .button.button-warning:active:not(.button-disabled) {
        background-color: var(--pc-color-warning-100);
        border: var(--pc-input-border-width) solid var(--pc-color-warning-100);
        color: var(--pc-color-warning-800);
    }

    .button.button-danger {
        background-color: var(--pc-color-danger-200);
        border: var(--pc-input-border-width) solid var(--pc-color-danger-100);
    }

    .button.button-danger:hover:not(.button-disabled) {
        background-color: var(--pc-color-danger-300);
        border: var(--pc-input-border-width) solid var(--pc-color-danger-200);
    }

    .button.button-danger:active:not(.button-disabled) {
        background-color: var(--pc-color-danger-100);
        border: var(--pc-input-border-width) solid var(--pc-color-danger-100);
        color: var(--pc-color-danger-800);
    }

    .button.button-text {
        background-color: transparent;
        border: 1px solid transparent;
    }

    .button.button-text:hover:not(.button-disabled) {
        background-color: var(--pc-color-neutral-200);
        border: 1px solid var(--pc-color-neutral-200);
        color: var(--pc-color-sky-600);
    }

    .button.button-text:active:not(.button-disabled) {
        background-color: var(--pc-color-neutral-100);
        border: 1px solid var(--pc-color-neutral-100);
        color: var(--pc-color-sky-500);
    }

    .button.button-small.button-has-prefix {
        padding-inline-start: var(--pc-spacing-s);
    }

    .button.button-small.button-has-suffix {
        padding-inline-end: var(--pc-spacing-s);
    }

    .button.button-medium.button-has-prefix {
        padding-inline-start: var(--pc-spacing-m);
    }

    .button.button-medium.button-has-suffix {
        padding-inline-end: var(--pc-spacing-m);
    }

    .button.button-large.button-has-prefix {
        padding-inline-start: var(--pc-spacing-l);
    }

    .button.button-large.button-has-suffix {
        padding-inline-end: var(--pc-spacing-l);
    }

    .button.button-has-prefix.button-has-label .label {
        padding-left: var(--pc-spacing-s);
    }

    .button.button-has-suffix.button-has-label .label {
        padding-right: var(--pc-spacing-s);
    }

    .button.button-small.button-has-label .label {
        padding: 0 var(--pc-spacing-s);
    }

    .button.button-medium.button-has-label .label {
        padding: 0 var(--pc-spacing-m);
    }

    .button.button-large.button-has-label .label {
        padding: 0 var(--pc-spacing-l);
    }

    .button.button-has-prefix.button-has-label .label {
        padding-left: var(--pc-spacing-s);
    }

    .button.button-has-suffix.button-has-label .label {
        padding-right: var(--pc-spacing-s);
    }

    .button.button-small {
        font-size: var(--pc-button-font-size-s);
        border-radius: var(--pc-border-radius-m);
        line-height: calc(
            var(--pc-input-height-s) - var(--pc-input-border-width) * 2
        );
    }

    .button.button-medium {
        min-height: var(--pc-input-height-m);
        font-size: var(--pc-button-font-size-m);
        border-radius: var(--pc-border-radius-m);
        line-height: calc(
            var(--pc-input-height-m) - var(--pc-input-border-width) * 2
        );
    }

    .button.button-large {
        font-size: var(--pc-button-font-size-l);
        border-radius: var(--pc-border-radius-m);
        line-height: calc(
            var(--pc-input-height-l) - var(--pc-input-border-width) * 2
        );
    }

    .button.button-outlined,
    .button.button-outlined:hover,
    .button.button-outlined:active {
        background: transparent !important;
    }

    .radio.button-outlined:hover:not(.button-disabled) {
        background-color: var(--pc-color-neutral-100) !important;
    }

    .radio.button-outlined:active:not(.button-disabled) {
        background-color: var(--pc-color-neutral-50) !important;
    }

    .radio.button-outlined.checked:not(.button-disabled) {
        background-color: var(--pc-color-primary-500) !important;
        border-color: var(--pc-color-primary-500);
        color: var(--pc-color-neutral-0);
    }

    .radio.button-outlined.checked:hover:not(.button-disabled) {
        background-color: var(--pc-color-primary-600) !important;
        border-color: var(--pc-color-primary-600);
    }

    .radio.button-outlined.checked:active:not(.button-disabled) {
        background-color: var(--pc-color-primary-400) !important;
        border-color: var(--pc-color-primary-400);
        color: var(--pc-color-neutral-0);
    }

    .button.button-pill {
        border-radius: var(--pc-border-radius-pill);
    }

    :host(
            [data-pc-button-group-button-first]:not(
                    [data-pc-button-group-button-last]
                )
        )
        .button {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    :host([data-pc-button-group-button-inner]) .button {
        border-radius: 0;
    }

    :host(
            [data-pc-button-group-button-last]:not(
                    [data-pc-button-group-button-first]
                )
        )
        .button {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }

    :host(
            [data-pc-button-group-button]:not(
                    [data-pc-button-group-button-first]
                )
        ) {
        margin-inline-start: calc(-1 * var(--pc-input-border-width));
    }

    :host([data-pc-button-group-button-hover]),
    :host([data-pc-button-group-button-focus]) {
        z-index: 1;
    }

    :host([data-pc-button-group-button][checked]) {
        z-index: 2;
    }
`;
