import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "fi",
    $name: "Suomi",
    $dir: "ltr",

    carousel: "Karuselli",
    clearEntry: "Tyhjennä kenttä",
    close: "Sulje",
    copied: "Kopioitu!",
    copy: "Kopioi",
    currentValue: "Nykyinen arvo",
    error: "Virhe",
    goToSlide: (slide, count) => `Siirry diaan ${slide} / ${count}`,
    hidePassword: "Piilota salasana",
    loading: "Ladataan…",
    nextSlide: "Seuraava dia",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ei valittuja vaihtoehtoja";
        } else if (number === 1) {
            return "Yksi vaihtoehto valittu";
        } else {
            return `${number} vaihtoehtoa valittu`;
        }
    },
    pickAColorFromTheScreen: "Valitse väri näytöltä",
    previousSlide: "Edellinen dia",
    progress: "Edistyminen",
    remove: "Poista",
    resize: "Muuta kokoa",
    scrollableRegion: "Vieritettävä alue",
    scrollToEnd: "Vieritä loppuun",
    scrollToStart: "Vieritä alkuun",
    showPassword: "Näytä salasana",
    slideNum: (slide) => `Dia ${slide}`,
    toggleColorFormat: "Vaihda väriformaattia",
};

registerTranslation(translation);

export default translation;
