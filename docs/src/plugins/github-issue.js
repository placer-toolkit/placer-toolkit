import { visit } from "unist-util-visit";

export default function remarkGitHubLinker({ owner, repo }) {
    return function transformer(tree) {
        visit(tree, "text", (node, index, parent) => {
            if (!parent || typeof index !== "number") {
                return;
            }

            const regex = /\[(pull|issue|discussion):(\d+)\]/g;
            const newNodes = [];

            let match;
            let lastIndex = 0;

            while ((match = regex.exec(node.value)) !== null) {
                const [fullMatch, type, number] = match;
                const start = match.index;

                if (start > lastIndex) {
                    newNodes.push({
                        type: "text",
                        value: node.value.slice(lastIndex, start),
                    });
                }

                const urlType =
                    type === "pull"
                        ? "pull"
                        : type === "issue"
                          ? "issues"
                          : "discussions";

                newNodes.push({
                    type: "link",
                    url: `https://github.com/${owner}/${repo}/${urlType}/${number}`,
                    children: [{ type: "text", value: `#${number}` }],
                });

                lastIndex = regex.lastIndex;
            }

            if (newNodes.length > 0) {
                if (lastIndex < node.value.length) {
                    newNodes.push({
                        type: "text",
                        value: node.value.slice(lastIndex),
                    });
                }

                parent.children.splice(index, 1, ...newNodes);
            }
        });
    };
}
