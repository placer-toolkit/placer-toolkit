import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "kk-Latn",
    $name: "Qazaqşa",
    $dir: "ltr",

    carousel: "Karusel",
    clearEntry: "Jazbany tazalau",
    close: "Jabu",
    copied: "Köşırıldı!",
    copy: "Köşıru",
    currentValue: "Ağymdağy män",
    error: "Qate",
    goToSlide: (slide, count) => `${count}‐den ${slide}‐slaidqa ötu`,
    hidePassword: "Qūpia sözdı jasyru",
    hue: "Tüs reñı",
    loading: "Jüktelude…",
    maximumValue: "Maksimaldy män",
    maximumValueDescriptive: (label) => `${label} (maksimaldy)`,
    minimumValue: "Minimaldy män",
    minimumValueDescriptive: (label) => `${label} (minimaldy)`,
    nextSlide: "Kelesı slaid",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Eşqandai opsia tañdalmady";
        } else {
            return `${number} opsia tañdaldy`;
        }
    },
    opacity: "Möldırsızdık",
    pickAColorFromTheScreen: "Ékrannan tüs tañdau",
    previousSlide: "Aldyñğy slaid",
    progress: "Progress",
    remove: "Öşıru",
    resize: "Ölşemın özgertu",
    scrollableRegion: "Ainaldyrylatyn aimaq",
    scrollToEnd: "Soñyna dein ainaldyru",
    scrollToStart: "Basyna dein ainaldyru",
    showPassword: "Qūpia sözdı körsetu",
    slideNum: (slide) => `${slide}‐slaid`,
    toggleColorFormat: "Tüs formatyn auystyru",
};

registerTranslation(translation);

export default translation;
