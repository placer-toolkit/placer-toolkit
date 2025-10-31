import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "nl",
    $name: "Nederlands",
    $dir: "ltr",

    carousel: "Carrousel",
    clearEntry: "Invoer wissen",
    close: "Sluiten",
    copied: "Gekopieerd!",
    copy: "Kopiëren",
    currentValue: "Huidige waarde",
    error: "Fout",
    goToSlide: (slide, count) => `Ga naar dia ${slide} van ${count}`,
    hidePassword: "Wachtwoord verbergen",
    loading: "Laden…",
    nextSlide: "Volgende dia",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Geen opties geselecteerd";
        } else if (number === 1) {
            return "Eén optie geselecteerd";
        } else {
            return `${number} opties geselecteerd`;
        }
    },
    pickAColorFromTheScreen: "Selecteer een kleur van het scherm",
    previousSlide: "Vorige dia",
    progress: "Voortgang",
    remove: "Verwijderen",
    resize: "Formaat wijzigen",
    scrollableRegion: "Scrollbaar gebied",
    scrollToEnd: "Scrol naar het einde",
    scrollToStart: "Scrol naar het begin",
    showPassword: "Wachtwoord tonen",
    slideNum: (slide) => `Dia ${slide}`,
    toggleColorFormat: "Kleurnotatie wisselen",
};

registerTranslation(translation);

export default translation;
