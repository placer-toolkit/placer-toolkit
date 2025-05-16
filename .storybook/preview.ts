import { Decorator } from "@storybook/web-components-vite";
import { themes } from "storybook/theming";
import type { Preview } from "@storybook/web-components-vite";
import "./storybook-overrides.css";

const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = prefersDark ? "dark" : "light";

const applyTheme = (theme: string) => {
    const html = document.documentElement;
    const docsStory = document.querySelectorAll(".docs-story > div");

    docsStory.forEach((docStory: Element) => {
        docStory.classList.remove("pc-theme-light", "pc-theme-dark");
        docStory.classList.add(
            theme === "light" ? "pc-theme-light" : "pc-theme-dark"
        );

        (docStory as HTMLElement).style.backgroundColor =
            "var(--pc-color-neutral-0)";
        (docStory as HTMLElement).style.color = "var(--pc-color-neutral-1000)";
        (docStory as HTMLElement).style.fontFamily = "var(--pc-font-sans)";
        (docStory as HTMLElement).style.fontSize = "var(--pc-font-size-m)";
        (docStory as HTMLElement).style.fontWeight =
            "var(--pc-font-weight-normal)";
        (docStory as HTMLElement).style.lineHeight =
            "var(--pc-line-height-normal)";
    });

    html.classList.remove("pc-theme-light", "pc-theme-dark");
    html.classList.add(theme === "light" ? "pc-theme-light" : "pc-theme-dark");
};

export const globalTypes = {
    theme: {
        name: "Placer Theme",
        description: "Theme for Placer components",
        defaultValue: initialTheme,
        toolbar: {
            icon: "circlehollow",
            items: [
                { value: "light", title: "Light", icon: "sun" },
                { value: "dark", title: "Dark", icon: "moon" },
            ],
            showName: true,
            dynamicTitle: true,
        },
    },
};

const withTheme: Decorator = (Story, context) => {
    const theme = context.globals.theme || initialTheme;
    applyTheme(theme);
    return Story();
};

export const decorators = [withTheme];

export const parameters = {
    docs: {
        theme: themes.dark,
    },
    backgrounds: {
        default: "dark",
        values: [
            { name: "light", value: "#ffffff" },
            { name: "dark", value: "#222222" },
        ],
    },
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },

    tags: ["autodocs"]
};

export default preview;
