import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const externalPackages = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
];

export default {
    input: [
        "src/placer-autoloader.ts",
        "src/placer.ts",
        "src/utilities/icon-library.ts",
    ],
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
    ],
    external: (id) => {
        return externalPackages.some(
            (pkgName) => id === pkgName || id.startsWith(`${pkgName}/`)
        );
    },
};
