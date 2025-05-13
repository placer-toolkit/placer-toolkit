import { Decorator } from "@storybook/web-components";
import type { Preview } from "@storybook/web-components";

const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = prefersDark ? "dark" : "light";

const applyTheme = (theme: string) => {
    const html = document.documentElement;
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

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
