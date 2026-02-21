import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "eu",
    $name: "Euskara",
    $dir: "ltr",

    carousel: "Karrusela",
    clearEntry: "Garbitu sarrera",
    close: "Itxi",
    copied: "Kopiatuta!",
    copy: "Kopiatu",
    currentValue: "Uneko balioa",
    error: "Errorea",
    goToSlide: (slide, count) => `Joan ${slide}. diapositibara, ${count}‐etik`,
    hidePassword: "Ezkutatu pasahitza",
    hue: "Kolore‐tona",
    loading: "Kargatzen…",
    maximumValue: "Maximo",
    maximumValueDescriptive: (label) => `${label} (maximo)`,
    minimumValue: "Minimo",
    minimumValueDescriptive: (label) => `${label} (minimo)`,
    nextSlide: "Hurrengo diapositiba",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ez dago aukera hautaturik";
        } else if (number === 1) {
            return "Aukera bat hautatuta";
        } else {
            return `${number} aukera hautatuta`;
        }
    },
    opacity: "Opakutasuna",
    pickAColorFromTheScreen: "Hautatu kolore bat pantailatik",
    previousSlide: "Aurreko diapositiba",
    progress: "Aurrerapena",
    remove: "Ezabatu",
    resize: "Tamainaz aldatu",
    scrollableRegion: "Korrigarri eskualdea",
    scrollToEnd: "Korritu amaierara",
    scrollToStart: "Korritu hasierara",
    showPassword: "Erakutsi pasahitza",
    slideNum: (slide) => `${slide}. diapositiba`,
    toggleColorFormat: "Aldatu kolore formatua",
};

registerTranslation(translation);

export default translation;
