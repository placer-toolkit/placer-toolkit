import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./radio.js";

const meta: Meta = {
    title: "Components/Radio",
    component: "pc-radio",
    argTypes: {
        disabled: { control: "boolean" },
        label: { control: "text" },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
        value: { control: "text" },
    },
    args: {
        disabled: false,
        label: "Radio",
        size: "medium",
        value: "radio",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({ disabled, label, size, value }) => html`
        <pc-radio ?disabled=${disabled} size=${size} value=${value}>
            ${label}
        </pc-radio>
    `,
};

export const Large: Story = {
    args: {
        disabled: false,
        label: "Large",
        size: "large",
        value: "radio-large",
    },

    render: ({ disabled, label, size, value }) => html`
        <pc-radio ?disabled=${disabled} size=${size} value=${value}>
            ${label}
        </pc-radio>
    `,
};

export const Small: Story = {
    args: {
        disabled: false,
        label: "Small",
        size: "small",
        value: "radio-small",
    },

    render: ({ disabled, label, size, value }) => html`
        <pc-radio ?disabled=${disabled} size=${size} value=${value}>
            ${label}
        </pc-radio>
    `,
};

export const Disabled: Story = {
    args: {
        disabled: true,
        label: "Disabled",
        size: "medium",
        value: "radio-disabled",
    },

    render: ({ disabled, label, size, value }) => html`
        <pc-radio ?disabled=${disabled} size=${size} value=${value}>
            ${label}
        </pc-radio>
    `,
};
