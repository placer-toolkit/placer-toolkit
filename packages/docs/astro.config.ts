import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import rehypeSlug from "rehype-slug";
import viteCompression from "vite-plugin-compression";
import rehypeAnchorHeadings from "./src/plugins/anchor-headings.js";
import remarkGitHubLinker from "./src/plugins/github-issue.js";
import remarkCodeBlockToComponent from "./src/plugins/code-blocks.js";

const processor = unified({
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
    rehypePlugins: [rehypeSlug, rehypeAnchorHeadings],
});

// Configuration reference: https://docs.astro.build/en/reference/configuration-reference
export default defineConfig({
    site: "https://placer-toolkit.vercel.app",
    integrations: [
        mdx({
            processor: processor,
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
        processor: processor,
    },
    vite: {
        plugins: [
            viteCompression({
                algorithm: "brotliCompress",
                threshold: 0,
                filter: /\.(js|mjs|json|css|html|svg)$/i,
            }),
        ],
        server: {
            fs: {
                allow: [".."],
            },
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
