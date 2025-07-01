import { css } from "lit";

export const styles = css`
    :host {
        --track-width: 0.125rem;
        --track-color: rgb(112 120 128 / 25%);
        --indicator-color: var(--pc-color-primary-600);
        --speed: 2s;

        display: inline-flex;
        width: 1em;
        height: 1em;
        flex: none;
    }

    .spinner {
        flex: 1 1 auto;
        height: 100%;
        width: 100%;
        overflow: visible;
    }

    .track,
    .indicator {
        fill: none;
        stroke-width: var(--track-width);
        r: calc(0.5em - var(--track-width) / 2);
        cx: 0.5em;
        cy: 0.5em;
        transform-origin: 50% 50%;
    }

    .track {
        stroke: var(--track-color);
        transform-origin: 0% 0%;
    }

    .indicator {
        stroke: var(--indicator-color);
        stroke-linecap: round;
        stroke-dasharray: 150% 75%;
        animation: spin var(--speed) linear infinite;
    }

    @keyframes spin {
        0% {
            rotate: 0deg;
            stroke-dasharray: 0% 314.159%;
        }
        50% {
            rotate: 450deg;
            stroke-dasharray: 157.08% 157.08%;
        }
        100% {
            rotate: 1080deg;
            stroke-dasharray: 0% 314.159%;
        }
    }
`;
