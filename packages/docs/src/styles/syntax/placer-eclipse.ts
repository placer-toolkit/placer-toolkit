import type { ThemeRegistration } from "shiki";

// Note: This is a special Shiki theme for Placer Toolkit that can adapt to different themes and colour schemes.
export const placerEclipse: ThemeRegistration = {
    name: "placer-eclipse",
    // The type is set to dark because dark mode looks the best with this theme.
    type: "dark",
    colors: {
        "editor.background": "var(--pc-color-surface-raised)",
        "editor.foreground":
            "color-mix(in oklab, var(--pc-color-text-normal), var(--pc-color-text-normal-inverse) var(--pc-color-mix-syntax))",
    },
    tokenColors: [
        {
            scope: ["keyword.control", "storage.type", "storage.modifier"],
            settings: {
                foreground: "var(--pc-color-danger-on-quiet)",
            },
        },
        {
            scope: [
                "entity.name.function",
                "meta.property.object",
                "support.function",
                "variable.other.property",
                "variable.other.object.property",
            ],
            settings: {
                foreground: "var(--pc-color-cyan-50)",
            },
        },
        {
            scope: ["variable.other.constant", "variable.readonly"],
            settings: {
                foreground: "var(--pc-color-primary-on-quiet)",
            },
        },
        {
            scope: [
                "entity.name.class",
                "entity.name.type",
                "support.class",
                "support.variable.dom",
                "variable.other.object",
            ],
            settings: {
                foreground: "var(--pc-color-success-on-quiet)",
            },
        },
        {
            scope: ["entity.other.attribute-name", "meta.object-literal.key"],
            settings: {
                foreground: "var(--pc-color-primary-on-quiet)",
            },
        },
        {
            scope: [
                "constant.numeric",
                "keyword.other.unit",
                "constant.language",
            ],
            settings: {
                foreground: "var(--pc-color-purple-60)",
            },
        },
        {
            scope: ["string", "string.regexp"],
            settings: {
                foreground: "var(--pc-color-primary-on-normal)",
            },
        },
        {
            scope: ["comment", "punctuation.definition.comment"],
            settings: {
                foreground:
                    "color-mix(in oklab, var(--pc-color-neutral-on-normal), var(--pc-color-text-normal-inverse) var(--pc-color-mix-syntax))",
                fontStyle: "italic",
            },
        },
        {
            scope: [
                "keyword.operator",
                "punctuation",
                "meta.brace",
                "punctuation.definition.parameters",
                "punctuation.definition.block",
            ],
            settings: {
                foreground: "var(--pc-color-neutral-on-normal)",
            },
        },
        {
            scope: ["entity.name.selector", "entity.name.tag"],
            settings: {
                foreground: "var(--pc-color-success-on-quiet)",
            },
        },
        {
            scope: ["support.type.property-name.css"],
            settings: {
                foreground: "var(--pc-color-primary-on-quiet)",
            },
        },
        {
            scope: ["support.constant.property-value.css"],
            settings: {
                foreground: "var(--pc-color-neutral-on-normal)",
            },
        },
        {
            scope: ["support.constant.color.w3c-standard-color-name.css"],
            settings: {
                foreground: "var(--pc-color-purple-60)",
            },
        },
        {
            scope: ["meta.template.expression"],
            settings: {
                foreground: "var(--pc-color-neutral-on-quiet)",
            },
        },
        {
            scope: ["markup.heading"],
            settings: {
                foreground: "var(--pc-color-primary-on-quiet)",
                fontStyle: "bold",
            },
        },
        {
            scope: ["markup.list"],
            settings: {
                foreground: "var(--pc-color-warning-on-normal)",
            },
        },
        {
            scope: ["markup.italic"],
            settings: {
                fontStyle: "italic",
            },
        },
        {
            scope: ["markup.bold"],
            settings: {
                fontStyle: "bold",
            },
        },
        {
            scope: ["markup.inserted"],
            settings: {
                foreground: "var(--pc-color-success-on-quiet)",
            },
        },
        {
            scope: ["markup.deleted"],
            settings: {
                foreground: "var(--pc-color-danger-on-quiet)",
            },
        },
        {
            scope: ["markup.changed"],
            settings: {
                foreground: "var(--pc-color-primary-on-quiet)",
            },
        },
    ],
};
