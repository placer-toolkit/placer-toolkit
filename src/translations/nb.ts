import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "nb",
    $name: "Norsk bokmål",
    $dir: "ltr",

    carousel: "Karusell",
    clearEntry: "Tøm felt",
    close: "Lukk",
    copied: "Kopiert!",
    copy: "Kopier",
    currentValue: "Nåværende verdi",
    error: "Feil",
    goToSlide: (slide, count) => `Gå til lysbilde ${slide} av ${count}`,
    hidePassword: "Skjul passord",
    loading: "Laster…",
    nextSlide: "Neste lysbilde",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ingen alternativer valgt";
        } else if (number === 1) {
            return "Ett alternativ valgt";
        } else {
            return `${number} alternativer valgt`;
        }
    },
    pickAColorFromTheScreen: "Velg en farge fra skjermen",
    previousSlide: "Forrige lysbilde",
    progress: "Fremdrift",
    remove: "Fjern",
    resize: "Endre størrelse",
    scrollableRegion: "Rullbart område",
    scrollToEnd: "Rull til slutten",
    scrollToStart: "Rull til starten",
    showPassword: "Vis passord",
    slideNum: (slide) => `Lysbilde ${slide}`,
    toggleColorFormat: "Bytt fargeformat",
};

registerTranslation(translation);

export default translation;
