import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sl",
    $name: "Slovenščina",
    $dir: "ltr",

    carousel: "Vrtiljak",
    clearEntry: "Počisti vnos",
    close: "Zapri",
    copied: "Kopirano!",
    copy: "Kopiraj",
    currentValue: "Trenutna vrednost",
    error: "Napaka",
    goToSlide: (slide, count) => `Pojdi na diapozitiv ${slide} od ${count}`,
    hidePassword: "Skrij geslo",
    hue: "Ton barve",
    loading: "Nalaganje…",
    nextSlide: "Naslednji diapozitiv",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Nobena možnost ni izbrana";
        } else if (number === 1) {
            return "Ena možnost je izbrana";
        } else if (number === 2) {
            return "Dve možnosti sta izbrani";
        } else if (number > 2 && number <= 4) {
            return `${number} možnosti so izbrane`;
        } else {
            return `${number} možnosti je izbranih`;
        }
    },
    opacity: "Motnost",
    pickAColorFromTheScreen: "Izberi barvo z zaslona",
    previousSlide: "Prejšnji diapozitiv",
    progress: "Napredek",
    remove: "Odstrani",
    resize: "Spremeni velikost",
    scrollableRegion: "Drseče območje",
    scrollToEnd: "Drsi na konec",
    scrollToStart: "Drsi na začetek",
    showPassword: "Pokaži geslo",
    slideNum: (slide) => `Diapozitiv ${slide}`,
    toggleColorFormat: "Preklopi format barve",
};

registerTranslation(translation);

export default translation;
