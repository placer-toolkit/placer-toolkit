import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./button.js";

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
        form: { control: "text" },
        formAction: { control: "text" },
        formEnctype: {
            control: "select",
            options: [
                "application/x-www-form-url-encoded",
                "multipart/form-data",
                "text/plain",
            ],
        },
        formMethod: {
            control: "select",
            options: ["GET", "POST"],
        },
        formNoValidate: { control: "boolean" },
        formTarget: {
            control: "select",
            options: ["_self", "_blank", "_parent", "_top"],
        },
        href: { control: "text" },
        label: { control: "text" },
        name: { control: "text" },
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
        value: { control: "text" },
    },
    args: {
        appearance: "default",
        disabled: false,
        download: undefined,
        form: undefined,
        formAction: undefined,
        formEnctype: undefined,
        formMethod: undefined,
        formNoValidate: undefined,
        formTarget: undefined,
        href: undefined,
        label: "Button",
        name: undefined,
        outlined: false,
        pill: false,
        prefix: undefined,
        rel: "noreferrer noopener",
        size: "medium",
        suffix: undefined,
        target: undefined,
        type: "button",
        value: undefined,
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({
        appearance,
        disabled,
        download,
        form,
        formAction,
        formEnctype,
        formMethod,
        formNoValidate,
        formTarget,
        href,
        label,
        name,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
        value,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            value=${value}
            download=${download}
            form=${form}
            formAction=${formAction}
            formEnctype=${formEnctype}
            formMethod=${formMethod}
            ?formNoValidate=${formNoValidate}
            formTarget=${formTarget}
            name=${name}
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
        form: undefined,
        formAction: undefined,
        formEnctype: undefined,
        formMethod: undefined,
        formNoValidate: undefined,
        formTarget: undefined,
        name: undefined,
        value: undefined,
    },

    render: ({
        appearance,
        disabled,
        download,
        form,
        formAction,
        formEnctype,
        formMethod,
        formNoValidate,
        formTarget,
        href,
        label,
        name,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
        value,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            value=${value}
            download=${download}
            form=${form}
            formAction=${formAction}
            formEnctype=${formEnctype}
            formMethod=${formMethod}
            ?formNoValidate=${formNoValidate}
            formTarget=${formTarget}
            name=${name}
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
        form: undefined,
        formAction: undefined,
        formEnctype: undefined,
        formMethod: undefined,
        formNoValidate: undefined,
        formTarget: undefined,
        name: undefined,
        value: undefined,
    },

    render: ({
        appearance,
        disabled,
        download,
        form,
        formAction,
        formEnctype,
        formMethod,
        formNoValidate,
        formTarget,
        href,
        label,
        name,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
        value,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            value=${value}
            download=${download}
            form=${form}
            formAction=${formAction}
            formEnctype=${formEnctype}
            formMethod=${formMethod}
            ?formNoValidate=${formNoValidate}
            formTarget=${formTarget}
            name=${name}
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
        form: undefined,
        formAction: undefined,
        formEnctype: undefined,
        formMethod: undefined,
        formNoValidate: undefined,
        formTarget: undefined,
        name: undefined,
        value: undefined,
    },

    render: ({
        appearance,
        disabled,
        download,
        form,
        formAction,
        formEnctype,
        formMethod,
        formNoValidate,
        formTarget,
        href,
        label,
        name,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
        value,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            value=${value}
            download=${download}
            form=${form}
            formAction=${formAction}
            formEnctype=${formEnctype}
            formMethod=${formMethod}
            ?formNoValidate=${formNoValidate}
            formTarget=${formTarget}
            name=${name}
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
        form: undefined,
        formAction: undefined,
        formEnctype: undefined,
        formMethod: undefined,
        formNoValidate: undefined,
        formTarget: undefined,
        name: undefined,
        value: undefined,
    },

    render: ({
        appearance,
        disabled,
        download,
        form,
        formAction,
        formEnctype,
        formMethod,
        formNoValidate,
        formTarget,
        href,
        label,
        name,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
        value,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            value=${value}
            download=${download}
            form=${form}
            formAction=${formAction}
            formEnctype=${formEnctype}
            formMethod=${formMethod}
            ?formNoValidate=${formNoValidate}
            formTarget=${formTarget}
            name=${name}
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
        form: undefined,
        formAction: undefined,
        formEnctype: undefined,
        formMethod: undefined,
        formNoValidate: undefined,
        formTarget: undefined,
        name: undefined,
        value: undefined,
    },

    render: ({
        appearance,
        disabled,
        download,
        form,
        formAction,
        formEnctype,
        formMethod,
        formNoValidate,
        formTarget,
        href,
        label,
        name,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
        value,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            value=${value}
            download=${download}
            form=${form}
            formAction=${formAction}
            formEnctype=${formEnctype}
            formMethod=${formMethod}
            ?formNoValidate=${formNoValidate}
            formTarget=${formTarget}
            name=${name}
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
        form: undefined,
        formAction: undefined,
        formEnctype: undefined,
        formMethod: undefined,
        formNoValidate: undefined,
        formTarget: undefined,
        name: undefined,
        value: undefined,
    },

    render: ({
        appearance,
        disabled,
        download,
        form,
        formAction,
        formEnctype,
        formMethod,
        formNoValidate,
        formTarget,
        href,
        label,
        name,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
        value,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            value=${value}
            download=${download}
            form=${form}
            formAction=${formAction}
            formEnctype=${formEnctype}
            formMethod=${formMethod}
            ?formNoValidate=${formNoValidate}
            formTarget=${formTarget}
            name=${name}
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
        form: undefined,
        formAction: undefined,
        formEnctype: undefined,
        formMethod: undefined,
        formNoValidate: undefined,
        formTarget: undefined,
        name: undefined,
        value: undefined,
    },

    render: ({
        appearance,
        disabled,
        download,
        form,
        formAction,
        formEnctype,
        formMethod,
        formNoValidate,
        formTarget,
        href,
        label,
        name,
        outlined,
        pill,
        prefix,
        rel,
        size,
        suffix,
        target,
        type,
        value,
    }) => html`
        <pc-button
            type=${type}
            appearance=${appearance}
            size=${size}
            href=${href}
            target=${target}
            rel=${rel}
            value=${value}
            download=${download}
            form=${form}
            formAction=${formAction}
            formEnctype=${formEnctype}
            formMethod=${formMethod}
            ?formNoValidate=${formNoValidate}
            formTarget=${formTarget}
            name=${name}
            ?outlined=${outlined}
            ?pill=${pill}
            ?disabled=${disabled}
        >
            ${prefix ? html`<span slot="prefix">${prefix}</span>` : ""} ${label}
            ${suffix ? html`<span slot="suffix">${suffix}</span>` : ""}
        </pc-button>
    `,
};
