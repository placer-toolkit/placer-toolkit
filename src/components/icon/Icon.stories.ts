import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./icon.js";

const meta: Meta = {
    title: "Components/Icon",
    component: "pc-icon",
    argTypes: {
        iconStyle: {
            control: "select",
            options: ["solid", "regular", "brands"],
        },
        label: { control: "text" },
        library: { control: "text" },
        name: { control: "text" },
        src: { control: "file" },

        // CSS styles
        fontSize: { control: "text" },
        color: { control: "color" },
    },
    args: {
        iconStyle: "solid",
        label: "An icon",
        library: "default",
        name: "house",
        src: undefined,

        // CSS styles
        fontSize: "1rem",
        color: "var(--pc-color-neutral-1000)",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({ iconStyle, label, library, name, src, fontSize, color }) => html`
        <pc-icon
            library=${library}
            icon-style=${iconStyle}
            name=${name}
            src=${src}
            label=${label}
            style="display: inline-flex; font-size: ${fontSize}; color: ${color}"
        ></pc-icon>
    `,
};

export const Colour: Story = {
    args: {
        iconStyle: "solid",
        label: "A coloured icon",
        library: "default",
        name: "battery-three-quarters",
        fontSize: "1rem",
        color: "var(--pc-color-success-500)",
    },

    render: ({ iconStyle, label, library, name, src, fontSize, color }) => html`
        <pc-icon
            library=${library}
            icon-style=${iconStyle}
            name=${name}
            src=${src}
            label=${label}
            style="display: inline-flex; font-size: ${fontSize}; color: ${color}"
        ></pc-icon>
    `,
};

export const Sizing: Story = {
    args: {
        iconStyle: "solid",
        label: "A large icon",
        library: "default",
        name: "house",
        fontSize: "5rem",
        color: "var(--pc-color-neutral-1000)",
    },

    render: ({ iconStyle, label, library, name, src, fontSize, color }) => html`
        <pc-icon
            library=${library}
            icon-style=${iconStyle}
            name=${name}
            src=${src}
            label=${label}
            style="display: inline-flex; font-size: ${fontSize}; color: ${color}"
        ></pc-icon>
    `,
};

export const Label: Story = {
    args: {
        iconStyle: "solid",
        label: "Add to favourites",
        library: "default",
        name: "star",
        fontSize: "1rem",
        color: "var(--pc-color-amber-500)",
    },

    render: ({ iconStyle, label, library, name, src, fontSize, color }) => html`
        <pc-icon
            library=${library}
            icon-style=${iconStyle}
            name=${name}
            src=${src}
            label=${label}
            style="display: inline-flex; font-size: ${fontSize}; color: ${color}"
        ></pc-icon>
    `,
};

export const Custom: Story = {
    args: {
        iconStyle: undefined,
        label: "A custom icon of an epic awesome face",
        library: undefined,
        name: undefined,
        src: "/face-awesome.svg",
        fontSize: "1rem",
        color: undefined,
    },

    render: ({ iconStyle, label, library, name, src, fontSize, color }) => html`
        <pc-icon
            library=${library}
            icon-style=${iconStyle}
            name=${name}
            src=${src}
            label=${label}
            style="display: inline-flex; font-size: ${fontSize}; color: ${color}"
        ></pc-icon>
    `,
};
