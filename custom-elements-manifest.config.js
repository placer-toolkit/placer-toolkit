import { parse } from "comment-parser";
import commandLineArgs from "command-line-args";
import fs from "fs";

const packageData = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const { name, description, version, author, homepage, license } = packageData;

commandLineArgs([
    { name: "litelement", type: String },
    { name: "analyze", defaultOption: true },
    { name: "outdir", type: String },
]);

function noDash(string) {
    return string.replace(/^\s?-/, "").trim();
}

function replace(string, terms) {
    terms.forEach(({ from, to }) => {
        string = string?.replace(from, to);
    });

    return string;
}

export default {
    globs: ["src/components/**/*.component.ts"],
    exclude: ["**/*.styles.ts"],
    plugins: [
        {
            name: "placer-package-data",
            packageLinkPhase({ customElementsManifest }) {
                customElementsManifest.package = {
                    name,
                    description,
                    version,
                    author,
                    homepage,
                    license,
                };
            },
        },
        {
            name: "placer-jsdoc-custom-tags",
            analyzePhase({ ts, node, moduleDoc }) {
                if (node.kind !== ts.SyntaxKind.ClassDeclaration) return;

                const className = node.name?.getText?.();
                const classDoc = moduleDoc?.declarations?.find(
                    (declaration) => declaration.name === className,
                );

                if (!classDoc || !node.jsDoc) return;

                const customTags = [
                    "title",
                    "since",
                    "status",
                    "animation",
                    "dependency",
                ];

                let customComments = "/**";

                for (const jsDoc of node.jsDoc) {
                    if (!jsDoc.tags) continue;

                    for (const tag of jsDoc.tags) {
                        const tagName = tag.tagName?.escapedText;
                        const tagComment = tag.comment ?? "";

                        if (tagName && customTags.includes(tagName)) {
                            customComments += `\n * @${tagName} ${tagComment}`;
                        }
                    }
                }

                customComments += "\n */";

                classDoc["jsDoc"] = node.jsDoc
                    .map((jsDoc) => jsDoc.getFullText?.() ?? "")
                    .join("\n");

                const parsed = parse(customComments);
                parsed[0]?.tags?.forEach((t) => {
                    switch (t.tag) {
                        case "title":
                        case "since":
                        case "status":
                            classDoc[t.tag] = t.name;
                            break;
                        case "animation":
                            classDoc.animations ??= [];
                            classDoc.animations.push({
                                name: t.name,
                                description: noDash(t.description),
                            });
                            break;
                        case "dependency":
                            classDoc.dependencies ??= [];
                            classDoc.dependencies.push(t.name);
                            break;
                        default:
                            classDoc[t.tag] ??= [];
                            classDoc[t.tag].push({
                                name: t.name,
                                description: t.description,
                                type: t.type || undefined,
                            });
                    }
                });
            },
        },
        {
            name: "placer-translate-module-paths",
            packageLinkPhase({ customElementsManifest }) {
                customElementsManifest?.modules?.forEach((mod) => {
                    const terms = [
                        { from: /^src\//, to: "" },
                        { from: /\.component.(t|j)sx?$/, to: ".js" },
                    ];

                    mod.path = replace(mod.path, terms);

                    for (const exp of mod.exports ?? []) {
                        exp.declaration.module = replace(
                            exp.declaration.module,
                            terms,
                        );
                    }

                    for (const declaration of mod.declarations ?? []) {
                        if (declaration.kind === "class") {
                            for (const member of declaration.members ?? []) {
                                if (member.inheritedFrom) {
                                    member.inheritedFrom.module = replace(
                                        member.inheritedFrom.module,
                                        terms,
                                    );
                                }
                            }
                        }
                    }
                });
            },
        },
        {
            name: "placer-filter-internal-properties",
            packageLinkPhase({ customElementsManifest }) {
                customElementsManifest.modules.forEach((module) => {
                    module.declarations = module.declarations?.filter(
                        (declaration) => {
                            if (declaration.jsDoc?.includes("@internal")) {
                                return false;
                            }
                            return true;
                        },
                    );
                    module.declarations?.forEach((declaration) => {
                        if (declaration.members) {
                            declaration.members = declaration.members.filter(
                                (member) => {
                                    if (member.jsDoc?.includes("@internal")) {
                                        return false;
                                    }
                                    return true;
                                },
                            );
                        }
                    });
                });
            },
        },
    ],
};
