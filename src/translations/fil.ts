import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "fil",
    $name: "Filipino",
    $dir: "ltr",

    carousel: "Karusel",
    clearEntry: "I‐clear ang entry",
    close: "Isara",
    copied: "Nakopya!",
    copy: "Kopyahin",
    currentValue: "Kasalukuyang halaga",
    error: "Error",
    goToSlide: (slide, count) => `Pumunta sa slide ${slide} ng ${count}`,
    hidePassword: "Itago ang password",
    hue: "Tono ng kulay",
    loading: "Naglo‐load…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    nextSlide: "Susunod na slide",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Walang napiling mga opsyon";
        } else if (number === 1) {
            return "Isang opsyon ang napili";
        } else {
            return `${number} opsyon ang napili`;
        }
    },
    opacity: "Opacity",
    pickAColorFromTheScreen: "Pumili ng kulay mula sa screen",
    previousSlide: "Nakaraang slide",
    progress: "Pag‐usad",
    remove: "Alisin",
    resize: "Palitan ang laki",
    scrollableRegion: "Maaaring i‐scroll na rehiyon",
    scrollToEnd: "Mag‐scroll sa dulo",
    scrollToStart: "Mag‐scroll sa simula",
    showPassword: "Ipakita ang password",
    slideNum: (slide) => `Slide ${slide}`,
    toggleColorFormat: "I‐toggle ang format ng kulay",
};

registerTranslation(translation);

export default translation;
