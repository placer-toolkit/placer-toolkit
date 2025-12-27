import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { getLanguageFromURL, useTranslations } from "./src/i18n/utilities.js";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGitHubLinker from "./src/plugins/github-issue.js";
import remarkCodeBlockToComponent from "./src/plugins/code-blocks.js";

// const language = getLanguageFromURL(Astro.url);
// const translation = useTranslations(language);

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
                            // "ariaLabel": translation(
                            //     "ui.content.jumpToThisHeading",
                            // ),
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
});
