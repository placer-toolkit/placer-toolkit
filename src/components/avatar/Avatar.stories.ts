import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./avatar.js";

const meta: Meta = {
    title: "Components/Avatar",
    component: "pc-avatar",
    argTypes: {
        image: { control: "file" },
        initials: { control: "text" },
        label: { control: "text" },
        loading: {
            control: "select",
            options: ["eager", "lazy"],
        },
        shape: {
            control: "select",
            options: ["circle", "rounded", "square"],
        },
    },
    args: {
        image: undefined,
        initials: undefined,
        label: "User avatar",
        loading: "eager",
        shape: "circle",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({ image, initials, label, loading, shape }) => html`
        <pc-avatar
            image=${image}
            initials=${initials}
            label=${label}
            loading=${loading}
            shape=${shape}
        ></pc-avatar>
    `,
};

export const Image: Story = {
    args: {
        image: "/avatar.png",
        label: "randomguy-2650’s avatar",
        loading: "eager",
        shape: "circle",
    },

    render: ({ image, initials, label, loading, shape }) => html`
        <pc-avatar
            image=${image}
            initials=${initials}
            label=${label}
            loading=${loading}
            shape=${shape}
        ></pc-avatar>
    `,
};

export const Initials: Story = {
    args: {
        initials: "PC",
        label: "Placer Toolkit’s avatar",
        loading: "eager",
        shape: "circle",
    },

    render: ({ image, initials, label, loading, shape }) => html`
        <pc-avatar
            image=${image}
            initials=${initials}
            label=${label}
            loading=${loading}
            shape=${shape}
        ></pc-avatar>
    `,
};

export const Rounded: Story = {
    args: {
        label: "Rounded user avatar",
        loading: "eager",
        shape: "rounded",
    },

    render: ({ image, initials, label, loading, shape }) => html`
        <pc-avatar
            image=${image}
            initials=${initials}
            label=${label}
            loading=${loading}
            shape=${shape}
        ></pc-avatar>
    `,
};

export const Square: Story = {
    args: {
        label: "Square user avatar",
        loading: "eager",
        shape: "square",
    },

    render: ({ image, initials, label, loading, shape }) => html`
        <pc-avatar
            image=${image}
            initials=${initials}
            label=${label}
            loading=${loading}
            shape=${shape}
        ></pc-avatar>
    `,
};

export const LazyLoaded: Story = {
    args: {
        image: "/avatar.png",
        label: "Lazy‐loaded user avatar",
        loading: "lazy",
        shape: "circle",
    },

    render: ({ image, initials, label, loading, shape }) => html`
        <pc-avatar
            image=${image}
            initials=${initials}
            label=${label}
            loading=${loading}
            shape=${shape}
        ></pc-avatar>
    `,
};
