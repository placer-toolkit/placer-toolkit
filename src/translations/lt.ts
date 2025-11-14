import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "lt",
    $name: "Lietuvių",
    $dir: "ltr",

    carousel: "Karoselė",
    clearEntry: "Išvalyti įrašą",
    close: "Uždaryti",
    copied: "Nukopijuota!",
    copy: "Kopijuoti",
    currentValue: "Dabartinė reikšmė",
    error: "Klaida",
    goToSlide: (slide, count) => `Eiti į ${slide} iš ${count} skaidrę`,
    hidePassword: "Slėpti slaptažodį",
    hue: "Spalvos tonas",
    loading: "Įkeliama…",
    nextSlide: "Kita skaidrė",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Pasirinkta 0 parinkčių";
        } else if (number === 1) {
            return "Pasirinkta viena parinktis";
        } else {
            return `${number} parinktys pasirinktos`;
        }
    },
    opacity: "Nepermatomumas",
    pickAColorFromTheScreen: "Pasirinkite spalvą iš ekrano",
    previousSlide: "Ankstesnė skaidrė",
    progress: "Eiga",
    remove: "Pašalinti",
    resize: "Pakeisti dydį",
    scrollableRegion: "Slenkamas regionas",
    scrollToEnd: "Slinkti į pabaigą",
    scrollToStart: "Slinkti į pradžią",
    showPassword: "Rodyti slaptažodį",
    slideNum: (slide) => `Skaidrė ${slide}`,
    toggleColorFormat: "Perjungti spalvų formatą",
};

registerTranslation(translation);

export default translation;
