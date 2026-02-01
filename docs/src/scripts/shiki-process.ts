import { createHighlighter, type Highlighter } from "shiki";
import { placerEclipse } from "../styles/syntax/placer-eclipse";

const globalShiki = globalThis as unknown as {
    shikiPromise?: Promise<Highlighter>;
};

if (!globalShiki.shikiPromise) {
    globalShiki.shikiPromise = createHighlighter({
        themes: [placerEclipse],
        langs: [
            "html",
            "css",
            "markdown",
            "javascript",
            "typescript",
            "bash",
            "diff",
            "jsx",
            "mdx",
        ],
    });
}

export const getShiki = async (): Promise<Highlighter> => {
    return globalShiki.shikiPromise!;
};
