import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGitHubLinker from "./src/plugins/github-issue.js";
import remarkCodeBlockToComponent from "./src/plugins/code-blocks.js";

// Configuration reference: https://docs.astro.build/en/reference/configuration-reference
export default defineConfig({
    site: "https://placer-toolkit.netlify.app",
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
    markdown: {
        remarkPlugins: [
            [
                remarkGitHubLinker,
                {
                    owner: "randomguy-2650",
                    repo: "placer-toolkit",
                    /* Acquire your own GitHub secret token to display the GitHub issue
                       linking Markdown syntax in your dev and build environment correctly. */
                    token: process.env.GITHUB_TOKEN,
                },
            ],
            remarkCodeBlockToComponent,
        ],
    },
});
