import { css } from "lit";

export const styles = css`
    :host {
        --size: 3rem;
        display: inline-block;
    }

    .avatar {
        display: inline-flex;
        position: relative;
        align-items: center;
        justify-content: center;
        width: var(--size);
        height: var(--size);
        background-color: var(--pc-color-neutral-500);
        color: var(--pc-color-neutral-0);
        font-family: var(--pc-font-sans);
        font-size: calc(var(--size) * 0.4);
        font-weight: var(--pc-font-weight-bold);
        user-select: none;
        -webkit-user-select: none;
        vertical-align: middle;
        transition: all var(--pc-transition-fast) ease-in-out;
    }

    .circle,
    .circle .image {
        border-radius: var(--pc-border-radius-circle);
    }

    .rounded,
    .rounded .image {
        border-radius: var(--pc-border-radius-m);
    }

    .square {
        border-radius: 0;
    }

    .icon {
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .initials {
        line-height: 1;
        text-transform: uppercase;
    }

    .image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
    }
`;
