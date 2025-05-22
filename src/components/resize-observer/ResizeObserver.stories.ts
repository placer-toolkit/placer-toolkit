import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./resize-observer.js";

const meta: Meta = {
    title: "Components/Resize Observer",
    component: "pc-resize-observer",
    argTypes: {
        disabled: { control: "boolean" },
    },
    args: {
        disabled: false,
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({ disabled }) => html`
        <div class="resize-observer-overview">
            <pc-resize-observer ?disabled=${disabled}>
                <span>Resize this box and watch the console ↘️</span>
            </pc-resize-observer>
        </div>

        <script>
            const container = document.querySelector(
                ".resize-observer-overview",
            );
            const resizeObserver =
                container.querySelector("pc-resize-observer");

            resizeObserver.addEventListener("pc-resize", (event) => {
                console.log(event.detail);
            });
        </script>

        <style>
            .resize-observer-overview {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: var(--pc-spacing-xxxl) var(--pc-spacing-xxl);
                border: 2px solid var(--pc-input-border-color);
                border-radius: var(--pc-border-radius-l)
                    var(--pc-border-radius-l) 0 var(--pc-border-radius-l);
                overflow: auto;
                resize: both;
            }
        </style>
    `,
};
