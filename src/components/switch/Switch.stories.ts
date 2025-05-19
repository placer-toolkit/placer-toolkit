import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./switch.js";

const meta: Meta = {
    title: "Components/Switch",
    component: "pc-switch",
    argTypes: {
        checked: { control: "boolean" },
        defaultChecked: { control: "boolean" },
        disabled: { control: "boolean" },
        form: { control: "text" },
        hint: { control: "text" },
        label: { control: "text" },
        name: { control: "text" },
        required: { control: "boolean" },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
        title: { control: "text" },
        value: { control: "text" },
    },
    args: {
        checked: false,
        defaultChecked: false,
        disabled: false,
        form: "",
        hint: "",
        label: "Switch",
        name: "",
        required: false,
        size: "medium",
        title: "",
        value: "",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({
        checked,
        defaultChecked,
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-switch
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            form=${form}
            hint=${hint}
            name=${name}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-switch>
    `,
};

export const Checked: Story = {
    args: {
        checked: true,
        defaultChecked: false,
        disabled: false,
        form: "",
        hint: "",
        label: "Checked",
        name: "",
        required: false,
        size: "medium",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-switch
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            form=${form}
            hint=${hint}
            name=${name}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-switch>
    `,
};

export const Large: Story = {
    args: {
        checked: false,
        defaultChecked: false,
        disabled: false,
        form: "",
        hint: "",
        label: "Large",
        name: "",
        required: false,
        size: "large",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-switch
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            form=${form}
            hint=${hint}
            name=${name}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-switch>
    `,
};

export const Small: Story = {
    args: {
        checked: false,
        defaultChecked: false,
        disabled: false,
        form: "",
        hint: "",
        label: "Small",
        name: "",
        required: false,
        size: "small",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-switch
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            form=${form}
            hint=${hint}
            name=${name}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-switch>
    `,
};

export const Disabled: Story = {
    args: {
        checked: false,
        defaultChecked: false,
        disabled: true,
        form: "",
        hint: "",
        label: "Disabled",
        name: "",
        required: false,
        size: "medium",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-switch
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            form=${form}
            hint=${hint}
            name=${name}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-switch>
    `,
};

export const Hint: Story = {
    args: {
        checked: false,
        defaultChecked: false,
        disabled: false,
        form: "",
        hint: "What does this switch do?",
        label: "Switch with hint",
        name: "",
        required: false,
        size: "medium",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-switch
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            form=${form}
            hint=${hint}
            name=${name}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-switch>
    `,
};

export const Required: Story = {
    args: {
        checked: false,
        defaultChecked: false,
        disabled: false,
        form: "",
        hint: "",
        label: "Required",
        name: "",
        required: true,
        size: "medium",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-switch
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            form=${form}
            hint=${hint}
            name=${name}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-switch>
    `,
};
