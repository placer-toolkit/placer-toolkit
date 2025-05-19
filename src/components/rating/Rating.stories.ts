import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./rating.js";

const meta: Meta = {
    title: "Components/Rating",
    component: "pc-rating",
    argTypes: {
        disabled: { control: "boolean" },
        label: { control: "text" },
        max: {
            control: { type: "number", min: 0 },
        },
        precision: {
            control: { type: "number", step: 0.01 },
        },
        readonly: { control: "boolean" },
        value: { control: "number" },
        getIcon: { control: "text" },

        // CSS styles
        iconSize: { control: "text" },
    },
    args: {
        disabled: false,
        label: "Rating",
        max: 5,
        precision: 1,
        readonly: false,
        value: 0,
        getIcon: `<pc-icon library="default" iconStyle="solid" name="star"></pc-icon>`,

        // CSS styles
        iconSize: "1.2rem",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({
        disabled,
        label,
        max,
        precision,
        readonly,
        value,
        getIcon,

        // CSS styles
        iconSize,
    }) => html`
        <pc-rating
            class="rating-default"
            ?disabled=${disabled}
            label=${label}
            max=${max}
            precision=${precision}
            ?readonly=${readonly}
            value=${value}
            style="--icon-size: ${iconSize}"
            .getIcon=${() => getIcon}
        ></pc-rating>
    `,
};

export const MaximumValue: Story = {
    args: {
        disabled: false,
        label: "Rating with three stars",
        max: 3,
        precision: 1,
        readonly: false,
        value: 0,

        // CSS styles
        iconSize: "1rem",
    },

    render: ({
        disabled,
        label,
        max,
        precision,
        readonly,
        value,
        getIcon,

        // CSS styles
        iconSize,
    }) => html`
        <pc-rating
            class="rating-max-value"
            ?disabled=${disabled}
            label=${label}
            max=${max}
            precision=${precision}
            ?readonly=${readonly}
            value=${value}
            style="--icon-size: ${iconSize}"
            .getIcon=${() => getIcon}
        ></pc-rating>
    `,
};

export const Precision: Story = {
    args: {
        disabled: false,
        label: "A rating that allows fractions of 0.5",
        max: 5,
        precision: 0.5,
        readonly: false,
        value: 0,

        // CSS styles
        iconSize: "1rem",
    },

    render: ({
        disabled,
        label,
        max,
        precision,
        readonly,
        value,
        getIcon,

        // CSS styles
        iconSize,
    }) => html`
        <pc-rating
            class="rating-precision"
            ?disabled=${disabled}
            label=${label}
            max=${max}
            precision=${precision}
            ?readonly=${readonly}
            value=${value}
            style="--icon-size: ${iconSize}"
            .getIcon=${() => getIcon}
        ></pc-rating>
    `,
};

export const IconSize: Story = {
    args: {
        disabled: false,
        label: "Rating with large stars",
        max: 5,
        precision: 1,
        readonly: false,
        value: 0,

        // CSS styles
        iconSize: "2rem",
    },

    render: ({
        disabled,
        label,
        max,
        precision,
        readonly,
        value,
        getIcon,

        // CSS styles
        iconSize,
    }) => html`
        <pc-rating
            class="rating-icon-size"
            ?disabled=${disabled}
            label=${label}
            max=${max}
            precision=${precision}
            ?readonly=${readonly}
            value=${value}
            style="--icon-size: ${iconSize}"
            .getIcon=${() => getIcon}
        ></pc-rating>
    `,
};

export const CustomIcon: Story = {
    args: {
        disabled: false,
        label: "Rating with hearts",
        max: 5,
        precision: 1,
        readonly: false,
        value: 0,
        getIcon:
            '<pc-icon library="default" iconStyle="solid" name="heart"></pc-icon>',
        iconSize: "1rem",
    },

    render: ({
        disabled,
        label,
        max,
        precision,
        readonly,
        value,
        getIcon,
        iconSize,
    }) => html`
        <pc-rating
            class="rating-default"
            ?disabled=${disabled}
            label=${label}
            max=${max}
            precision=${precision}
            ?readonly=${readonly}
            value=${value}
            style="--icon-size: ${iconSize}; --icon-color-active: #ff4136"
            .getIcon=${() => getIcon}
        ></pc-rating>
    `,
};
