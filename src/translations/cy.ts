import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "cy",
    $name: "Cymraeg",
    $dir: "ltr",

    carousel: "Carwsél",
    clearEntry: "Clirio cofnod",
    close: "Cau",
    copied: "Copïwyd!",
    copy: "Copïo",
    currentValue: "Gwerth cyfredol",
    error: "Gwall",
    goToSlide: (slide, count) => `Ewch i sleid ${slide} o ${count}`,
    hidePassword: "Cuddio cyfrinair",
    loading: "Llwytho…",
    nextSlide: "Sleid nesaf",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Dim opsiynau wedi’u dewis";
        } else if (number === 1) {
            return "Un opsiwn wedi’i ddewis";
        } else {
            return `${number} opsiwn wedi’u dewis`;
        }
    },
    pickAColorFromTheScreen: "Dewiswch liw o’r sgrin",
    previousSlide: "Sleid flaenorol",
    progress: "Cynnydd",
    remove: "Dileu",
    resize: "Ailosod maint",
    scrollableRegion: "Rhanbarth sgroliadwy",
    scrollToEnd: "Sgroliwch i’r diwedd",
    scrollToStart: "Sgroliwch i’r dechrau",
    showPassword: "Dangos cyfrinair",
    slideNum: (slide) => `Sleid ${slide}`,
    toggleColorFormat: "Toglo fformat lliw",
};

registerTranslation(translation);

export default translation;
