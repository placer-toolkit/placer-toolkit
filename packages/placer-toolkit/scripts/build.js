import { build, context } from "esbuild";
import { globSync } from "glob";
import { exec } from "child_process";
import { promisify } from "util";
import fsExtra from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const { copySync, removeSync } = fsExtra;
const execPromise = promisify(exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectRoot = path.resolve(__dirname, "..");
const entryPoints = globSync("src/**/*.ts", {
    ignore: ["src/**/*.d.ts"],
    cwd: projectRoot,
    absolute: true,
});

const cdnBuildConfig = {
    entryPoints: entryPoints,
    outdir: path.join(projectRoot, "cdn"),
    format: "esm",
    target: "es2020",
    bundle: true,
    splitting: true,
    minify: true,
    chunkNames: "chunks/[name].[hash]",
    entryNames: "[dir]/[name]",
    loader: {
        ".css": "text",
    },
    tsconfig: path.join(projectRoot, "tsconfig.cdn.json"),
};

const npmBuildConfig = {
    entryPoints: entryPoints,
    outdir: path.join(projectRoot, "dist"),
    format: "esm",
    target: "es2020",
    bundle: true,
    entryNames: "[dir]/[name]",
    loader: {
        ".css": "text",
    },
    tsconfig: path.join(projectRoot, "tsconfig.json"),
};

async function runBuild() {
    const isWatch = process.argv.includes("--watch");

    const runCEM = async () => {
        console.log("🛠️ Updating CEM manifests…");

        await Promise.all([
            execPromise(`npx cem analyze --litelement --outdir cdn`, {
                cwd: projectRoot,
            }),
            execPromise(`npx cem analyze --litelement --outdir dist`, {
                cwd: projectRoot,
            }),
        ]);

        console.log("⏱️ CEM manifest creation done.");
    };

    if (isWatch) {
        console.log("👀 Watch mode enabled. Waiting for changes…\n");

        runCEM().catch((error) =>
            console.error(`CEM generation error: ${error}`),
        );

        const watchPlugin = {
            name: "watch-plugin",
            setup(build) {
                build.onEnd((result) => {
                    if (result.errors.length === 0) {
                        copySync(
                            path.join(projectRoot, "src/styles"),
                            path.join(projectRoot, "dist/styles"),
                        );
                        copySync(
                            path.join(projectRoot, "src/styles"),
                            path.join(projectRoot, "cdn/styles"),
                        );
                        console.log(
                            `⚡ Build updated and CSS copied (${new Date().toLocaleTimeString()})`,
                        );
                    }
                });
            },
        };

        const [cdnContext, npmContext] = await Promise.all([
            context({ ...cdnBuildConfig, plugins: [watchPlugin] }),
            context({ ...npmBuildConfig, plugins: [watchPlugin] }),
        ]);

        await Promise.all([cdnContext.watch(), npmContext.watch()]);

        process.stdin.on("data", (data) => {
            const string = data.toString().trim().toLowerCase();

            if (string === "r") {
                runCEM();
            }
        });

        console.log(
            "⌨️ Press R + Enter to manually update the CEM manifest.\n",
        );
    } else {
        const totalStartTime = Date.now();

        try {
            console.log("▶️ Starting the build process…\n");

            // #region — Removal of previous build artifacts
            console.log("🧹 Cleaning up previous build artifacts…\n");

            removeSync(path.join(projectRoot, "cdn"));
            removeSync(path.join(projectRoot, "dist"));
            // #endregion

            // #region — Build CDN and npm distributions, copy CSS and create CEM manifest
            console.log("🛠️ Building the CDN and npm builds concurrently…");
            console.log("🛠️ Copying the CSS files…");
            console.log("🛠️ Analysing the components for the CEM manifest…\n");

            const buildStart = Date.now();

            await Promise.all([
                (async () => {
                    const logs = [];
                    const start = Date.now();

                    await build(cdnBuildConfig);

                    const time = Date.now() - start;

                    logs.push(
                        `⏱️ CDN: TypeScript file compilation took ${time} ms.`,
                    );
                    copySync(
                        path.join(projectRoot, "src/styles"),
                        path.join(projectRoot, "cdn/styles"),
                    );
                    logs.push("⏱️ CDN: CSS file transfer done.\n");

                    console.log(logs.join("\n"));
                })(),
                (async () => {
                    const logs = [];
                    const start = Date.now();

                    await build(npmBuildConfig);

                    const time = Date.now() - start;
                    logs.push(
                        `⏱️ npm: TypeScript file compilation took ${time} ms.`,
                    );

                    const tscStart = Date.now();

                    try {
                        await execPromise(`npx tsc --emitDeclarationOnly`, {
                            cwd: projectRoot,
                        });
                    } catch (error) {
                        if (logs.length) {
                            console.log(logs.join("\n"));
                        }

                        console.error("❌ tsc returned an error:\n", error);
                        process.exit(1);
                    }

                    const tscTime = Date.now() - tscStart;
                    logs.push(`⏱️ npm: Type emissions took ${tscTime} ms.`);

                    copySync(
                        path.join(projectRoot, "src/styles"),
                        path.join(projectRoot, "dist/styles"),
                    );

                    logs.push(`⏱️ npm: CSS file transfer done.\n`);
                    console.log(logs.join("\n"));
                })(),
                (async () => {
                    const logs = [];
                    await execPromise(
                        `npx cem analyze --litelement --outdir cdn`,
                        {
                            cwd: projectRoot,
                        },
                    );
                    await execPromise(
                        `npx cem analyze --litelement --outdir dist`,
                        { cwd: projectRoot },
                    );
                    logs.push("⏱️ CEM manifest creation done.\n");
                    console.log(logs.join("\n"));
                })(),
            ]);

            const buildTotalTime = Date.now() - buildStart;

            console.log(
                `⏱️ All builds and tasks completed in ${buildTotalTime} ms.\n`,
            );
            // #endregion

            const totalEndTime = Date.now();
            const totalBuildTimeMilliseconds = totalEndTime - totalStartTime;

            console.log(
                `✅ Placer Toolkit was successfully compiled! (Build time: ${totalBuildTimeMilliseconds} ms)`,
            );
            console.log(
                `📂 Transpiled ${entryPoints.length} ${entryPoints.length === 1 ? "file" : "files"} for each build.`,
            );
        } catch (error) {
            console.error(
                `❌ The build generation process failed.\n\nError:\n\n${error}`,
            );
            process.exit(1);
        }
    }
}

runBuild();
