import { ui, defaultLanguage, showDefaultLanguage } from "./ui.js";

export function getLanguageFromURL(url: URL) {
    const [, language] = url.pathname.split("/");

    if (language in ui) {
        return language as keyof typeof ui;
    }

    return defaultLanguage;
}

export function useTranslatedPath(language: keyof typeof ui) {
    return function translatePath(path: string, lang: string = language) {
        return !showDefaultLanguage && lang === defaultLanguage
            ? path
            : `/${lang}${path}`;
    };
}

export function useTranslations(language: keyof typeof ui) {
    interface TranslationMap {
        [key: string]: string;
    }

    interface UI {
        [lang: string]: TranslationMap;
    }

    const uiTyped = ui as unknown as UI;

    return function translation(key: string): string | unknown {
        const text: string =
            uiTyped[language][key] || uiTyped[defaultLanguage][key];

        return text;
    };
}
