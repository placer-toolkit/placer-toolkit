import { css } from "lit";

export const styles = css`
    :host {
        --icon-color: var(--pc-color-neutral-300);
        --icon-color-active: var(--pc-color-amber-500);
        --icon-size: 1.2rem;
        display: inline-flex;
    }

    .rating {
        position: relative;
        display: inline-flex;
        border-radius: var(--pc-border-radius-m);
        vertical-align: middle;
    }

    .rating:focus {
        outline: none;
    }

    .rating:focus-visible {
        outline: var(--pc-focus-ring);
        outline-offset: var(--pc-focus-ring-offset);
    }

    .rating-icons {
        display: inline-flex;
        position: relative;
        font-size: var(--icon-size);
        line-height: 0;
        color: var(--icon-color);
        white-space: nowrap;
        cursor: pointer;
    }

    .rating-icons > * {
        padding: 0.0625rem;
    }

    .rating-icon-active,
    .rating-partial-filled {
        color: var(--icon-color-active);
    }

    .rating-partial-icon-container {
        position: relative;
    }

    .rating-partial-filled {
        position: absolute;
        top: 0.0625rem;
        left: 0.0625rem;
    }

    .rating-icon {
        pointer-events: none;
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .rating-icon pc-icon::part(svg) {
        overflow: visible;
    }

    .rating-icon-hover {
        scale: 1.15;
    }

    .rating-disabled .rating-icons,
    .rating-readonly .rating-icons {
        cursor: default;
    }

    .rating-disabled .rating-icon-hover,
    .rating-readonly .rating-icon-hover {
        scale: none;
    }

    .rating-disabled {
        opacity: 0.6;
    }

    .rating-disabled .rating-icons {
        cursor: not-allowed;
    }

    @media (forced-colors: active) {
        .rating-icon-active {
            color: SelectedItem;
        }
    }
`;
