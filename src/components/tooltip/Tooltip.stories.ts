import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./tooltip.js";

import "../avatar/avatar.js";
import "../button/button.js";
import "../icon/icon.js";

const meta: Meta = {
    title: "Components/Tooltip",
    component: "pc-tooltip",
    argTypes: {
        content: {
            control: "text",
            description:
                "This contains the tooltip’s content. If you need to display HTML in it, use the `content` slot instead.",
        },
        disabled: {
            control: "boolean",
            description: "This disables the tooltip.",
        },
        distance: {
            control: "number",
            description:
                "Controls the distance in pixels from which to offset the tooltip away from its target.",
        },
        hoist: {
            control: "boolean",
            description:
                "This prevents the tooltip from being clipped when the component is placed inside a container with overflow set to auto, hidden or scroll. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.",
        },
        open: {
            control: "boolean",
            description:
                "Indicates whether or not the tooltip is open. You can use this with the show and hide methods.",
        },
        placement: {
            control: "select",
            options: [
                "top",
                "top-start",
                "top-end",
                "right",
                "right-start",
                "right-end",
                "bottom",
                "bottom-start",
                "bottom-end",
                "left",
                "left-start",
                "left-end",
            ],
            description: "Control the placement of the tooltip.",
        },
        skidding: {
            control: "number",
            description:
                "Controls the distance in pixels from which to offset the tooltip along its target.",
        },
        trigger: { control: "text" },
    },
    args: {
        content: "This is a tooltip",
        disabled: false,
        distance: 8,
        hoist: false,
        open: false,
        placement: "top",
        skidding: 0,
        trigger: "hover focus",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({
        content,
        disabled,
        distance,
        hoist,
        open,
        placement,
        skidding,
        trigger,
    }) => html`
        <pc-tooltip
            content=${content}
            ?disabled=${disabled}
            distance=${distance}
            ?hoist=${hoist}
            ?open=${open}
            placement=${placement}
            skidding=${skidding}
            trigger=${trigger}
        >
            <pc-button>Hover me</pc-button>
        </pc-tooltip>
    `,
};

export const Placement: Story = {
    render: () => html`
        <div class="tooltip-placement-example">
            <div class="tooltip-placement-example-row">
                <pc-tooltip content="top-start" placement="top-start">
                    <pc-button></pc-button>
                </pc-tooltip>

                <pc-tooltip content="top" placement="top">
                    <pc-button>
                        <pc-icon
                            library="default"
                            icon-style="solid"
                            name="arrow-up"
                        ></pc-icon>
                    </pc-button>
                </pc-tooltip>

                <pc-tooltip content="top-end" placement="top-end">
                    <pc-button></pc-button>
                </pc-tooltip>
            </div>

            <div class="tooltip-placement-example-row">
                <pc-tooltip content="left-start" placement="left-start">
                    <pc-button></pc-button>
                </pc-tooltip>

                <pc-tooltip content="right-start" placement="right-start">
                    <pc-button></pc-button>
                </pc-tooltip>
            </div>

            <div class="tooltip-placement-example-row">
                <pc-tooltip content="left" placement="left">
                    <pc-button>
                        <pc-icon
                            library="default"
                            icon-style="solid"
                            name="arrow-left"
                        ></pc-icon>
                    </pc-button>
                </pc-tooltip>

                <pc-tooltip content="right" placement="right">
                    <pc-button>
                        <pc-icon
                            library="default"
                            icon-style="solid"
                            name="arrow-right"
                        ></pc-icon>
                    </pc-button>
                </pc-tooltip>
            </div>

            <div class="tooltip-placement-example-row">
                <pc-tooltip content="left-end" placement="left-end">
                    <pc-button></pc-button>
                </pc-tooltip>

                <pc-tooltip content="right-end" placement="right-end">
                    <pc-button></pc-button>
                </pc-tooltip>
            </div>

            <div class="tooltip-placement-example-row">
                <pc-tooltip content="bottom-start" placement="bottom-start">
                    <pc-button></pc-button>
                </pc-tooltip>

                <pc-tooltip content="bottom" placement="bottom">
                    <pc-button>
                        <pc-icon
                            library="default"
                            icon-style="solid"
                            name="arrow-down"
                        ></pc-icon>
                    </pc-button>
                </pc-tooltip>

                <pc-tooltip content="bottom-end" placement="bottom-end">
                    <pc-button></pc-button>
                </pc-tooltip>
            </div>
        </div>

        <style>
            .tooltip-placement-example {
                width: 300px;
                margin: 1.5rem 1rem 1rem 4.5rem;
            }

            .tooltip-placement-example-row::after {
                content: "";
                display: table;
                clear: both;
            }

            .tooltip-placement-example pc-button {
                float: left;
                width: 2.5rem;
                height: 2.5rem;
                margin-right: 0.25rem;
            }

            .tooltip-placement-example-row:nth-child(1)
                pc-tooltip:first-child
                pc-button,
            .tooltip-placement-example-row:nth-child(5)
                pc-tooltip:first-child
                pc-button {
                margin-left: calc(40px + 0.25rem);
            }

            .tooltip-placement-example-row:nth-child(2)
                pc-tooltip:nth-child(2)
                pc-button,
            .tooltip-placement-example-row:nth-child(3)
                pc-tooltip:nth-child(2)
                pc-button,
            .tooltip-placement-example-row:nth-child(4)
                pc-tooltip:nth-child(2)
                pc-button {
                margin-left: calc((40px * 3) + (0.25rem * 3));
            }
        </style>
    `,
};

export const ClickTrigger: Story = {
    args: {
        content: "Click again to dismiss",
        disabled: false,
        distance: 8,
        hoist: false,
        open: false,
        placement: "top",
        skidding: 0,
        trigger: "click",
    },

    render: ({
        content,
        disabled,
        distance,
        hoist,
        open,
        placement,
        skidding,
        trigger,
    }) => html`
        <pc-tooltip
            content=${content}
            ?disabled=${disabled}
            distance=${distance}
            ?hoist=${hoist}
            ?open=${open}
            placement=${placement}
            skidding=${skidding}
            trigger=${trigger}
        >
            <pc-button>Hover me</pc-button>
        </pc-tooltip>
    `,
};

export const ManualTrigger: Story = {
    args: {
        content: "This is an avatar",
        disabled: false,
        distance: 8,
        hoist: false,
        open: false,
        placement: "top",
        skidding: 0,
        trigger: "manual",
    },

    render: ({
        content,
        disabled,
        distance,
        hoist,
        open,
        placement,
        skidding,
        trigger,
    }) => html`
        <pc-button style="margin-right: 4rem">Click me</pc-button>

        <pc-tooltip
            class="manual-tooltip"
            content=${content}
            ?disabled=${disabled}
            distance=${distance}
            ?hoist=${hoist}
            ?open=${open}
            placement=${placement}
            skidding=${skidding}
            trigger=${trigger}
        >
            <pc-avatar label="User avatar"></pc-avatar>
        </pc-tooltip>

        <script>
            const tooltip = document.querySelector(".manual-tooltip");
            const toggle = tooltip.previousElementSibling;

            toggle.addEventListener(
                "click",
                () => (tooltip.open = !tooltip.open),
            );
        </script>
    `,
};

export const NoArrow: Story = {
    render: ({
        content,
        disabled,
        distance,
        hoist,
        open,
        placement,
        skidding,
        trigger,
    }) => html`
        <pc-tooltip
            content=${content}
            ?disabled=${disabled}
            distance=${distance}
            ?hoist=${hoist}
            ?open=${open}
            placement=${placement}
            skidding=${skidding}
            trigger=${trigger}
            style="--pc-tooltip-arrow-size: 0"
        >
            <pc-button>No arrow</pc-button>
        </pc-tooltip>
    `,
};

export const WithHTML: Story = {
    args: {
        content:
            "I’m not <strong>just</strong> a tooltip, I’m a <em>tooltip</em> with HTML!",
        disabled: false,
        distance: 8,
        hoist: false,
        open: false,
        placement: "top",
        skidding: 0,
        trigger: "hover focus",
    },

    render: ({
        content,
        disabled,
        distance,
        hoist,
        open,
        placement,
        skidding,
        trigger,
    }) => html`
        <pc-tooltip
            ?disabled=${disabled}
            distance=${distance}
            ?hoist=${hoist}
            ?open=${open}
            placement=${placement}
            skidding=${skidding}
            trigger=${trigger}
        >
            <div slot="content">${unsafeHTML(content)}</div>

            <pc-button>Hover me</pc-button>
        </pc-tooltip>
    `,
};

export const MaximumWidth: Story = {
    args: {
        content: "This tooltip will wrap only after 80 pixels.",
        disabled: false,
        distance: 8,
        hoist: false,
        open: false,
        placement: "top",
        skidding: 0,
        trigger: "hover focus",
    },

    render: ({
        content,
        disabled,
        distance,
        hoist,
        open,
        placement,
        skidding,
        trigger,
    }) => html`
        <pc-tooltip
            content=${content}
            ?disabled=${disabled}
            distance=${distance}
            ?hoist=${hoist}
            ?open=${open}
            placement=${placement}
            skidding=${skidding}
            trigger=${trigger}
            style="--max-width: 80px"
        >
            <pc-button>Hover me</pc-button>
        </pc-tooltip>
    `,
};

export const Hoist: Story = {
    render: () => html`
        <div class="tooltip-hoist">
            <pc-tooltip content="This is a tooltip">
                <pc-button>No hoist</pc-button>
            </pc-tooltip>
            <pc-tooltip content="This is a tooltip" hoist="">
                <pc-button>Hoist</pc-button>
            </pc-tooltip>
        </div>

        <style>
            .tooltip-hoist {
                position: relative;
                padding: var(--pc-spacing-m);
                border: 2px solid var(--pc-panel-border-color);
                border-radius: var(--pc-border-radius-m);
                overflow: hidden;
            }
        </style>
    `,
};
