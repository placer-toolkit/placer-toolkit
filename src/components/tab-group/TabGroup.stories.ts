import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./tab-group.js";
import "../tab/tab.js";
import "../tab-panel/tab-panel.js";

const meta: Meta = {
    title: "Components/Tab Group",
    component: "pc-tab-group",
    subcomponents: {
        "pc-tab": "pc-tab",
        "pc-tab-panel": "pc-tab-panel",
    },
    argTypes: {
        activation: {
            control: "select",
            options: ["auto", "manual"],
        },
        fixedScrollControls: { control: "boolean" },
        noScrollControls: { control: "boolean" },
        placement: {
            control: "select",
            options: ["top", "bottom", "start", "end"],
        },
    },
    args: {
        activation: "auto",
        fixedScrollControls: false,
        noScrollControls: false,
        placement: "top",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({
        activation,
        fixedScrollControls,
        noScrollControls,
        placement,
    }) => html`
        <pc-tab-group
            activation=${activation}
            ?fixed-scroll-controls=${fixedScrollControls}
            ?no-scroll-controls=${noScrollControls}
            placement=${placement}
        >
            <pc-tab slot="navigation" panel="general">General</pc-tab>
            <pc-tab slot="navigation" panel="custom">Custom</pc-tab>
            <pc-tab slot="navigation" panel="advanced">Advanced</pc-tab>
            <pc-tab slot="navigation" panel="disabled" disabled="">
                Disabled
            </pc-tab>

            <pc-tab-panel name="general">
                This is the general tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="custom">
                This is the custom tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="advanced">
                This is the advanced tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="disabled">
                This is a disabled tab panel.
            </pc-tab-panel>
        </pc-tab-group>
    `,
};

export const Bottom: Story = {
    args: {
        activation: "auto",
        fixedScrollControls: false,
        noScrollControls: false,
        placement: "bottom",
    },

    render: ({
        activation,
        fixedScrollControls,
        noScrollControls,
        placement,
    }) => html`
        <pc-tab-group
            activation=${activation}
            ?fixed-scroll-controls=${fixedScrollControls}
            ?no-scroll-controls=${noScrollControls}
            placement=${placement}
        >
            <pc-tab slot="navigation" panel="general">General</pc-tab>
            <pc-tab slot="navigation" panel="custom">Custom</pc-tab>
            <pc-tab slot="navigation" panel="advanced">Advanced</pc-tab>
            <pc-tab slot="navigation" panel="disabled" disabled="">
                Disabled
            </pc-tab>

            <pc-tab-panel name="general">
                This is the general tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="custom">
                This is the custom tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="advanced">
                This is the advanced tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="disabled">
                This is a disabled tab panel.
            </pc-tab-panel>
        </pc-tab-group>
    `,
};

export const Start: Story = {
    args: {
        activation: "auto",
        fixedScrollControls: false,
        noScrollControls: false,
        placement: "start",
    },

    render: ({
        activation,
        fixedScrollControls,
        noScrollControls,
        placement,
    }) => html`
        <pc-tab-group
            activation=${activation}
            ?fixed-scroll-controls=${fixedScrollControls}
            ?no-scroll-controls=${noScrollControls}
            placement=${placement}
        >
            <pc-tab slot="navigation" panel="general">General</pc-tab>
            <pc-tab slot="navigation" panel="custom">Custom</pc-tab>
            <pc-tab slot="navigation" panel="advanced">Advanced</pc-tab>
            <pc-tab slot="navigation" panel="disabled" disabled="">
                Disabled
            </pc-tab>

            <pc-tab-panel name="general">
                This is the general tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="custom">
                This is the custom tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="advanced">
                This is the advanced tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="disabled">
                This is a disabled tab panel.
            </pc-tab-panel>
        </pc-tab-group>
    `,
};

export const End: Story = {
    args: {
        activation: "auto",
        fixedScrollControls: false,
        noScrollControls: false,
        placement: "end",
    },

    render: ({
        activation,
        fixedScrollControls,
        noScrollControls,
        placement,
    }) => html`
        <pc-tab-group
            activation=${activation}
            ?fixed-scroll-controls=${fixedScrollControls}
            ?no-scroll-controls=${noScrollControls}
            placement=${placement}
        >
            <pc-tab slot="navigation" panel="general">General</pc-tab>
            <pc-tab slot="navigation" panel="custom">Custom</pc-tab>
            <pc-tab slot="navigation" panel="advanced">Advanced</pc-tab>
            <pc-tab slot="navigation" panel="disabled" disabled="">
                Disabled
            </pc-tab>

            <pc-tab-panel name="general">
                This is the general tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="custom">
                This is the custom tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="advanced">
                This is the advanced tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="disabled">
                This is a disabled tab panel.
            </pc-tab-panel>
        </pc-tab-group>
    `,
};

export const Closable: Story = {
    args: {
        activation: "auto",
        fixedScrollControls: false,
        noScrollControls: false,
        placement: "top",
    },

    render: ({
        activation,
        fixedScrollControls,
        noScrollControls,
        placement,
    }) => html`
        <pc-tab-group
            class="tabs-closable"
            activation=${activation}
            ?fixed-scroll-controls=${fixedScrollControls}
            ?no-scroll-controls=${noScrollControls}
            placement=${placement}
        >
            <pc-tab slot="navigation" panel="general">General</pc-tab>
            <pc-tab slot="navigation" panel="closable-1" closable>
                Closable 1
            </pc-tab>
            <pc-tab slot="navigation" panel="closable-2" closable>
                Closable 2
            </pc-tab>
            <pc-tab slot="navigation" panel="closable-3" closable>
                Closable 3
            </pc-tab>

            <pc-tab-panel name="general">
                This is the general tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="closable-1">
                This is the first closable tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="closable-2">
                This is the second closable tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="closable-3">
                This is a third closable tab panel.
            </pc-tab-panel>
        </pc-tab-group>

        <script>
            const tabGroup = document.querySelector(".tabs-closable");

            tabGroup.addEventListener("pc-close", async (event) => {
                const tab = event.target;
                const panel = tabGroup.querySelector(
                    'pc-tab-panel[name="\${tab.panel}"]',
                );

                if (tab.active) {
                    tabGroup.show(tab.previousElementSibling.panel);
                }

                tab.remove();
                panel.remove();
            });
        </script>
    `,
};

export const Scrollable: Story = {
    args: {
        activation: "auto",
        fixedScrollControls: false,
        noScrollControls: false,
        placement: "top",
    },

    render: ({
        activation,
        fixedScrollControls,
        noScrollControls,
        placement,
    }) => html`
        <pc-tab-group
            activation=${activation}
            ?fixed-scroll-controls=${fixedScrollControls}
            ?no-scroll-controls=${noScrollControls}
            placement=${placement}
        >
            <pc-tab slot="navigation" panel="tab-1">Tab 1</pc-tab>
            <pc-tab slot="navigation" panel="tab-2">Tab 2</pc-tab>
            <pc-tab slot="navigation" panel="tab-3">Tab 3</pc-tab>
            <pc-tab slot="navigation" panel="tab-4">Tab 4</pc-tab>
            <pc-tab slot="navigation" panel="tab-5">Tab 5</pc-tab>
            <pc-tab slot="navigation" panel="tab-6">Tab 6</pc-tab>
            <pc-tab slot="navigation" panel="tab-7">Tab 7</pc-tab>
            <pc-tab slot="navigation" panel="tab-8">Tab 8</pc-tab>
            <pc-tab slot="navigation" panel="tab-9">Tab 9</pc-tab>
            <pc-tab slot="navigation" panel="tab-10">Tab 10</pc-tab>
            <pc-tab slot="navigation" panel="tab-11">Tab 11</pc-tab>
            <pc-tab slot="navigation" panel="tab-12">Tab 12</pc-tab>
            <pc-tab slot="navigation" panel="tab-13">Tab 13</pc-tab>
            <pc-tab slot="navigation" panel="tab-14">Tab 14</pc-tab>
            <pc-tab slot="navigation" panel="tab-15">Tab 15</pc-tab>
            <pc-tab slot="navigation" panel="tab-16">Tab 16</pc-tab>
            <pc-tab slot="navigation" panel="tab-17">Tab 17</pc-tab>
            <pc-tab slot="navigation" panel="tab-18">Tab 18</pc-tab>
            <pc-tab slot="navigation" panel="tab-19">Tab 19</pc-tab>
            <pc-tab slot="navigation" panel="tab-20">Tab 20</pc-tab>

            <pc-tab-panel name="tab-1">Tab panel 1</pc-tab-panel>
            <pc-tab-panel name="tab-2">Tab panel 2</pc-tab-panel>
            <pc-tab-panel name="tab-3">Tab panel 3</pc-tab-panel>
            <pc-tab-panel name="tab-4">Tab panel 4</pc-tab-panel>
            <pc-tab-panel name="tab-5">Tab panel 5</pc-tab-panel>
            <pc-tab-panel name="tab-6">Tab panel 6</pc-tab-panel>
            <pc-tab-panel name="tab-7">Tab panel 7</pc-tab-panel>
            <pc-tab-panel name="tab-8">Tab panel 8</pc-tab-panel>
            <pc-tab-panel name="tab-9">Tab panel 9</pc-tab-panel>
            <pc-tab-panel name="tab-10">Tab panel 10</pc-tab-panel>
            <pc-tab-panel name="tab-11">Tab panel 11</pc-tab-panel>
            <pc-tab-panel name="tab-12">Tab panel 12</pc-tab-panel>
            <pc-tab-panel name="tab-13">Tab panel 13</pc-tab-panel>
            <pc-tab-panel name="tab-14">Tab panel 14</pc-tab-panel>
            <pc-tab-panel name="tab-15">Tab panel 15</pc-tab-panel>
            <pc-tab-panel name="tab-16">Tab panel 16</pc-tab-panel>
            <pc-tab-panel name="tab-17">Tab panel 17</pc-tab-panel>
            <pc-tab-panel name="tab-18">Tab panel 18</pc-tab-panel>
            <pc-tab-panel name="tab-19">Tab panel 19</pc-tab-panel>
            <pc-tab-panel name="tab-20">Tab panel 20</pc-tab-panel>
        </pc-tab-group>
    `,
};

export const FixedScrollControls: Story = {
    args: {
        activation: "auto",
        fixedScrollControls: true,
        noScrollControls: false,
        placement: "top",
    },

    render: ({
        activation,
        fixedScrollControls,
        noScrollControls,
        placement,
    }) => html`
        <pc-tab-group
            activation=${activation}
            ?fixed-scroll-controls=${fixedScrollControls}
            ?no-scroll-controls=${noScrollControls}
            placement=${placement}
        >
            <pc-tab slot="navigation" panel="tab-1">Tab 1</pc-tab>
            <pc-tab slot="navigation" panel="tab-2">Tab 2</pc-tab>
            <pc-tab slot="navigation" panel="tab-3">Tab 3</pc-tab>
            <pc-tab slot="navigation" panel="tab-4">Tab 4</pc-tab>
            <pc-tab slot="navigation" panel="tab-5">Tab 5</pc-tab>
            <pc-tab slot="navigation" panel="tab-6">Tab 6</pc-tab>
            <pc-tab slot="navigation" panel="tab-7">Tab 7</pc-tab>
            <pc-tab slot="navigation" panel="tab-8">Tab 8</pc-tab>
            <pc-tab slot="navigation" panel="tab-9">Tab 9</pc-tab>
            <pc-tab slot="navigation" panel="tab-10">Tab 10</pc-tab>
            <pc-tab slot="navigation" panel="tab-11">Tab 11</pc-tab>
            <pc-tab slot="navigation" panel="tab-12">Tab 12</pc-tab>
            <pc-tab slot="navigation" panel="tab-13">Tab 13</pc-tab>
            <pc-tab slot="navigation" panel="tab-14">Tab 14</pc-tab>
            <pc-tab slot="navigation" panel="tab-15">Tab 15</pc-tab>
            <pc-tab slot="navigation" panel="tab-16">Tab 16</pc-tab>
            <pc-tab slot="navigation" panel="tab-17">Tab 17</pc-tab>
            <pc-tab slot="navigation" panel="tab-18">Tab 18</pc-tab>
            <pc-tab slot="navigation" panel="tab-19">Tab 19</pc-tab>
            <pc-tab slot="navigation" panel="tab-20">Tab 20</pc-tab>

            <pc-tab-panel name="tab-1">Tab panel 1</pc-tab-panel>
            <pc-tab-panel name="tab-2">Tab panel 2</pc-tab-panel>
            <pc-tab-panel name="tab-3">Tab panel 3</pc-tab-panel>
            <pc-tab-panel name="tab-4">Tab panel 4</pc-tab-panel>
            <pc-tab-panel name="tab-5">Tab panel 5</pc-tab-panel>
            <pc-tab-panel name="tab-6">Tab panel 6</pc-tab-panel>
            <pc-tab-panel name="tab-7">Tab panel 7</pc-tab-panel>
            <pc-tab-panel name="tab-8">Tab panel 8</pc-tab-panel>
            <pc-tab-panel name="tab-9">Tab panel 9</pc-tab-panel>
            <pc-tab-panel name="tab-10">Tab panel 10</pc-tab-panel>
            <pc-tab-panel name="tab-11">Tab panel 11</pc-tab-panel>
            <pc-tab-panel name="tab-12">Tab panel 12</pc-tab-panel>
            <pc-tab-panel name="tab-13">Tab panel 13</pc-tab-panel>
            <pc-tab-panel name="tab-14">Tab panel 14</pc-tab-panel>
            <pc-tab-panel name="tab-15">Tab panel 15</pc-tab-panel>
            <pc-tab-panel name="tab-16">Tab panel 16</pc-tab-panel>
            <pc-tab-panel name="tab-17">Tab panel 17</pc-tab-panel>
            <pc-tab-panel name="tab-18">Tab panel 18</pc-tab-panel>
            <pc-tab-panel name="tab-19">Tab panel 19</pc-tab-panel>
            <pc-tab-panel name="tab-20">Tab panel 20</pc-tab-panel>
        </pc-tab-group>
    `,
};

export const ManualActivation: Story = {
    args: {
        activation: "manual",
        fixedScrollControls: false,
        noScrollControls: false,
        placement: "top",
    },

    render: ({
        activation,
        fixedScrollControls,
        noScrollControls,
        placement,
    }) => html`
        <pc-tab-group
            activation=${activation}
            ?fixed-scroll-controls=${fixedScrollControls}
            ?no-scroll-controls=${noScrollControls}
            placement=${placement}
        >
            <pc-tab slot="navigation" panel="general">General</pc-tab>
            <pc-tab slot="navigation" panel="custom">Custom</pc-tab>
            <pc-tab slot="navigation" panel="advanced">Advanced</pc-tab>
            <pc-tab slot="navigation" panel="disabled" disabled="">
                Disabled
            </pc-tab>

            <pc-tab-panel name="general">
                This is the general tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="custom">
                This is the custom tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="advanced">
                This is the advanced tab panel.
            </pc-tab-panel>
            <pc-tab-panel name="disabled">
                This is a disabled tab panel.
            </pc-tab-panel>
        </pc-tab-group>
    `,
};
