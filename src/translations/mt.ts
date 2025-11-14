import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "mt",
    $name: "Malti",
    $dir: "ltr",

    carousel: "Karosell",
    clearEntry: "Neħħi d‐dħul",
    close: "Agħlaq",
    copied: "Ikkupjat!",
    copy: "Ikkopja",
    currentValue: "Valur kurrenti",
    error: "Żball",
    goToSlide: (slide, count) => `Mur fuq is‐slajd ${slide} minn ${count}`,
    hidePassword: "Aħbi l‐password",
    hue: "Ton ta’ kulur",
    loading: "Tagħbija…",
    nextSlide: "Slajd li jmiss",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "L‐ebda għażla magħżula";
        } else if (number === 1) {
            return "Għażla waħda magħżula";
        } else {
            return `${number} għażliet magħżula`;
        }
    },
    opacity: "Opaċità",
    pickAColorFromTheScreen: "Agħżel kulur mill‐iskrin",
    previousSlide: "Slajd preċedenti",
    progress: "Progress",
    remove: "Neħħi",
    resize: "Ibdel id‐daqs",
    scrollableRegion: "Reġjun li jitħarreġ",
    scrollToEnd: "Ħarreġ sal‐aħħar",
    scrollToStart: "Ħarreġ sal‐bidu",
    showPassword: "Uri l‐password",
    slideNum: (slide) => `Slajd ${slide}`,
    toggleColorFormat: "Aqleb il‐format tal‐kulur",
};

registerTranslation(translation);

export default translation;
