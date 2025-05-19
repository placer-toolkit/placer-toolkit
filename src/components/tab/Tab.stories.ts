import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./tab.js";

const meta: Meta = {
    title: "Components/Tab",
    component: "pc-tab",
    argTypes: {
        active: { control: "boolean" },
        closable: { control: "boolean" },
        disabled: { control: "boolean" },
        label: { control: "text" },
        panel: { control: "text" },
        tabIndex: { control: "number" },
    },
    args: {
        active: false,
        closable: false,
        disabled: false,
        label: "Tab",
        panel: "",
        tabIndex: 0,
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({ active, closable, disabled, label, panel, tabIndex }) => html`
        <pc-tab
            ?active=${active}
            ?closable=${closable}
            ?disabled=${disabled}
            panel=${panel}
            tabIndex=${tabIndex}
        >
            ${label}
        </pc-tab>
    `,
};

export const Active: Story = {
    args: {
        active: true,
        closable: false,
        disabled: false,
        label: "Active",
        panel: "",
        tabIndex: 0,
    },

    render: ({ active, closable, disabled, label, panel, tabIndex }) => html`
        <pc-tab
            ?active=${active}
            ?closable=${closable}
            ?disabled=${disabled}
            panel=${panel}
            tabIndex=${tabIndex}
        >
            ${label}
        </pc-tab>
    `,
};

export const Closable: Story = {
    args: {
        active: false,
        closable: true,
        disabled: false,
        label: "Closable",
        panel: "",
        tabIndex: 0,
    },

    render: ({ active, closable, disabled, label, panel, tabIndex }) => html`
        <pc-tab
            ?active=${active}
            ?closable=${closable}
            ?disabled=${disabled}
            panel=${panel}
            tabIndex=${tabIndex}
        >
            ${label}
        </pc-tab>
    `,
};

export const Disabled: Story = {
    args: {
        active: false,
        closable: false,
        disabled: true,
        label: "Disabled",
        panel: "",
        tabIndex: 0,
    },

    render: ({ active, closable, disabled, label, panel, tabIndex }) => html`
        <pc-tab
            ?active=${active}
            ?closable=${closable}
            ?disabled=${disabled}
            panel=${panel}
            tabIndex=${tabIndex}
        >
            ${label}
        </pc-tab>
    `,
};
