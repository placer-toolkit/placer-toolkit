import { h } from "hastscript";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

import de from "../i18n/languages/de.js";
import en from "../i18n/languages/en.js";

const ui = { de, en };

export default function rehypeAnchorHeadings() {
    return (tree, file) => {
        const lang = file.path.includes("/de/") ? "de" : "en";
        const translations = ui[lang];

        visit(tree, "element", (node, index, parent) => {
            if (
                !["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName) ||
                !node.properties.id
            ) {
                return;
            }

            const title = toString(node);
            const label = (
                translations["ui.content.heading.anchorLabel"] ||
                "Section titled “{{title}}”"
            ).replace("{{title}}", title);

            parent.children[index] = h(
                "div",
                { class: `heading-wrapper level-${node.tagName}` },
                node,
                h(
                    "a",
                    {
                        class: "heading-anchor",
                        href: "#" + node.properties.id,
                        ariaLabel: label,
                    },
                    h("pc-icon", {
                        "library": "default",
                        "icon-style": "solid",
                        "name": "link",
                    }),
                ),
            );
        });
    };
}
