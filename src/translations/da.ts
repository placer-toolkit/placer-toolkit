import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "da",
    $name: "Dansk",
    $dir: "ltr",

    carousel: "Karrusel",
    clearEntry: "Ryd indtastning",
    close: "Luk",
    copied: "Kopieret!",
    copy: "Kopier",
    currentValue: "Nuværende værdi",
    error: "Fejl",
    goToSlide: (slide, count) => `Gå til dias ${slide} af ${count}`,
    hidePassword: "Skjul adgangskode",
    hue: "Farvetone",
    loading: "Indlæser…",
    maximumValue: "Maksimum",
    maximumValueDescriptive: (label) => `${label} (Maksimum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (Minimum)`,
    nextSlide: "Næste dias",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ingen valgt";
        } else if (number === 1) {
            return "Én valgt";
        } else {
            return `${number} valgt`;
        }
    },
    opacity: "Gennemsigtighed",
    pickAColorFromTheScreen: "Vælg en farve fra skærmen",
    previousSlide: "Forrige dias",
    progress: "Status",
    remove: "Fjern",
    resize: "Tilpas størrelse",
    scrollableRegion: "Rulleområde",
    scrollToEnd: "Scroll til slut",
    scrollToStart: "Scroll til start",
    showPassword: "Vis adgangskode",
    slideNum: (slide) => `Dias ${slide}`,
    toggleColorFormat: "Skift farveformat",
};

registerTranslation(translation);

export default translation;
