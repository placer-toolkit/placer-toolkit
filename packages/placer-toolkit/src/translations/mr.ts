import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "mr",
    $name: "मराठी",
    $dir: "ltr",

    captions: "कॅप्शन",
    carousel: "कॅरोसेल",
    clearEntry: "एन्ट्री साफ करा",
    close: "बंद करा",
    controls: "नियंत्रणे",
    copied: "कॉपी केले!",
    copy: "कॉपी करा",
    currentValue: "सध्याचे मूल्य",
    enterFullScreen: "पूर्ण स्क्रीन",
    error: "त्रुटी",
    exitFullScreen: "पूर्ण स्क्रीनमधून बाहेर पडा",
    goToSlide: (slide, count) => `${count} पैकी स्लाइड ${slide} वर जा`,
    hidePassword: "पासवर्ड लपवा",
    hue: "रंग छटा",
    loading: "लोड होत आहे…",
    maximumValue: "कमाल",
    maximumValueDescriptive: (label) => `${label} (कमाल मूल्य)`,
    minimumValue: "किमान",
    minimumValueDescriptive: (label) => `${label} (किमान मूल्य)`,
    mute: "म्यूट",
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
    off: "बंद",
    opacity: "अस्पष्टता",
    pause: "विराम",
    pickAColorFromTheScreen: "स्क्रीनमधून एक रंग निवडा",
    pictureInPicture: "पिक्चर इन पिक्चर",
    play: "प्ले करा",
    playbackSpeed: "प्लेबॅक गती",
    previousSlide: "मागील स्लाइड",
    progress: "प्रगती",
    remove: "काढा",
    resize: "आकार बदला",
    scrollableRegion: "स्क्रोल करण्यायोग्य क्षेत्र",
    scrollToEnd: "शेवटपर्यंत स्क्रोल करा",
    scrollToStart: "सुरुवातीला स्क्रोल करा",
    seek: "शोधा",
    settings: "सेटिंग्ज",
    showPassword: "पासवर्ड दाखवा",
    slideNum: (slide) => `स्लाइड ${slide}`,
    toggleColorFormat: "रंग स्वरूप बदला",
    track: (track) => `ट्रॅक ${track}`,
    unmute: "आवाज सुरू करा",
    videoPlayer: "व्हिडिओ प्लेयर",
    volume: "आवाज",
};

registerTranslation(translation);

export default translation;
