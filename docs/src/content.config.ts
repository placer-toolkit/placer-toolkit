import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const getStarted = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/get-started",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
    }),
});

const designTokens = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/design-tokens",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        slug: z.string().optional(),
    }),
});

const components = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/components",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        slug: z.string().optional(),
    }),
});

const layout = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/layout",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        slug: z.string().optional(),
    }),
});

const styleUtilities = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/style-utilities",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        slug: z.string().optional(),
    }),
});

const resources = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/resources",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
    }),
});

const legal = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/legal",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
    }),
});

export const collections = {
    getStarted,
    designTokens,
    components,
    layout,
    styleUtilities,
    resources,
    legal,
};
