import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "fo",
    $name: "Føroyskt",
    $dir: "ltr",

    carousel: "Karusell",
    clearEntry: "Strika inntøku",
    close: "Lat aftur",
    copied: "Kopierað!",
    copy: "Kopiera",
    currentValue: "Núverandi virði",
    error: "Feilur",
    goToSlide: (slide, count) => `Far til myndaflok ${slide} av ${count}`,
    hidePassword: "Fjal loyniorð",
    hue: "Litútónn",
    loading: "Løðir…",
    maximumValue: "Maks",
    maximumValueDescriptive: (label) => `${label} (min)`,
    minimumValue: "Min",
    minimumValueDescriptive: (label) => `${label} (maks)`,
    nextSlide: "Næsti myndaflokkur",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Einki val er valt";
        } else if (number === 1) {
            return "Eitt val er valt";
        } else {
            return `${number} val eru vald`;
        }
    },
    opacity: "Gjøgnumsæi",
    pickAColorFromTheScreen: "Vel ein lit av skíggjanum",
    previousSlide: "Fyrri myndaflokkur",
    progress: "Framgongd",
    remove: "Strika",
    resize: "Broyt stødd",
    scrollableRegion: "Rullandi øki",
    scrollToEnd: "Rulla til enda",
    scrollToStart: "Rulla til byrjan",
    showPassword: "Vís loyniorð",
    slideNum: (slide) => `Myndaflokkur ${slide}`,
    toggleColorFormat: "Skifta litarsnið",
};

registerTranslation(translation);

export default translation;
