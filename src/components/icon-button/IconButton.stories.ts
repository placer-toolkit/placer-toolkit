import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./icon-button.js";

const meta: Meta = {
    title: "Components/Icon Button",
    component: "pc-icon-button",
    argTypes: {
        disabled: { control: "boolean" },
        download: { control: "text" },
        href: { control: "text" },
        iconStyle: {
            control: "select",
            options: ["solid", "regular", "brands"],
        },
        label: { control: "text" },
        library: { control: "text" },
        name: { control: "text" },
        src: { control: "text" },
        target: {
            control: "select",
            options: ["_blank", "_parent", "_self"],
        },

        // CSS styles
        fontSize: { control: "text" },
        colorRest: { control: "color" },
        colorHover: { control: "color" },
        colorPressed: { control: "color" },
    },
    args: {
        disabled: false,
        download: undefined,
        href: undefined,
        iconStyle: "solid",
        label: "An icon button with a gear icon",
        library: "default",
        name: "gear",
        src: undefined,
        target: undefined,

        // CSS styles
        fontSize: "1rem",
        colorRest: "var(--pc-color-neutral-600)",
        colorHover: "var(--pc-color-primary-600)",
        colorPressed: "var(--pc-color-primary-500)",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({
        disabled,
        download,
        href,
        iconStyle,
        label,
        library,
        name,
        src,
        target,

        // CSS styles
        fontSize,
        colorRest,
        colorHover,
        colorPressed,
    }) => html`
        <pc-icon-button
            library=${library}
            icon-style=${iconStyle}
            name=${name}
            label=${label}
            src=${src}
            download=${download}
            href=${href}
            target=${target}
            ?disabled=${disabled}
        ></pc-icon-button>

        <style>
            pc-icon-button::part(base) {
                color: ${colorRest} !important;
                font-size: ${fontSize} !important;
            }

            pc-icon-button::part(base):hover {
                color: ${colorHover} !important;
            }

            pc-icon-button::part(base):hover:active {
                color: ${colorPressed} !important;
            }
        </style>
    `,
};

export const Sizing: Story = {
    args: {
        disabled: false,
        iconStyle: "solid",
        label: "A large icon button with a gear icon",
        library: "default",
        name: "gear",
        fontSize: "5rem",
        colorRest: "var(--pc-color-neutral-600)",
        colorHover: "var(--pc-color-primary-600)",
        colorPressed: "var(--pc-color-primary-500)",
    },

    render: ({
        disabled,
        download,
        href,
        iconStyle,
        label,
        library,
        name,
        src,
        target,
        fontSize,
        colorRest,
        colorHover,
        colorPressed,
    }) => html`
        <pc-icon-button
            library=${library}
            icon-style=${iconStyle}
            name=${name}
            label=${label}
            src=${src}
            download=${download}
            href=${href}
            target=${target}
            ?disabled=${disabled}
        ></pc-icon-button>

        <style>
            pc-icon-button::part(base) {
                color: ${colorRest} !important;
                font-size: ${fontSize} !important;
            }

            pc-icon-button::part(base):hover {
                color: ${colorHover} !important;
            }

            pc-icon-button::part(base):hover:active {
                color: ${colorPressed} !important;
            }
        </style>
    `,
};

export const Colour: Story = {
    args: {
        disabled: false,
        iconStyle: "solid",
        label: "An icon button with a warning icon",
        library: "default",
        name: "triangle-exclamation",
        fontSize: "1rem",
        colorRest: "var(--pc-color-neutral-600)",
        colorHover: "var(--pc-color-warning-600)",
        colorPressed: "var(--pc-color-warning-500)",
    },

    render: ({
        disabled,
        download,
        href,
        iconStyle,
        label,
        library,
        name,
        src,
        target,
        fontSize,
        colorRest,
        colorHover,
        colorPressed,
    }) => html`
        <pc-icon-button
            library=${library}
            icon-style=${iconStyle}
            name=${name}
            label=${label}
            src=${src}
            download=${download}
            href=${href}
            target=${target}
            ?disabled=${disabled}
        ></pc-icon-button>

        <style>
            pc-icon-button::part(base) {
                color: ${colorRest} !important;
                font-size: ${fontSize} !important;
            }

            pc-icon-button::part(base):hover {
                color: ${colorHover} !important;
            }

            pc-icon-button::part(base):hover:active {
                color: ${colorPressed} !important;
            }
        </style>
    `,
};

export const Disabled: Story = {
    args: {
        disabled: true,
        iconStyle: "solid",
        label: "A disabled icon button with a gear icon",
        library: "default",
        name: "gear",
        fontSize: "1rem",
        colorRest: "var(--pc-color-neutral-600)",
        colorHover: "var(--pc-color-primary-600)",
        colorPressed: "var(--pc-color-primary-500)",
    },

    render: ({
        disabled,
        download,
        href,
        iconStyle,
        label,
        library,
        name,
        src,
        target,
        fontSize,
        colorRest,
        colorHover,
        colorPressed,
    }) => html`
        <pc-icon-button
            library=${library}
            icon-style=${iconStyle}
            name=${name}
            label=${label}
            src=${src}
            download=${download}
            href=${href}
            target=${target}
            ?disabled=${disabled}
        ></pc-icon-button>

        <style>
            pc-icon-button::part(base) {
                color: ${colorRest} !important;
                font-size: ${fontSize} !important;
            }

            pc-icon-button::part(base):hover {
                color: ${colorHover} !important;
            }

            pc-icon-button::part(base):hover:active {
                color: ${colorPressed} !important;
            }
        </style>
    `,
};
