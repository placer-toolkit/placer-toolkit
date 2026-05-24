import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "hi",
    $name: "हिन्दी",
    $dir: "ltr",

    captions: "उपशीर्षক",
    carousel: "कैरोसेल",
    clearEntry: "एंट्री साफ़ करें",
    close: "बंद करें",
    controls: "नियंत्रण",
    copied: "कॉपी हो गया!",
    copy: "कॉपी करें",
    currentValue: "वर्तमान मान",
    enterFullScreen: "पूर्ण स्क्रीन",
    error: "त्रुटि",
    exitFullScreen: "पूर्ण स्क्रीन से बाहर निकलें",
    goToSlide: (slide, count) =>
        `${count} स्लाइड में से स्लाइड ${slide} पर जाएँ`,
    hidePassword: "पासवर्ड छुपाएँ",
    hue: "रंग छटा",
    loading: "लोड हो रहा है…",
    maximumValue: "अधिकतम",
    maximumValueDescriptive: (label) => `${label} (अधिकतम मान)`,
    minimumValue: "न्यूनतम",
    minimumValueDescriptive: (label) => `${label} (न्यूनतम मान)`,
    mute: "म्यूट करें",
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
    off: "बंद",
    opacity: "अपारदर्शिता",
    pause: "रोकें",
    pickAColorFromTheScreen: "स्क्रीन से रंग चुनें",
    pictureInPicture: "पिक्चर इन पिक्चर",
    play: "चलाएँ",
    playbackSpeed: "प्लेबैक दर",
    previousSlide: "पिछली स्लाइड",
    progress: "प्रगति",
    remove: "हटाएँ",
    resize: "आकार बदलें",
    scrollableRegion: "स्क्रॉल करने योग्य क्षेत्र",
    scrollToEnd: "अंत तक स्क्रॉल करें",
    scrollToStart: "शुरुआत तक स्क्रॉल करें",
    seek: "ढूँढें",
    settings: "सेटिंग",
    showPassword: "पासवर्ड दिखाएँ",
    slideNum: (slide) => `स्लाइड ${slide}`,
    toggleColorFormat: "रंग प्रारूप बदलें",
    track: (track) => `ट्रैक ${track}`,
    unmute: "म्यूट हटाएँ",
    videoPlayer: "वीडियो प्लेयर",
    volume: "आवाज़",
};

registerTranslation(translation);

export default translation;
