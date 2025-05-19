import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./radio-group.js";
import "../radio/radio.js";
import "../radio-button/radio-button.js";

const meta: Meta = {
    title: "Components/Radio Group",
    component: "pc-radio-group",
    subcomponents: {
        "pc-radio": "pc-radio",
        "pc-radio-button": "pc-radio-button",
    },
    argTypes: {
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
        value: { control: "text" },
    },
    args: {
        disabled: false,
        form: "",
        hint: "",
        label: "Select an option",
        name: "options",
        required: false,
        size: "medium",
        value: "1",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        value,
    }) => html`
        <pc-radio-group
            form=${form}
            hint=${hint}
            label=${label}
            name=${name}
            ?required=${required}
            size=${size}
            value=${value}
        >
            <pc-radio value="1">Option 1</pc-radio>
            <pc-radio value="2" ?disabled=${disabled}>Option 2</pc-radio>
            <pc-radio value="3">Option 3</pc-radio>
        </pc-radio-group>
    `,
};

export const Large: Story = {
    args: {
        disabled: false,
        form: "",
        hint: "",
        label: "Select an option",
        name: "options",
        required: false,
        size: "large",
        value: "1",
    },

    render: ({
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        value,
    }) => html`
        <pc-radio-group
            form=${form}
            hint=${hint}
            label=${label}
            name=${name}
            ?required=${required}
            size=${size}
            value=${value}
        >
            <pc-radio value="1">Option 1</pc-radio>
            <pc-radio value="2" ?disabled=${disabled}>Option 2</pc-radio>
            <pc-radio value="3">Option 3</pc-radio>
        </pc-radio-group>
    `,
};

export const Small: Story = {
    args: {
        disabled: false,
        form: "",
        hint: "",
        label: "Select an option",
        name: "options",
        required: false,
        size: "small",
        value: "1",
    },

    render: ({
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        value,
    }) => html`
        <pc-radio-group
            form=${form}
            hint=${hint}
            label=${label}
            name=${name}
            ?required=${required}
            size=${size}
            value=${value}
        >
            <pc-radio value="1">Option 1</pc-radio>
            <pc-radio value="2" ?disabled=${disabled}>Option 2</pc-radio>
            <pc-radio value="3">Option 3</pc-radio>
        </pc-radio-group>
    `,
};

export const Hint: Story = {
    args: {
        disabled: false,
        form: "",
        hint: "Choose the most appropriate option.",
        label: "Select an option",
        name: "options",
        required: false,
        size: "medium",
        value: "1",
    },

    render: ({
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        value,
    }) => html`
        <pc-radio-group
            form=${form}
            hint=${hint}
            label=${label}
            name=${name}
            ?required=${required}
            size=${size}
            value=${value}
        >
            <pc-radio value="1">Option 1</pc-radio>
            <pc-radio value="2" ?disabled=${disabled}>Option 2</pc-radio>
            <pc-radio value="3">Option 3</pc-radio>
        </pc-radio-group>
    `,
};

export const RadioButtons: Story = {
    args: {
        disabled: false,
        form: "",
        hint: "Select an option that makes you proud.",
        label: "Select an option",
        name: "options",
        required: false,
        size: "medium",
        value: "1",
    },

    render: ({
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        value,
    }) => html`
        <pc-radio-group
            form=${form}
            hint=${hint}
            label=${label}
            name=${name}
            ?required=${required}
            size=${size}
            value=${value}
        >
            <pc-radio-button value="1">Option 1</pc-radio-button>
            <pc-radio-button value="2" ?disabled=${disabled}
                >Option 2</pc-radio-button
            >
            <pc-radio-button value="3">Option 3</pc-radio-button>
        </pc-radio-group>
    `,
};

export const Disabled: Story = {
    args: {
        disabled: true,
        form: "",
        hint: "",
        label: "Select an option",
        name: "options",
        required: false,
        size: "medium",
        value: "1",
    },

    render: ({
        disabled,
        form,
        hint,
        label,
        name,
        required,
        size,
        value,
    }) => html`
        <pc-radio-group
            form=${form}
            hint=${hint}
            label=${label}
            name=${name}
            ?required=${required}
            size=${size}
            value=${value}
        >
            <pc-radio value="1">Option 1</pc-radio>
            <pc-radio value="2" ?disabled=${disabled}>Option 2</pc-radio>
            <pc-radio value="3">Option 3</pc-radio>
        </pc-radio-group>
    `,
};

export const Required: Story = {
    args: {
        disabled: false,
        form: "",
        hint: "",
        label: "Select an option",
        name: "options",
        required: true,
        size: "medium",
        value: "1"
    },

    render: (
        {
            disabled,
            form,
            hint,
            label,
            name,
            required,
            size,
            value
        }
    ) => html`
        <pc-radio-group
            form=${form}
            hint=${hint}
            label=${label}
            name=${name}
            ?required=${required}
            size=${size}
            value=${value}
        >
            <pc-radio value="1">Option 1</pc-radio>
            <pc-radio value="2" ?disabled=${disabled}>Option 2</pc-radio>
            <pc-radio value="3">Option 3</pc-radio>
        </pc-radio-group>
    `
};
