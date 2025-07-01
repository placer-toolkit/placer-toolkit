//! Popup is a low‐level utility built specifically for positioning elements. Do not mistake it for a tooltip or similar because it does not facilitate an accessible experience! Almost every correct usage of it will involve building other components. It should rarely, if ever, occur directly in your HTML.

import { css } from "lit";

export const styles = css`
    :host {
        --arrow-color: var(--pc-color-neutral-200);
        --arrow-size: 6px;

        /* These properties are computed to account for the arrow’s dimensions
           after being rotated 45°. The constant 0.7071 is derived from sin(45°),
           which is the diagonal size of the arrow’s container after rotating. */
        --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
        --arrow-padding-offset: calc(
            var(--arrow-size-diagonal) - var(--arrow-size)
        );

        display: contents;
    }

    .popup {
        position: absolute;
        isolation: isolate;
        max-width: var(--auto-size-available-width, none);
        max-height: var(--auto-size-available-height, none);
    }

    .popup-fixed {
        position: fixed;
    }

    .popup:not(.popup-active) {
        display: none;
    }

    .popup-arrow {
        position: absolute;
        width: calc(var(--arrow-size-diagonal) * 2);
        height: calc(var(--arrow-size-diagonal) * 2);
        background-color: var(--arrow-color);
        rotate: 45deg;
        z-index: 1;
    }

    .popup-hover-bridge:not(.popup-hover-bridge-visible) {
        display: none;
    }

    .popup-hover-bridge {
        position: fixed;
        inset: 0;
        z-index: calc(var(--pc-z-index-dropdown) - 1);
        clip-path: polygon(
            var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
            var(--hover-bridge-top-right-x, 0)
                var(--hover-bridge-top-right-y, 0),
            var(--hover-bridge-bottom-right-x, 0)
                var(--hover-bridge-bottom-right-y, 0),
            var(--hover-bridge-bottom-left-x, 0)
                var(--hover-bridge-bottom-left-y, 0)
        );
    }
`;
