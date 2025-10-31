import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ga",
    $name: "Gaeilge",
    $dir: "ltr",

    carousel: "Rothlach",
    clearEntry: "Glan isteach",
    close: "Dún",
    copied: "Cóipeáilte!",
    copy: "Cóipeáil",
    currentValue: "Luach reatha",
    error: "Earráid",
    goToSlide: (slide, count) => `Téigh go sleamhnán ${slide} de ${count}`,
    hidePassword: "Folaigh an pasfhocal",
    loading: "Lódáil…",
    nextSlide: "An chéad sleamhnán eile",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Níl aon roghanna roghnaithe";
        } else if (number === 1) {
            return "Rogha amháin roghnaithe";
        } else {
            return `${number} roghanna roghnaithe`;
        }
    },
    pickAColorFromTheScreen: "Roghnaigh dath ón scáileán",
    previousSlide: "Sleamhnán roimhe",
    progress: "Dul chun cinn",
    remove: "Bain",
    resize: "Athraigh méid",
    scrollableRegion: "Réigiún scrollaithe",
    scrollToEnd: "Scrollaigh go deireadh",
    scrollToStart: "Scrollaigh go tús",
    showPassword: "Taispeáin an pasfhocal",
    slideNum: (slide) => `Sleamhnán ${slide}`,
    toggleColorFormat: "Athraigh formáid dath",
};

registerTranslation(translation);

export default translation;
