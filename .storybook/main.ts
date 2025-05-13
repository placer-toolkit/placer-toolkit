import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
    stories: [
        "../src/components/**/*.mdx",
        "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/experimental-addon-test",
    ],
    framework: {
        name: "@storybook/web-components-vite",
        options: {},
    },
};

export default config;
