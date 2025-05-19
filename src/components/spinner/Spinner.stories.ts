import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./spinner.js";

const meta: Meta = {
    title: "Components/Spinner",
    component: "pc-spinner",
    argTypes: {
        // CSS styles
        fontSize: { control: "text" },
        indicatorColor: { control: "color" },
        speed: { control: "text" },
        trackColor: { control: "color" },
        trackWidth: { control: "text" },
    },
    args: {
        fontSize: "1rem",
        indicatorColor: "var(--pc-color-primary-600)",
        speed: "2s",
        trackColor: "rgba(112, 120, 128, 0.25)",
        trackWidth: "0.125rem",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({
        fontSize,
        indicatorColor,
        speed,
        trackColor,
        trackWidth,
    }) => html`
        <pc-spinner
            style="
                --indicator-color: ${indicatorColor};
                --speed: ${speed};
                --track-color: ${trackColor};
                --track-width: ${trackWidth};
                font-size: ${fontSize};
            "
        ></pc-spinner>
    `,
};

export const Sizing: Story = {
    args: {
        fontSize: "3rem",
        indicatorColor: "var(--pc-color-primary-600)",
        speed: "2s",
        trackColor: "rgba(112, 120, 128, 0.25)",
        trackWidth: "0.125rem",
    },

    render: ({
        fontSize,
        indicatorColor,
        speed,
        trackColor,
        trackWidth,
    }) => html`
        <pc-spinner
            style="
                --indicator-color: ${indicatorColor};
                --speed: ${speed};
                --track-color: ${trackColor};
                --track-width: ${trackWidth};
                font-size: ${fontSize};
            "
        ></pc-spinner>
    `,
};

export const TrackWidth: Story = {
    args: {
        fontSize: "1rem",
        indicatorColor: "var(--pc-color-primary-600)",
        speed: "2s",
        trackColor: "rgba(112, 120, 128, 0.25)",
        trackWidth: "0.25rem",
    },

    render: ({
        fontSize,
        indicatorColor,
        speed,
        trackColor,
        trackWidth,
    }) => html`
        <pc-spinner
            style="
                --indicator-color: ${indicatorColor};
                --speed: ${speed};
                --track-color: ${trackColor};
                --track-width: ${trackWidth};
                font-size: ${fontSize};
            "
        ></pc-spinner>
    `,
};

export const Colour: Story = {
    args: {
        fontSize: "1rem",
        indicatorColor: "var(--pc-color-pink-800)",
        speed: "2s",
        trackColor: "var(--pc-color-pink-500)",
        trackWidth: "0.125rem",
    },

    render: ({
        fontSize,
        indicatorColor,
        speed,
        trackColor,
        trackWidth,
    }) => html`
        <pc-spinner
            style="
                --indicator-color: ${indicatorColor};
                --speed: ${speed};
                --track-color: ${trackColor};
                --track-width: ${trackWidth};
                font-size: ${fontSize};
            "
        ></pc-spinner>
    `,
};

export const Speed: Story = {
    args: {
        fontSize: "1rem",
        indicatorColor: "var(--pc-color-primary-600)",
        speed: "5s",
        trackColor: "rgba(112, 120, 128, 0.25)",
        trackWidth: "0.125rem",
    },

    render: ({
        fontSize,
        indicatorColor,
        speed,
        trackColor,
        trackWidth,
    }) => html`
        <pc-spinner
            style="
                --indicator-color: ${indicatorColor};
                --speed: ${speed};
                --track-color: ${trackColor};
                --track-width: ${trackWidth};
                font-size: ${fontSize};
            "
        ></pc-spinner>
    `,
};
