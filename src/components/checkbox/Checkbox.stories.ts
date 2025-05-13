import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "./checkbox.ts";

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
        name: { control: "text" },
        pressed: { control: "boolean" },
    },
    args: {
        checked: false,
        defaultChecked: false,
        disabled: false,
        hint: undefined,
        indeterminate: false,
        invalid: false,
        name: undefined,
        pressed: false,
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
        name,
        pressed,
    }) => html`
        <pc-checkbox
            ?checked="${checked}"
            ?defaultChecked="${defaultChecked}"
            ?disabled="${disabled}"
            hint="${hint}"
            ?indeterminate="${indeterminate}"
            ?invalid="${invalid}"
            name="${name}"
            pressed="${pressed}"
        ></pc-checkbox>
    `,
};
