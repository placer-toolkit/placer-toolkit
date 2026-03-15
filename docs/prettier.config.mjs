import coreConfiguration from "../prettier.config.mjs";

/** @type {import("prettier").Config} */
export default {
    ...coreConfiguration,
    plugins: ["prettier-plugin-astro"],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
};
