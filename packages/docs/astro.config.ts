import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import viteCompression from "vite-plugin-compression";
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
        sitemap({
            filter: (page: string) =>
                !/^https:\/\/placer-toolkit\.vercel\.app(?:\/[a-zA-Z0-9-]{2,5})?\/404\/?$/.test(
                    page,
                ),
        }),
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
                },
            ],
            remarkCodeBlockToComponent,
        ],
    },
    vite: {
        plugins: [
            viteCompression({
                algorithm: "brotliCompress",
                threshold: 0,
                filter: /\.(js|mjs|json|css|html|svg)$/i,
            }),
        ],
        optimizeDeps: {
            exclude: ["placer-toolkit"],
        },
        server: {
            watch: {
                usePolling: false,
                ignored: [
                    "**/node_modules/**",
                    "**/.git/**",
                    "**/.astro/**",
                    "**/dist/**",
                ],
            },
        },
    },
});
