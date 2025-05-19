import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./button-group.js";
import "../button/button.js";

const meta: Meta = {
    title: "Components/Button Group",
    component: "pc-button-group",
    subcomponents: {
        "pc-button": "pc-button",
    },
    argTypes: {
        appearance: {
            control: "select",
            options: ["default", "primary", "success", "warning", "danger"],
        },
        label: { control: "text" },
        pill: { control: "boolean" },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
    },
    args: {
        appearance: "default",
        label: "A button group",
        pill: false,
        size: "medium",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({ appearance, label, pill, size }) => html`
        <pc-button-group label=${label}>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Left
            </pc-button>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Centre
            </pc-button>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Right
            </pc-button>
        </pc-button-group>
    `,
};

export const Primary: Story = {
    args: {
        appearance: "primary",
        label: "A primary button group",
        pill: false,
        size: "medium",
    },

    render: ({ appearance, label, pill, size }) => html`
        <pc-button-group label=${label}>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Left
            </pc-button>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Centre
            </pc-button>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Right
            </pc-button>
        </pc-button-group>
    `,
};

export const Large: Story = {
    args: {
        appearance: "default",
        label: "A large button group",
        pill: false,
        size: "large",
    },

    render: ({ appearance, label, pill, size }) => html`
        <pc-button-group label=${label}>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Left
            </pc-button>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Centre
            </pc-button>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Right
            </pc-button>
        </pc-button-group>
    `,
};

export const Small: Story = {
    args: {
        appearance: "default",
        label: "A small button group",
        pill: false,
        size: "small",
    },

    render: ({ appearance, label, pill, size }) => html`
        <pc-button-group label=${label}>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Left
            </pc-button>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Centre
            </pc-button>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Right
            </pc-button>
        </pc-button-group>
    `,
};

export const Pill: Story = {
    args: {
        appearance: "default",
        label: "A button group with pill‐style buttons",
        pill: true,
        size: "medium",
    },

    render: ({ appearance, label, pill, size }) => html`
        <pc-button-group label=${label}>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Left
            </pc-button>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Centre
            </pc-button>
            <pc-button appearance=${appearance} size=${size} ?pill=${pill}>
                Right
            </pc-button>
        </pc-button-group>
    `,
};
