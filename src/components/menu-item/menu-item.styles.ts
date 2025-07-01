import { css } from "lit";

export const styles = css`
    :host {
        --submenu-offset: -2px;
        display: block;
    }

    :host([inert]) {
        display: none;
    }

    .menu-item {
        display: flex;
        position: relative;
        align-items: stretch;
        font-family: var(--pc-font-sans);
        font-size: var(--pc-font-size-m);
        font-weight: var(--pc-font-weight-normal);
        line-height: var(--pc-line-height-normal);
        letter-spacing: var(--pc-letter-spacing-normal);
        color: var(--pc-color-neutral-700);
        padding: var(--pc-spacing-xs);
        border-radius: var(--pc-border-radius-m);
        user-select: none;
        -webkit-user-select: none;
        white-space: nowrap;
        cursor: pointer;
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .menu-item.menu-item-disabled {
        outline: none;
        opacity: 0.6;
        cursor: not-allowed;
    }

    .menu-item.menu-item-loading {
        outline: none;
        cursor: wait;
    }

    .menu-item.menu-item-loading *:not(pc-spinner) {
        opacity: 0.6;
    }

    .menu-item-loading pc-spinner {
        --indicator-color: currentColor;
        --track-width: 0.0625em;
        position: absolute;
        font-size: 0.75em;
        top: calc(50% - 0.5em);
        left: 0.65rem;
        opacity: 1;
    }

    .menu-item .label {
        display: inline-block;
        flex: 1 1 auto;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .menu-item .prefix {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
    }

    .menu-item .prefix::slotted(*) {
        margin-inline-end: var(--pc-spacing-s);
    }

    .menu-item .suffix {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
    }

    .menu-item .suffix::slotted(*) {
        margin-inline-start: var(--pc-spacing-s);
    }

    .menu-item-submenu-expanded::after {
        content: "";
        position: fixed;
        inset: 0;
        clip-path: polygon(
            var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
            var(--safe-triangle-submenu-start-x, 0)
                var(--safe-triangle-submenu-start-y, 0),
            var(--safe-triangle-submenu-end-x, 0)
                var(--safe-triangle-submenu-end-y, 0)
        );
        z-index: calc(var(--pc-z-index-dropdown) - 1);
    }

    :host(:focus-visible) {
        outline: none;
    }

    :host(:hover:not([aria-disabled="true"], :focus-visible)) .menu-item,
    .menu-item-submenu-expanded {
        background-color: var(--pc-color-neutral-100);
        color: var(--pc-color-neutral-950);
    }

    :host(:active:not([aria-disabled="true"], :focus-visible)) .menu-item,
    .menu-item-submenu-expanded {
        filter: brightness(95%);
    }

    :host(:focus-visible) .menu-item {
        outline: 2px var(--pc-focus-ring-style) var(--pc-focus-ring-color);
        outline-offset: -2px;
    }

    .menu-item .menu-item-check,
    .menu-item .menu-item-chevron {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        width: 1.75em;
        visibility: hidden;
    }

    .menu-item-checked .menu-item-check,
    .menu-item-has-submenu .menu-item-chevron {
        visibility: visible;
    }

    pc-popup::part(popup) {
        margin-left: var(--submenu-offset);
        z-index: var(--pc-z-index-dropdown);
        box-shadow: var(--pc-shadow-l);
    }

    .menu-item-rtl pc-popup::part(popup) {
        margin-left: calc(-1 * var(--submenu-offset));
    }

    ::slotted(pc-menu) {
        max-width: var(--auto-size-available-width) !important;
        max-height: var(--auto-size-available-height) !important;
    }

    @media (forced-colors: active) {
        :host(:hover:not([aria-disabled="true"])) .menu-item,
        :host(:focus-visible) .menu-item {
            outline: 1px dashed SelectedItem;
            outline-offset: -1px;
        }
    }
`;
