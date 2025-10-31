import { visit } from "unist-util-visit";

export default function remarkCodeBlockToComponent() {
    return function transformer(tree) {
        visit(tree, "code", (node, index, parent) => {
            if (!parent || typeof index !== "number") {
                return;
            }

            const rawLang = node.language || node.lang || "";
            const [language, ...modifiers] = rawLang.split(":");

            let astroTag = "CodeBlock";
            const attrs = [];

            if (language === "demo") {
                astroTag = "CodeDemo";

                for (const modifier of modifiers) {
                    if (modifier === "no-codepen") {
                        attrs.push("noCodepen");
                    }

                    if (modifier === "open") {
                        attrs.push("open");
                    }
                }
            } else if (language) {
                attrs.push(`language="${language}"`);
            }

            const newElement = {
                type: "mdxJsxFlowElement",
                name: astroTag,
                attributes: attrs.map((attr) => {
                    const [key, value] = attr.split("=");
                    return value
                        ? {
                              type: "mdxJsxAttribute",
                              name: key,
                              value: value.replace(/"/g, ""),
                          }
                        : { type: "mdxJsxAttribute", name: key, value: true };
                }),
                children: [
                    {
                        ...node,
                        type: "raw",
                        value: node.value,
                    },
                ],
            };

            parent.children.splice(index, 1, newElement);
        });
    };
}
