import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./tab-panel.js";

const meta: Meta = {
    title: "Components/Tab Panel",
    component: "pc-tab-panel",
    argTypes: {
        active: { control: "boolean" },
        content: { control: "text" },
        name: { control: "text" },
    },
    args: {
        active: false,
        content: "Tab Panel",
        name: "tab",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({ active, content, name }) => html`
        <pc-tab-panel ?active=${active} name=${name}>${content}</pc-tab-panel>
    `,
};

export const Active: Story = {
    args: {
        active: true,
        content: "Active tab panel",
        name: "tab-active",
    },

    render: ({ active, content, name }) => html`
        <pc-tab-panel ?active=${active} name=${name}>${content}</pc-tab-panel>
    `,
};
