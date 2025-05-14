import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "./badge.js";

const meta: Meta = {
    title: "Components/Badge",
    component: "pc-badge",
    argTypes: {
        appearance: {
            control: "select",
            options: ["primary", "success", "neutral", "warning", "danger"],
        },
        label: { control: "text" },
        rounded: { control: "boolean" },
        pulse: { control: "boolean" },
    },
    args: {
        appearance: "primary",
        label: "Badge",
        rounded: false,
        pulse: false,
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({ appearance, label, rounded, pulse }) => html`
        <pc-badge appearance=${appearance} ?rounded=${rounded} ?pulse=${pulse}>
            ${label}
        </pc-badge>
    `,
};

export const Success: Story = {
    args: {
        appearance: "success",
        label: "Success",
        rounded: false,
        pulse: false,
    },

    render: ({ appearance, label, rounded, pulse }) => html`
        <pc-badge appearance=${appearance} ?rounded=${rounded} ?pulse=${pulse}>
            ${label}
        </pc-badge>
    `,
};

export const Rounded: Story = {
    args: {
        appearance: "primary",
        label: "Rounded",
        rounded: true,
        pulse: false,
    },

    render: ({ appearance, label, rounded, pulse }) => html`
        <pc-badge appearance=${appearance} ?rounded=${rounded} ?pulse=${pulse}>
            ${label}
        </pc-badge>
    `,
};

export const Pulse: Story = {
    args: {
        appearance: "primary",
        label: "Pulse",
        rounded: false,
        pulse: true,
    },

    render: ({ appearance, label, rounded, pulse }) => html`
        <pc-badge appearance=${appearance} ?rounded=${rounded} ?pulse=${pulse}>
            ${label}
        </pc-badge>
    `,
};
