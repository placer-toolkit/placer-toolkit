import { css } from "lit";

export const styles = css`
    :host {
        display: block;
    }

    .select {
        display: inline-flex;
        position: relative;
        flex: 1 1 auto;
        width: 100%;
        vertical-align: middle;
    }

    .select::part(popup) {
        z-index: var(--pc-z-index-dropdown);
    }

    .select[data-current-placement^="top"]::part(popup) {
        transform-origin: bottom;
    }

    .select[data-current-placement^="bottom"]::part(popup) {
        transform-origin: top;
    }

    .select-combobox {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: start;
        flex: 1;
        min-width: 0;
        width: 100%;
        font-family: var(--pc-input-font-family);
        font-weight: var(--pc-input-font-weight);
        letter-spacing: var(--pc-input-letter-spacing);
        vertical-align: middle;
        overflow: hidden;
        cursor: pointer;
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .select-input {
        -webkit-appearance: none;
        position: relative;
        width: 100%;
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        color: var(--pc-input-color);
        font: inherit;
        cursor: inherit;
        overflow: hidden;
    }

    .select-input::placeholder {
        color: var(--pc-input-placeholder-color);
    }

    .select:not(.select-disabled):hover .select-input {
        color: var(--pc-input-color-hover);
    }

    .select-input:focus {
        outline: none;
    }

    .select-multiple:not(.select-placeholder-visible) .select-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: -1;
    }

    .select-value-input {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: -1;
    }

    .select-tags {
        display: flex;
        align-items: center;
        flex: 1;
        flex-wrap: wrap;
        margin-inline-start: var(--pc-spacing-xs);
    }

    .select-tags::slotted(pc-tag) {
        cursor: pointer !important;
    }

    .select-disabled .select-tags,
    .select-disabled .select-tags::slotted(pc-tag) {
        cursor: not-allowed !important;
    }

    .select-standard .select-combobox {
        background-color: var(--pc-input-background-color);
        border: var(--pc-input-border-width) solid var(--pc-input-border-color);
    }

    .select-standard .select-combobox:hover {
        background-color: var(--pc-input-background-color-hover);
        border-color: var(--pc-input-border-color-hover);
    }

    .select-standard:not(.select-disabled).select-open .select-combobox,
    .select-standard:not(.select-disabled).select-focused .select-combobox {
        background-color: var(--pc-input-background-color-focus);
        border-color: var(--pc-input-border-color);
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .select-standard.select-disabled .select-combobox {
        background-color: var(--pc-input-background-color-disabled);
        border-color: var(--pc-input-border-color-disabled);
        color: var(--pc-input-color-disabled);
        opacity: 0.6;
        cursor: not-allowed;
        outline: none;
    }

    .select-filled .select-combobox {
        background-color: var(--pc-input-filled-background-color);
        color: var(--pc-input-color);
        border: var(--pc-input-border-width) solid transparent;
    }

    .select-filled .select-combobox:hover {
        background-color: var(--pc-input-filled-background-color-hover);
    }

    .select-filled:not(.select-disabled).select-open .select-combobox,
    .select-filled:not(.select-disabled).select-focused .select-combobox {
        background-color: var(--pc-input-filled-background-color-focus);
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .select-filled.select-disabled .select-combobox {
        background-color: var(--pc-input-filled-background-color-disabled);
        opacity: 0.6;
        cursor: not-allowed;
    }

    .select-small .select-combobox {
        height: var(--pc-input-height-s);
        font-size: var(--pc-input-font-size-s);
        border-radius: var(--pc-input-border-radius-s);
        padding-block: 0;
        padding-inline: var(--pc-input-spacing-s);
    }

    .select-small .clear-button {
        margin-inline-start: var(--pc-input-spacing-s);
    }

    .select-small .prefix::slotted(*) {
        margin-inline-end: var(--pc-input-spacing-s);
    }

    .select-small.select-multiple:not(.select-placeholder-visible)
        .prefix::slotted(*) {
        margin-inline-start: var(--pc-input-spacing-s);
    }

    .select-small.select-multiple:not(.select-placeholder-visible)
        .select-combobox {
        padding-block: 2px;
        padding-inline-start: 0;
    }

    .select-small .select-tags {
        gap: 2px;
    }

    .select-medium .select-combobox {
        height: var(--pc-input-height-m);
        font-size: var(--pc-input-font-size-m);
        border-radius: var(--pc-input-border-radius-m);
        padding-block: 0;
        padding-inline: var(--pc-input-spacing-m);
    }

    .select-medium .clear-button {
        margin-inline-start: var(--pc-input-spacing-m);
    }

    .select-medium .prefix::slotted(*) {
        margin-inline-end: var(--pc-input-spacing-m);
    }

    .select-medium.select-multiple:not(.select-placeholder-visible)
        .prefix::slotted(*) {
        margin-inline-start: var(--pc-input-spacing-m);
    }

    .select-medium.select-multiple:not(.select-placeholder-visible)
        .select-combobox {
        padding-block: 3px;
        padding-inline-start: 0;
    }

    .select-medium .select-tags {
        gap: 3px;
    }

    .select-large .select-combobox {
        height: var(--pc-input-height-l);
        font-size: var(--pc-input-font-size-l);
        border-radius: var(--pc-input-border-radius-l);
        padding-block: 0;
        padding-inline: var(--pc-input-spacing-l);
    }

    .select-large .clear-button {
        margin-inline-start: var(--pc-input-spacing-l);
    }

    .select-large .prefix::slotted(*) {
        margin-inline-end: var(--pc-input-spacing-l);
    }

    .select-large.select-multiple:not(.select-placeholder-visible)
        .prefix::slotted(*) {
        margin-inline-start: var(--pc-input-spacing-l);
    }

    .select-large.select-multiple:not(.select-placeholder-visible)
        .select-combobox {
        padding-block: 4px;
        padding-inline-start: 0;
    }

    .select-large .select-tags {
        gap: 4px;
    }

    .select-pill .select-combobox {
        border-radius: var(--pc-border-radius-pill);
    }

    .prefix,
    .suffix {
        display: inline-flex;
        align-items: center;
        flex: 0;
        color: var(--pc-input-placeholder-color);
    }

    .suffix::slotted(*) {
        margin-inline-start: var(--pc-spacing-m);
    }

    .clear-select-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: none;
        background: transparent;
        color: var(--pc-input-icon-color);
        font-size: inherit;
        cursor: pointer;
        transition: color var(--pc-transition-fast) ease-in-out;
    }

    .clear-select-button:hover {
        color: var(--pc-input-icon-color-hover);
    }

    .clear-select-button:active {
        color: var(--pc-input-icon-color-active);
    }

    .clear-select-button:focus {
        outline: none;
    }

    .expand-icon {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        rotate: 0;
        margin-inline-start: var(--pc-spacing-m);
        transition: rotate var(--pc-transition-fast) ease-in-out;
    }

    .select-open .expand-icon {
        rotate: 180deg;
    }

    .select-listbox {
        display: block;
        position: relative;
        font-family: var(--pc-font-sans);
        font-size: var(--pc-font-size-m);
        font-weight: var(--pc-font-weight-normal);
        background-color: var(--pc-panel-background-color);
        border: none;
        border-radius: var(--pc-border-radius-m);
        padding: var(--pc-spacing-xs);
        max-width: var(--auto-size-available-width);
        max-height: var(--auto-size-available-height);
        overflow: auto;
        box-shadow: var(--pc-shadow-l);
        overscroll-behavior: none;
    }

    .select-listbox ::slotted(pc-divider) {
        --spacing: var(--pc-spacing-xs);
    }

    .select-listbox ::slotted(small) {
        display: block;
        font-size: var(--pc-font-size-s);
        font-weight: var(--pc-font-weight-semibold);
        color: var(--pc-color-neutral-500);
        padding-block: var(--pc-spacing-xs);
        padding-inline-start: 2rem;
    }

    .form-control .label,
    .form-control .hint {
        display: none;
    }

    .form-control-has-label .label {
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

    .form-control-has-hint .hint {
        color: var(--pc-input-hint-color);
        font-family: var(--pc-input-font-family);
        margin-top: var(--pc-spacing-xs);
    }
`;
