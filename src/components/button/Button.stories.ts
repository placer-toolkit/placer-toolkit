import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "./button.ts";

const meta: Meta = {
    title: "Components/Button",
    component: "pc-button",
    argTypes: {
        appearance: {
            control: "select",
            options: [
                "default",
                "primary",
                "success",
                "warning",
                "danger",
                "text",
            ],
        },
        disabled: { control: "boolean" },
        download: { control: "text" },
        href: { control: "text" },
        label: { control: "text" },
        outlined: { control: "boolean" },
        pill: { control: "boolean" },
        prefix: { control: "text" },
        rel: { control: "text" },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
        suffix: { control: "text" },
        target: {
            control: "select",
            options: ["_blank", "_parent", "_self"],
        },
        type: {
            control: "select",
            options: ["button", "submit", "reset"],
        },
    },
    args: {
        appearance: "default",
        disabled: false,
        download: undefined,
        href: undefined,
        label: "Button",
        outlined: false,
        pill: false,
        prefix: undefined,
        rel: "noreferrer noopener",
        size: "medium",
        suffix: undefined,
        target: undefined,
        type: "button",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({
        appearance,
        disabled,
        download,
        href,
        label,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            download=${download}
            ?outlined=${outlined}
            ?pill=${pill}
            ?disabled=${disabled}
        >
            ${prefix ? html`<span slot="prefix">${prefix}</span>` : ""} ${label}
            ${suffix ? html`<span slot="suffix">${suffix}</span>` : ""}
        </pc-button>
    `,
};

export const Primary: Story = {
    args: {
        appearance: "primary",
        disabled: false,
        label: "Primary",
        outlined: false,
        pill: false,
        rel: "noreferrer noopener",
        size: "medium",
        type: "button",
    },

    render: ({
        appearance,
        disabled,
        download,
        href,
        label,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            download=${download}
            ?outlined=${outlined}
            ?pill=${pill}
            ?disabled=${disabled}
        >
            ${prefix ? html`<span slot="prefix">${prefix}</span>` : ""} ${label}
            ${suffix ? html`<span slot="suffix">${suffix}</span>` : ""}
        </pc-button>
    `,
};

export const Large: Story = {
    args: {
        appearance: "default",
        disabled: false,
        label: "Large",
        outlined: false,
        pill: false,
        rel: "noreferrer noopener",
        size: "large",
        type: "button",
    },

    render: ({
        appearance,
        disabled,
        download,
        href,
        label,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            download=${download}
            ?outlined=${outlined}
            ?pill=${pill}
            ?disabled=${disabled}
        >
            ${prefix ? html`<span slot="prefix">${prefix}</span>` : ""} ${label}
            ${suffix ? html`<span slot="suffix">${suffix}</span>` : ""}
        </pc-button>
    `,
};

export const Small: Story = {
    args: {
        appearance: "default",
        disabled: false,
        label: "Small",
        outlined: false,
        pill: false,
        rel: "noreferrer noopener",
        size: "small",
        type: "button",
    },

    render: ({
        appearance,
        disabled,
        download,
        href,
        label,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            download=${download}
            ?outlined=${outlined}
            ?pill=${pill}
            ?disabled=${disabled}
        >
            ${prefix ? html`<span slot="prefix">${prefix}</span>` : ""} ${label}
            ${suffix ? html`<span slot="suffix">${suffix}</span>` : ""}
        </pc-button>
    `,
};

export const Link: Story = {
    args: {
        appearance: "default",
        disabled: false,
        href: "https://example.com",
        label: "Link to example.com",
        outlined: false,
        pill: false,
        rel: "noreferrer noopener",
        size: "medium",
        type: "button",
        target: "_blank",
    },

    render: ({
        appearance,
        disabled,
        download,
        href,
        label,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            download=${download}
            ?outlined=${outlined}
            ?pill=${pill}
            ?disabled=${disabled}
        >
            ${prefix ? html`<span slot="prefix">${prefix}</span>` : ""} ${label}
            ${suffix ? html`<span slot="suffix">${suffix}</span>` : ""}
        </pc-button>
    `,
};

export const Disabled: Story = {
    args: {
        appearance: "default",
        disabled: true,
        label: "Disabled",
        outlined: false,
        pill: false,
        rel: "noreferrer noopener",
        size: "medium",
        type: "button",
    },

    render: ({
        appearance,
        disabled,
        download,
        href,
        label,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            download=${download}
            ?outlined=${outlined}
            ?pill=${pill}
            ?disabled=${disabled}
        >
            ${prefix ? html`<span slot="prefix">${prefix}</span>` : ""} ${label}
            ${suffix ? html`<span slot="suffix">${suffix}</span>` : ""}
        </pc-button>
    `,
};

export const Outlined: Story = {
    args: {
        appearance: "default",
        disabled: false,
        label: "Outlined",
        outlined: true,
        pill: false,
        rel: "noreferrer noopener",
        size: "medium",
        type: "button",
    },

    render: ({
        appearance,
        disabled,
        download,
        href,
        label,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            download=${download}
            ?outlined=${outlined}
            ?pill=${pill}
            ?disabled=${disabled}
        >
            ${prefix ? html`<span slot="prefix">${prefix}</span>` : ""} ${label}
            ${suffix ? html`<span slot="suffix">${suffix}</span>` : ""}
        </pc-button>
    `,
};

export const Pill: Story = {
    args: {
        appearance: "default",
        disabled: false,
        label: "Pill",
        outlined: false,
        pill: true,
        rel: "noreferrer noopener",
        size: "medium",
        type: "button",
    },

    render: ({
        appearance,
        disabled,
        download,
        href,
        label,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            download=${download}
            ?outlined=${outlined}
            ?pill=${pill}
            ?disabled=${disabled}
        >
            ${prefix ? html`<span slot="prefix">${prefix}</span>` : ""} ${label}
            ${suffix ? html`<span slot="suffix">${suffix}</span>` : ""}
        </pc-button>
    `,
};
