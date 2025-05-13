import { css } from "lit";

export const styles = css`
    :host {
        --indicator-color: var(--pc-color-primary-500);
        --track-width: 4px;
        display: block;
    }

    .tab-group {
        display: flex;
        border-radius: 0;
    }

    .tab-group-tabs {
        display: flex;
        position: relative;
    }

    .tab-group-indicator {
        position: absolute;
        transition: all var(--pc-transition-medium) ease-in-out;
    }

    .tab-group-has-scroll-controls .tab-group-navigation-container {
        position: relative;
        padding: 0 var(--pc-spacing-xl);
    }

    .tab-group-has-scroll-controls .tab-group-scroll-button-start-hidden,
    .tab-group-has-scroll-controls .tab-group-scroll-button-end-hidden {
        opacity: 0;
        pointer-events: none;
    }

    .tab-group-navigation-container {
        outline: none;
    }

    .tab-group-body {
        display: block;
        overflow: auto;
    }

    .tab-group-scroll-button {
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        top: 0;
        bottom: 0;
        width: var(--pc-spacing-xl);
        opacity: 1;
        pointer-events: auto;
        transition: opacity var(--pc-transition-fast) ease-in-out;
    }

    .tab-group-scroll-button-start {
        left: 0;
    }

    .tab-group-scroll-button-end {
        right: 0;
    }

    .tab-group-rtl .tab-group-scroll-button-start {
        left: auto;
        right: 0;
    }

    .tab-group-rtl .tab-group-scroll-button-end {
        left: 0;
        right: auto;
    }

    .tab-group-top {
        flex-direction: column;
    }

    .tab-group-top .tab-group-navigation-container {
        order: 1;
    }

    .tab-group-top .tab-group-navigation {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none;
    }

    .tab-group-top .tab-group-navigation::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    .tab-group-top .tab-group-tabs {
        position: relative;
        flex-direction: row;
        flex: 1 1 auto;
    }

    .tab-group-top .tab-group-indicator {
        bottom: 0;
        min-height: var(--track-width);
        background-color: var(--indicator-color);
        border-radius: var(--pc-border-radius-pill);
    }

    .tab-group-top .tab-group-body {
        order: 2;
    }

    .tab-group-top ::slotted(pc-tab-panel) {
        padding: var(--pc-spacing-m) 0;
    }

    .tab-group-bottom {
        flex-direction: column;
    }

    .tab-group-bottom .tab-group-navigation-container {
        order: 2;
    }

    .tab-group-bottom .tab-group-navigation {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none;
    }

    .tab-group-bottom .tab-group-tabs {
        position: relative;
        flex-direction: row;
        flex: 1 1 auto;
    }

    .tab-group-bottom .tab-group-indicator {
        top: 0;
        min-height: var(--track-width);
        background-color: var(--indicator-color);
        border-radius: var(--pc-border-radius-pill);
    }

    .tab-group-bottom .tab-group-body {
        order: 1;
    }

    .tab-group-bottom ::slotted(pc-tab-panel) {
        padding: var(--pc-spacing-m) 0;
    }

    .tab-group-start {
        flex-direction: row;
    }

    .tab-group-start .tab-group-navigation-container {
        order: 1;
    }

    .tab-group-start .tab-group-tabs {
        flex-direction: column;
        flex: 0 0 auto;
    }

    .tab-group-start .tab-group-indicator {
        right: 0;
        min-width: var(--track-width);
        background-color: var(--indicator-color);
        border-radius: var(--pc-border-radius-pill);
    }

    .tab-group-start .tab-group-body {
        flex: 1 1 auto;
        order: 2;
    }

    .tab-group-start ::slotted(pc-tab-panel) {
        padding: 0 var(--pc-spacing-m);
    }

    .tab-group-end {
        flex-direction: row;
    }

    .tab-group-end .tab-group-navigation-container {
        order: 2;
    }

    .tab-group-end .tab-group-tabs {
        flex-direction: column;
        flex: 0 0 auto;
    }

    .tab-group-end .tab-group-indicator {
        left: 0;
        min-height: var(--track-width);
        background-color: var(--indicator-color);
        border-radius: var(--pc-border-radius-pill);
    }

    .tab-group-end.tab-group-rtl .tab-group-indicator {
        right: 0;
        left: auto;
    }

    .tab-group-end .tab-group-body {
        flex: 1 1 auto;
        order: 1;
    }

    .tab-group-end ::slotted(pc-tab-panel) {
        padding: 0 var(--pc-spacing-m);
    }
`;
