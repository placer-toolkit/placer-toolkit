import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "bs",
    $name: "Bosanski",
    $dir: "ltr",

    carousel: "Vrtuljak",
    clearEntry: "Obriši unos",
    close: "Zatvori",
    copied: "Kopirano!",
    copy: "Kopiraj",
    currentValue: "Trenutna vrijednost",
    error: "Greška",
    goToSlide: (slide, count) => `Idi na slajd ${slide} od ${count}`,
    hidePassword: "Sakrij lozinku",
    hue: "Ton boje",
    loading: "Učitavam…",
    nextSlide: "Sljedeći slajd",
    numOptionsSelected: (number) => {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        if (number === 0) {
            return "Odabrano je 0 opcija";
        } else if (number === 1) {
            return "Odabrana je jedna opcija";
        } else if (
            lastDigit >= 2 &&
            lastDigit <= 4 &&
            !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
        ) {
            return `Odabrane su ${number} opcije`;
        } else {
            return `Odabrano je ${number} opcija`;
        }
    },
    opacity: "Providnost",
    pickAColorFromTheScreen: "Odaberite boju sa zaslona",
    previousSlide: "Prethodni slajd",
    progress: "Napredak",
    remove: "Ukloni",
    resize: "Promijeni veličinu",
    scrollableRegion: "Pomakajuće područje",
    scrollToEnd: "Pomakni do kraja",
    scrollToStart: "Pomakni na početak",
    showPassword: "Prikaži lozinku",
    slideNum: (slide) => `Slajd ${slide}`,
    toggleColorFormat: "Prebaci format boje",
};

registerTranslation(translation);

export default translation;
