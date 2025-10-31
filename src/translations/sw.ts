import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sw",
    $name: "Kiswahili",
    $dir: "ltr",

    carousel: "Jukwaa la picha",
    clearEntry: "Futa ingizo",
    close: "Funga",
    copied: "Imenakiliwa!",
    copy: "Nakili",
    currentValue: "Thamani ya sasa",
    error: "Hitilafu",
    goToSlide: (slide, count) =>
        `Nenda kwenye slaidi ${slide} kati ya ${count}`,
    hidePassword: "Ficha nenosiri",
    loading: "Inapakia…",
    nextSlide: "Slaidi inayofuata",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Hakuna chaguo zilizochaguliwa";
        } else if (number === 1) {
            return "Chaguo moja limechaguliwa";
        } else {
            return `Chaguo ${number} zimechaguliwa`;
        }
    },
    pickAColorFromTheScreen: "Chagua rangi kutoka kwenye skrini",
    previousSlide: "Slaidi iliyopita",
    progress: "Maendeleo",
    remove: "Ondoa",
    resize: "Badilisha ukubwa",
    scrollableRegion: "Eneo linaloweza kusogeza",
    scrollToEnd: "Sogeza hadi mwisho",
    scrollToStart: "Sogeza hadi mwanzo",
    showPassword: "Onyesha nenosiri",
    slideNum: (slide) => `Slaidi ${slide}`,
    toggleColorFormat: "Badilisha umbizo la rangi",
};

registerTranslation(translation);

export default translation;
