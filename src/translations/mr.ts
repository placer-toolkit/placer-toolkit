import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "mr",
    $name: "मराठी",
    $dir: "ltr",

    carousel: "कॅरोसेल",
    clearEntry: "एन्ट्री साफ करा",
    close: "बंद करा",
    copied: "कॉपी केले!",
    copy: "कॉपी करा",
    currentValue: "सध्याचे मूल्य",
    error: "त्रुटी",
    goToSlide: (slide, count) => `${count} पैकी स्लाइड ${slide} वर जा`,
    hidePassword: "पासवर्ड लपवा",
    hue: "रंग छटा",
    loading: "लोड होत आहे…",
    nextSlide: "पुढील स्लाइड",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "कोणतेही पर्याय निवडलेले नाहीत";
        } else if (number === 1) {
            return "एक पर्याय निवडला";
        } else {
            return `${number} पर्याय निवडलेले`;
        }
    },
    opacity: "अस्पष्टता",
    pickAColorFromTheScreen: "स्क्रीनमधून एक रंग निवडा",
    previousSlide: "मागील स्लाइड",
    progress: "प्रगती",
    remove: "काढा",
    resize: "आकार बदला",
    scrollableRegion: "स्क्रोल करण्यायोग्य क्षेत्र",
    scrollToEnd: "शेवटपर्यंत स्क्रोल करा",
    scrollToStart: "सुरुवातीला स्क्रोल करा",
    showPassword: "पासवर्ड दाखवा",
    slideNum: (slide) => `स्लाइड ${slide}`,
    toggleColorFormat: "रंग स्वरूप बदला",
};

registerTranslation(translation);

export default translation;
