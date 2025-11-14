import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "hi",
    $name: "हिन्दी",
    $dir: "ltr",

    carousel: "कैरोसेल",
    clearEntry: "एंट्री साफ़ करें",
    close: "बंद करें",
    copied: "कॉपी हो गया!",
    copy: "कॉपी करें",
    currentValue: "वर्तमान मान",
    error: "त्रुटि",
    goToSlide: (slide, count) =>
        `${count} स्लाइड में से स्लाइड ${slide} पर जाएँ`,
    hidePassword: "पासवर्ड छुपाएँ",
    hue: "रंग छटा",
    loading: "लोड हो रहा है…",
    nextSlide: "अगली स्लाइड",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "कोई विकल्प चयनित नहीं";
        } else if (number === 1) {
            return "एक विकल्प चयनित";
        } else {
            return `${number} विकल्प चयनित`;
        }
    },
    opacity: "अपारदर्शिता",
    pickAColorFromTheScreen: "स्क्रीन से रंग चुनें",
    previousSlide: "पिछली स्लाइड",
    progress: "प्रगति",
    remove: "हटाएँ",
    resize: "आकार बदलें",
    scrollableRegion: "स्क्रॉल करने योग्य क्षेत्र",
    scrollToEnd: "अंत तक स्क्रॉल करें",
    scrollToStart: "शुरुआत तक स्क्रॉल करें",
    showPassword: "पासवर्ड दिखाएँ",
    slideNum: (slide) => `स्लाइड ${slide}`,
    toggleColorFormat: "रंग प्रारूप बदलें",
};

registerTranslation(translation);

export default translation;
