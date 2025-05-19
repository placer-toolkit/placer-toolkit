import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./visually-hidden.js";

import "../icon/icon.js";

const meta: Meta = {
    title: "Components/Visually Hidden",
    component: "pc-visually-hidden",
    argTypes: {
        content: { control: "text" },
        visuallyHidden: { control: "text" },
    },
    args: {
        content: "Link to example.com",
        visuallyHidden: "opens in a new window",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({ content, visuallyHidden }) => html`
        <a href="https://example.com/" target="_blank">
            ${content}
            <pc-icon
                library="default"
                iconStyle="solid"
                name="arrow-up-right-from-square"
                style="font-size: 0.75rem; vertical-align: 0.25rem"
                aria-hidden="true"
            ></pc-icon>
            <pc-visually-hidden>${visuallyHidden}</pc-visually-hidden>
        </a>
    `,
};
