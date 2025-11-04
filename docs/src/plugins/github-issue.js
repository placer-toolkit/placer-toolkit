import fetch from "node-fetch";
import { visit } from "unist-util-visit";

export default function remarkGitHubLinker({ owner, repo, token }) {
    const githubCache = new Map();

    async function resolveType(number) {
        if (githubCache.has(number)) {
            return githubCache.get(number);
        }

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const base = `https://api.github.com/repos/${owner}/${repo}`;

        const endpoints = [
            { type: "pull", url: `${base}/pull/${number}` },
            { type: "issues", url: `${base}/issues/${number}` },
        ];

        for (const { type, url } of endpoints) {
            const response = await fetch(url, { headers });
            if (response.ok) {
                githubCache.set(number, type);
                return type;
            }
        }

        githubCache.set(number, "discussions");
        return "discussions";
    }

    return async function transformer(tree) {
        const replacements = [];

        visit(tree, "text", (node, index, parent) => {
            if (!parent || typeof index !== "number") {
                return;
            }

            const regex = /\[github#(\d+)\]/g;
            let match;
            let lastIndex = 0;
            const newNodes = [];
            const promises = [];

            while ((match = regex.exec(node.value)) !== null) {
                const number = Number(match[1]);
                const start = match.index;
                const end = regex.lastIndex;

                if (start > lastIndex) {
                    newNodes.push({
                        type: "text",
                        value: node.value.slice(lastIndex, start),
                    });
                }

                const placeholder = {
                    type: "link",
                    url: "",
                    children: [
                        {
                            type: "text",
                            value: `#${number}`,
                        },
                    ],
                };

                newNodes.push(placeholder);

                const promise = resolveType(number).then((type) => {
                    placeholder.url = `https://github.com/${owner}/${repo}/${type}/${number}`;
                });

                promises.push(promise);

                lastIndex = end;
            }

            if (lastIndex < node.value.length) {
                newNodes.push({
                    type: "text",
                    value: node.value.slice(lastIndex),
                });
            }

            if (newNodes.length > 0) {
                replacements.push({ parent, index, newNodes, promises });
            }
        });

        await Promise.all(replacements.flatMap((r) => r.promises));

        for (const { parent, index, newNodes } of replacements) {
            parent.children.splice(index, 1, ...newNodes);
        }
    };
}
