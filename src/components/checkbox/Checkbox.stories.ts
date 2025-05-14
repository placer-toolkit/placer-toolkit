import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "./checkbox.js";

const meta: Meta = {
    title: "Components/Checkbox",
    component: "pc-checkbox",
    argTypes: {
        checked: { control: "boolean" },
        defaultChecked: { control: "boolean" },
        disabled: { control: "boolean" },
        hint: { control: "text" },
        indeterminate: { control: "boolean" },
        invalid: { control: "boolean" },
        label: { control: "text" },
        name: { control: "text" },
        pressed: { control: "boolean" },
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
        hint: "",
        indeterminate: false,
        invalid: false,
        label: "Checkbox",
        name: "",
        pressed: false,
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
        hint,
        indeterminate,
        invalid,
        label,
        name,
        pressed,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-checkbox
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            hint=${hint}
            ?indeterminate=${indeterminate}
            ?invalid=${invalid}
            name=${name}
            ?pressed=${pressed}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-checkbox>
    `,
};

export const Checked: Story = {
    args: {
        checked: true,
        defaultChecked: false,
        disabled: false,
        hint: "",
        indeterminate: false,
        invalid: false,
        label: "Checked",
        name: "",
        pressed: false,
        required: false,
        size: "medium",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        hint,
        indeterminate,
        invalid,
        label,
        name,
        pressed,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-checkbox
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            hint=${hint}
            ?indeterminate=${indeterminate}
            ?invalid=${invalid}
            name=${name}
            ?pressed=${pressed}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-checkbox>
    `,
};

export const Indeterminate: Story = {
    args: {
        checked: false,
        defaultChecked: false,
        disabled: false,
        hint: "",
        indeterminate: true,
        invalid: false,
        label: "Indeterminate",
        name: "",
        pressed: false,
        required: false,
        size: "medium",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        hint,
        indeterminate,
        invalid,
        label,
        name,
        pressed,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-checkbox
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            hint=${hint}
            ?indeterminate=${indeterminate}
            ?invalid=${invalid}
            name=${name}
            ?pressed=${pressed}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-checkbox>
    `,
};

export const Hint: Story = {
    args: {
        checked: false,
        defaultChecked: false,
        disabled: false,
        hint: "What does this checkbox do?",
        indeterminate: false,
        invalid: false,
        label: "Checkbox with hint",
        name: "",
        pressed: false,
        required: false,
        size: "medium",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        hint,
        indeterminate,
        invalid,
        label,
        name,
        pressed,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-checkbox
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            hint=${hint}
            ?indeterminate=${indeterminate}
            ?invalid=${invalid}
            name=${name}
            ?pressed=${pressed}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-checkbox>
    `,
};

export const Disabled: Story = {
    args: {
        checked: false,
        defaultChecked: false,
        disabled: true,
        hint: "",
        indeterminate: false,
        invalid: false,
        label: "Disabled",
        name: "",
        pressed: false,
        required: false,
        size: "medium",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        hint,
        indeterminate,
        invalid,
        label,
        name,
        pressed,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-checkbox
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            hint=${hint}
            ?indeterminate=${indeterminate}
            ?invalid=${invalid}
            name=${name}
            ?pressed=${pressed}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-checkbox>
    `,
};

export const Large: Story = {
    args: {
        checked: false,
        defaultChecked: false,
        disabled: false,
        hint: "",
        indeterminate: false,
        invalid: false,
        label: "Large",
        name: "",
        pressed: false,
        required: false,
        size: "large",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        hint,
        indeterminate,
        invalid,
        label,
        name,
        pressed,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-checkbox
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            hint=${hint}
            ?indeterminate=${indeterminate}
            ?invalid=${invalid}
            name=${name}
            ?pressed=${pressed}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-checkbox>
    `,
};

export const Small: Story = {
    args: {
        checked: false,
        defaultChecked: false,
        disabled: false,
        hint: "",
        indeterminate: false,
        invalid: false,
        label: "Small",
        name: "",
        pressed: false,
        required: false,
        size: "small",
        title: "",
        value: "",
    },

    render: ({
        checked,
        defaultChecked,
        disabled,
        hint,
        indeterminate,
        invalid,
        label,
        name,
        pressed,
        required,
        size,
        title,
        value,
    }) => html`
        <pc-checkbox
            ?checked=${checked}
            ?defaultChecked=${defaultChecked}
            ?disabled=${disabled}
            hint=${hint}
            ?indeterminate=${indeterminate}
            ?invalid=${invalid}
            name=${name}
            ?pressed=${pressed}
            ?required=${required}
            size=${size}
            title=${title}
            value=${value}
        >
            ${label}
        </pc-checkbox>
    `,
};
