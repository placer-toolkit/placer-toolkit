import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./qr-code.js";

const meta: Meta = {
    title: "Components/QR Code",
    component: "pc-qr-code",
    argTypes: {
        background: { control: "color" },
        errorCorrection: {
            control: "select",
            options: ["L", "M", "Q", "H"],
        },
        fill: { control: "color" },
        label: { control: "text" },
        radius: {
            control: {
                type: "number",
                min: 0,
                max: 0.5,
                step: 0.01,
            },
        },
        size: { control: "number" },
        value: { control: "text" },
    },
    args: {
        background: "white",
        errorCorrection: "M",
        fill: "black",
        label: "A QR Code",
        radius: 0,
        size: 128,
        value: "https://example.com",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({
        background,
        errorCorrection,
        fill,
        label,
        radius,
        size,
        value,
    }) => html`
        <pc-qr-code
            background=${background}
            error-correction=${errorCorrection}
            fill=${fill}
            label=${label}
            radius=${radius}
            size=${size}
            value=${value}
        ></pc-qr-code>
    `,
};

export const Sizing: Story = {
    args: {
        background: "white",
        errorCorrection: "M",
        fill: "black",
        label: "A large QR Code",
        radius: 0,
        size: 256,
        value: "https://example.com",
    },

    render: ({
        background,
        errorCorrection,
        fill,
        label,
        radius,
        size,
        value,
    }) => html`
        <pc-qr-code
            background=${background}
            error-correction=${errorCorrection}
            fill=${fill}
            label=${label}
            radius=${radius}
            size=${size}
            value=${value}
        ></pc-qr-code>
    `,
};

export const Colour: Story = {
    args: {
        background: "white",
        errorCorrection: "M",
        fill: "#184050",
        label: "A coloured QR Code",
        radius: 0,
        size: 128,
        value: "https://example.com",
    },

    render: ({
        background,
        errorCorrection,
        fill,
        label,
        radius,
        size,
        value,
    }) => html`
        <pc-qr-code
            background=${background}
            error-correction=${errorCorrection}
            fill=${fill}
            label=${label}
            radius=${radius}
            size=${size}
            value=${value}
        ></pc-qr-code>
    `,
};

export const Radius: Story = {
    args: {
        background: "white",
        errorCorrection: "M",
        fill: "black",
        label: "A QR Code with rounded data",
        radius: 0.5,
        size: 128,
        value: "https://example.com",
    },

    render: ({
        background,
        errorCorrection,
        fill,
        label,
        radius,
        size,
        value,
    }) => html`
        <pc-qr-code
            background=${background}
            error-correction=${errorCorrection}
            fill=${fill}
            label=${label}
            radius=${radius}
            size=${size}
            value=${value}
        ></pc-qr-code>
    `,
};

export const ErrorCorrection: Story = {
    args: {
        background: "white",
        errorCorrection: "H",
        fill: "black",
        label: "A QR Code with error correction set to high",
        radius: 0,
        size: 128,
        value: "https://example.com",
    },

    render: ({
        background,
        errorCorrection,
        fill,
        label,
        radius,
        size,
        value,
    }) => html`
        <pc-qr-code
            background=${background}
            error-correction=${errorCorrection}
            fill=${fill}
            label=${label}
            radius=${radius}
            size=${size}
            value=${value}
        ></pc-qr-code>
    `,
};
