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
            scope: [
                "keyword",
                "storage",
                "storage.type",
                "variable.language",
                "meta.keyword",
            ],
            settings: {
                foreground: "var(--pc-color-danger-on-normal)",
            },
        },
        {
            scope: [
                "entity.name.function",
                "entity.name.class",
                "entity.name.type",
            ],
            settings: {
                foreground: "var(--pc-color-syntax-entity-name)",
            },
        },
        {
            scope: [
                "variable",
                "constant",
                "constant.numeric",
                "entity.other.attribute-name",
            ],
            settings: {
                foreground: "var(--pc-color-primary-on-quiet)",
            },
        },
        {
            scope: ["keyword.operator"],
            settings: {
                foreground:
                    "color-mix(in oklab, var(--pc-color-primary-on-normal), var(--pc-color-text-normal) var(--pc-color-mix-syntax))",
            },
        },
        {
            scope: ["constant.language"],
            settings: {
                foreground: "var(--pc-color-danger-on-quiet)",
            },
        },
        {
            scope: ["string", "string.regexp"],
            settings: {
                foreground:
                    "color-mix(in oklab, var(--pc-color-primary-on-normal), var(--pc-color-text-normal) var(--pc-color-mix-syntax))",
            },
        },
        {
            scope: ["support.function", "support.type", "support.constant"],
            settings: {
                foreground:
                    "color-mix(in oklab, var(--pc-color-primary-on-normal), var(--pc-color-text-normal) 10%)",
            },
        },
        {
            scope: ["comment"],
            settings: {
                foreground: "var(--pc-color-neutral-on-quiet)",
            },
        },
        {
            scope: [
                "entity.name.tag",
                "entity.name.selector",
                "entity.other.attribute-name.class",
                "entity.other.attribute-name.id",
                "entity.other.attribute-name.pseudo-class",
            ],
            settings: {
                foreground: "var(--pc-color-success-on-quiet)",
            },
        },
        {
            scope: ["meta.template.expression"],
            settings: {
                foreground:
                    "color-mix(in oklab, var(--pc-color-text-normal), var(--pc-color-text-normal-inverse) var(--pc-color-mix-syntax))",
            },
        },
        {
            scope: ["markup.heading"],
            settings: {
                foreground:
                    "color-mix(in oklab, var(--pc-color-primary-on-normal), var(--pc-color-text-normal) 10%)",
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
