import en from "./languages/en.js";
import de from "./languages/de.js";

export const languages = {
    en: "English",
    de: "Deutsch",
} as const;

export const defaultLanguage = "en";
export const showDefaultLanguage = false;

export const ui = { en, de } as const;
