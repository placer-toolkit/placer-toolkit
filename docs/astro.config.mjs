import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAnchorHeadings from "./src/plugins/anchor-headings.js";
import remarkGitHubLinker from "./src/plugins/github-issue.js";
import remarkCodeBlockToComponent from "./src/plugins/code-blocks.js";

// Configuration reference: https://docs.astro.build/en/reference/configuration-reference
export default defineConfig({
    site: "https://placer-toolkit.vercel.app",
    integrations: [
        mdx({
            rehypePlugins: [rehypeSlug, rehypeAnchorHeadings],
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
    vite: {
        server: {
            watch: {
                usePolling: false,
                ignored: [
                    "**/node_modules/**",
                    "**/.git/**",
                    "**/.astro/**",
                    "**/dist/**",
                ],
                awaitWriteFinish: {
                    stabilityThreshold: 1500,
                    pollInterval: 100,
                },
            },
        },
    },
});
