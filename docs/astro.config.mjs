import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGitHubLinker from "./src/plugins/github-issue.js";
import remarkCodeBlockToComponent from "./src/plugins/code-blocks.js";

// Configuration reference: https://docs.astro.build/en/reference/configuration-reference
export default defineConfig({
    site: "https://placer-toolkit.vercel.app",
    integrations: [
        mdx({
            rehypePlugins: [
                rehypeSlug,
                [
                    rehypeAutolinkHeadings,
                    {
                        behavior: "append",
                        properties: {
                            "className": ["heading-anchor"],
                            "ariaLabel": "Jump to this heading",
                            "data-pagefind-ignore": "",
                        },
                        content: {
                            type: "text",
                            value: "#",
                        },
                    },
                ],
            ],
        }),
        sitemap(),
    ],
    i18n: {
        locales: ["en", "de"],
        defaultLocale: "en",
        routing: {
            prefixDefaultLocale: false,
        },
    },
    markdown: {
        remarkPlugins: [
            [
                remarkGitHubLinker,
                {
                    owner: "placer-toolkit",
                    repo: "placer-toolkit",
                    /* Acquire your own GitHub secret token to display the GitHub issue
                       linking Markdown syntax in your dev and build environment correctly. */
                    token: process.env.GITHUB_TOKEN,
                },
            ],
            remarkCodeBlockToComponent,
        ],
    },
    redirects: {
        "/docs/components/visually-hidden":
            "/docs/style-utilities/visually-hidden",
        "/docs/design-tokens/border-radius":
            "/docs/design-tokens/borders/#border-radius",
        "/docs/design-tokens/z-index": "/docs/design-tokens",
        "/docs/design-tokens/other-tokens":
            "/docs/design-tokens/component-groups",

        "/de/(?!docs|404)(:path*)": "/de/docs/:path",

        "/(?!docs|de)(:path*)": "/docs/:path",
    },
});
