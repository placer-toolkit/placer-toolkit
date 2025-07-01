import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { globSync } from "glob";
import copy from "rollup-plugin-copy";
import { createRequire } from "module";

const inputs = globSync("src/**/*.ts", { ignore: ["**/*.d.ts"] });
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const externalPackages = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
];

export default {
    input: inputs,
    output: [
        {
            dir: "dist",
            format: "es",
            preserveModules: true,
            preserveModulesRoot: "src",
            entryFileNames: "[name].js",
        },
    ],
    plugins: [
        resolve({ extensions: [".js", ".ts"] }),
        commonjs(),
        typescript({
            tsconfig: "./tsconfig.json",
            declaration: true,
            declarationDir: "dist",
            rootDir: "src",
        }),
        copy({
            targets: [
                { src: "src/*.css", dest: "dist" },
                {
                    src: "src/style-utilities/*.css",
                    dest: "dist/style-utilities",
                },
            ],
        }),
    ],
    external: (id) => {
        return externalPackages.some(
            (pkgName) => id === pkgName || id.startsWith(`${pkgName}/`),
        );
    },
};
