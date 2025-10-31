import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sv",
    $name: "Svenska",
    $dir: "ltr",

    carousel: "Karusell",
    clearEntry: "Återställ val",
    close: "Stäng",
    copied: "Kopierat!",
    copy: "Kopiera",
    currentValue: "Nuvarande värde",
    error: "Fel",
    goToSlide: (slide, count) => `Gå till bild ${slide} av ${count}`,
    hidePassword: "Dölj lösenord",
    loading: "Läser in…",
    nextSlide: "Nästa bild",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Inga alternativ har valts";
        } else if (number === 1) {
            return "Ett alternativ valt";
        } else {
            return `${number} alternativ valda`;
        }
    },
    pickAColorFromTheScreen: "Välj en färg från skärmen",
    previousSlide: "Föregående bild",
    progress: "Framsteg",
    remove: "Ta bort",
    resize: "Ändra storlek",
    scrollableRegion: "Rullningsbar region",
    scrollToEnd: "Skrolla till slutet",
    scrollToStart: "Skrolla till början",
    showPassword: "Visa lösenord",
    slideNum: (slide) => `Bild ${slide}`,
    toggleColorFormat: "Växla färgformat",
};

registerTranslation(translation);

export default translation;
