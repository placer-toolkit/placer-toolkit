import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "lb",
    $name: "lëtzebuergesch",
    $dir: "ltr",

    carousel: "karusell",
    clearEntry: "agab ewechhuelen",
    close: "zoumaachen",
    copied: "kopéiert!",
    copy: "kopéieren",
    currentValue: "aktuellen wäert",
    error: "feeler",
    goToSlide: (slide, count) => `gitt op d’säit ${slide} vun ${count}`,
    hidePassword: "passwuert verstoppen",
    hue: "faarftoun",
    loading: "lueden…",
    maximumValue: "maximum",
    maximumValueDescriptive: (label) => `${label} (maximum)`,
    minimumValue: "minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    nextSlide: "nächst säit",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "keng optiounen ausgewielt";
        } else if (number === 1) {
            return "eng optioun ausgewielt";
        } else {
            return `${number} optiounen ausgewielt`;
        }
    },
    opacity: "duerchsichtegkeet",
    pickAColorFromTheScreen: "faarf vum bildschierm wielen",
    previousSlide: "vireg säit",
    progress: "fortschrëtt",
    remove: "ewechhuelen",
    resize: "gréisst änneren",
    scrollableRegion: "scrollberäich",
    scrollToEnd: "bis zum schluss scrollen",
    scrollToStart: "bis zum ufank scrollen",
    showPassword: "passwuert weisen",
    slideNum: (slide) => `säit ${slide}`,
    toggleColorFormat: "faarfformaat änneren",
};

registerTranslation(translation);

export default translation;
