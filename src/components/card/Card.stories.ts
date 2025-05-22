import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./card.js";
import "../button/button.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../rating/rating.js";

const meta: Meta = {
    title: "Components/Card",
    component: "pc-card",
    argTypes: {
        image: {
            control: "text",
            description: "The designated slot for images.",
        },
        header: {
            control: "text",
            description: "The designated slot for the header.",
        },
        body: {
            control: "text",
            description: "The designated slot for body text.",
        },
        footer: {
            control: "text",
            description: "The designated slot for the footer.",
        },
    },
    args: {
        image: `<img src="https://placehold.co/300x200" alt="Placeholder image" />`,
        header: `<strong>Lorem ipsum</strong>`,
        body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
        footer: `<pc-button appearance="primary" pill><pc-icon slot="prefix" library="default" ="solid" name="cart-shopping"></pc-icon>Buy</pc-button><pc-button appearance="text" pill>More info</pc-button>`,
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({ image, header, body, footer }) => html`
        <pc-card class="card-default">
            ${image ? html`<div slot="image">${unsafeHTML(image)}</div>` : null}
            ${header
                ? html`<div slot="header">${unsafeHTML(header)}</div>`
                : null}
            ${body ? html`${unsafeHTML(body)}` : null}
            ${footer
                ? html`<div slot="footer">${unsafeHTML(footer)}</div>`
                : null}
        </pc-card>

        <style>
            .card-default {
                max-width: 300px;
            }

            .card-default div[slot="footer"] {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: var(--pc-spacing-s);
            }
        </style>
    `,
};

export const BasicCard: Story = {
    args: {
        image: "",
        header: "",
        body: "<p>This is just a basic card. No image, no header, and no footer. Just your content.</p>",
        footer: "",
    },

    render: ({ image, header, body, footer }) => html`
        <pc-card class="card-basic">
            ${image ? html`<div slot="image">${unsafeHTML(image)}</div>` : null}
            ${header
                ? html`<div slot="header">${unsafeHTML(header)}</div>`
                : null}
            ${body ? html`${unsafeHTML(body)}` : null}
            ${footer
                ? html`<div slot="footer">${unsafeHTML(footer)}</div>`
                : null}
        </pc-card>

        <style>
            .card-basic {
                max-width: 300px;
            }
        </style>
    `,
};

export const WithHeader: Story = {
    args: {
        image: "",
        header: '<strong>Header title</strong><pc-icon-button library="default" ="solid" name="gear"></pc-icon-button>',
        body: "<p>This card has a header. You can put all sorts of things in it!</p>",
        footer: "",
    },

    render: ({ image, header, body, footer }) => html`
        <pc-card class="card-header">
            ${image ? html`<div slot="image">${unsafeHTML(image)}</div>` : null}
            ${header
                ? html`<div slot="header">${unsafeHTML(header)}</div>`
                : null}
            ${body ? html`${unsafeHTML(body)}` : null}
            ${footer
                ? html`<div slot="footer">${unsafeHTML(footer)}</div>`
                : null}
        </pc-card>

        <style>
            .card-header {
                max-width: 300px;
            }

            .card-header [slot="header"] {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .card-header pc-icon-button {
                font-size: var(--pc-font-size-m);
            }
        </style>
    `,
};

export const WithFooter: Story = {
    args: {
        image: "",
        header: "",
        body: "<p>This card has a footer. You can put all sorts of things in it!</p>",
        footer: '<pc-rating></pc-rating><pc-button appearance="primary" pill>Preview</pc-button>',
    },

    render: ({ image, header, body, footer }) => html`
        <pc-card class="card-footer">
            ${image ? html`<div slot="image">${unsafeHTML(image)}</div>` : null}
            ${header
                ? html`<div slot="header">${unsafeHTML(header)}</div>`
                : null}
            ${body ? html`${unsafeHTML(body)}` : null}
            ${footer
                ? html`<div slot="footer">${unsafeHTML(footer)}</div>`
                : null}
        </pc-card>

        <style>
            .card-footer {
                max-width: 300px;
            }

            .card-footer [slot="footer"] {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        </style>
    `,
};

export const WithImage: Story = {
    args: {
        image: '<img src="https://placehold.co/300x200" alt="Placeholder image" />',
        header: "",
        body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
        footer: "",
    },

    render: ({ image, header, body, footer }) => html`
        <pc-card class="card-default">
            ${image ? html`<div slot="image">${unsafeHTML(image)}</div>` : null}
            ${header
                ? html`<div slot="header">${unsafeHTML(header)}</div>`
                : null}
            ${body ? html`${unsafeHTML(body)}` : null}
            ${footer
                ? html`<div slot="footer">${unsafeHTML(footer)}</div>`
                : null}
        </pc-card>

        <style>
            .card-default {
                max-width: 300px;
            }

            .card-default div[slot="footer"] {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: var(--pc-spacing-s);
            }
        </style>
    `,
};
