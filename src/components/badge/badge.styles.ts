import { css } from "lit";

export const styles = css`
    :host {
        display: inline-flex;
    }

    .badge {
        padding: var(--pc-spacing-xxxs) 0.625rem;
        font-family: var(--pc-font-sans);
        font-size: var(--pc-font-size-xs);
        font-weight: var(--pc-font-weight-bold);
        color: var(--pc-color-neutral-0);
        border: 1px solid transparent;
        border-radius: var(--pc-border-radius-pill);
        user-select: none;
        -webkit-user-select: none;
        cursor: inherit;
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .badge,
    .badge-primary {
        --pulse-color: var(--pc-color-primary-600);
        background-color: var(--pc-color-primary-500);
        border: 1px solid var(--pc-color-primary-400);
    }

    .badge.badge-success {
        --pulse-color: var(--pc-color-success-600);
        background-color: var(--pc-color-success-500);
        border: 1px solid var(--pc-color-success-400);
    }

    .badge.badge-neutral {
        --pulse-color: var(--pc-color-neutral-600);
        background-color: var(--pc-color-neutral-500);
        border: 1px solid var(--pc-color-neutral-400);
    }

    .badge.badge-warning {
        --pulse-color: var(--pc-color-warning-600);
        background-color: var(--pc-color-warning-500);
        border: 1px solid var(--pc-color-warning-400);
    }

    .badge.badge-danger {
        --pulse-color: var(--pc-color-danger-600);
        background-color: var(--pc-color-danger-500);
        border: 1px solid var(--pc-color-danger-400);
    }

    .badge-rounded {
        border-radius: var(--pc-border-radius-s);
    }

    .badge-pulse {
        animation: pulse 1.5s cubic-bezier(0, 0.55, 0.45, 1) infinite;
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 var(--pulse-color);
        }

        70% {
            box-shadow: 0 0 0 0.5rem transparent;
        }

        100% {
            box-shadow: 0 0 0 0 transparent;
        }
    }
`;
