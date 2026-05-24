import { visit } from "unist-util-visit";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const pkgPath = join(
    process.cwd(),
    "node_modules",
    "placer-toolkit",
    "package.json",
);
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
const packageVersion = pkg.version ?? "latest";

export default function remarkCodeBlockToComponent() {
    return function transformer(tree) {
        visit(tree, "code", (node, index, parent) => {
            if (!parent || typeof index !== "number") {
                return;
            }

            node.value = node.value.replaceAll(
                "__PLACER_VERSION__",
                packageVersion,
            );

            const rawLanguage = node.language || node.lang || "";
            const [language, ...modifiers] = rawLanguage.split(":");

            const meta = node.meta || "";

            let astroTag = "CodeBlock";

            const attributes = [];

            if (language === "demo") {
                astroTag = "CodeDemo";

                for (const modifier of modifiers) {
                    if (modifier === "no-codepen") {
                        attributes.push("noCodepen");
                    }

                    if (modifier === "open") {
                        attributes.push("open");
                    }
                }
            } else if (language) {
                attributes.push(`language="${language}"`);
            }

            const isShell = ["bash", "shell", "sh"].includes(language);

            if (!isShell && meta) {
                const matches = meta.matchAll(
                    /(?<key>\w+)=["'](?<value>[^"']+)["']/g,
                );

                for (const match of matches) {
                    const { key, value } = match.groups;

                    if (key === "fileName" || key === "title") {
                        attributes.push(`fileName="${value}"`);
                    }
                }
            }

            const newElement = {
                type: "mdxJsxFlowElement",
                name: astroTag,
                attributes: attributes.map((attribute) => {
                    const [key, value] = attribute.split("=");

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
