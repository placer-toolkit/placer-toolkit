import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "pa-guru",
    $name: "ਪੰਜਾਬੀ (ਗੁਰਮੁਖੀ)",
    $dir: "ltr",

    carousel: "ਕੈਰੋਸਲ",
    clearEntry: "ਐਂਟਰੀ ਸਾਫ਼ ਕਰੋ",
    close: "ਬੰਦ ਕਰੋ",
    copied: "ਕਾਪੀ ਕੀਤਾ ਗਿਆ!",
    copy: "ਕਾਪੀ ਕਰੋ",
    currentValue: "ਮੌਜੂਦਾ ਮੁੱਲ",
    error: "ਗਲਤੀ",
    goToSlide: (slide, count) => `ਸਲਾਈਡ ${slide} 'ਤੇ ਜਾਓ ${count} ਵਿੱਚੋਂ`,
    hidePassword: "ਪਾਸਵਰਡ ਲੁਕਾਓ",
    hue: "ਰੰਗ ਟੋਨ",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ…",
    maximumValue: "ਵੱਧ ਤੋਂ ਵੱਧ",
    maximumValueDescriptive: (label) => `${label} (ਵੱਧ ਤੋਂ ਵੱਧ ਵੈਲਯੂ)`,
    minimumValue: "ਘੱਟ ਤੋਂ ਘੱਟ",
    minimumValueDescriptive: (label) => `${label} (ਘੱਟ ਤੋਂ ਘੱਟ ਵੈਲਯੂ)`,
    nextSlide: "ਅਗਲੀ ਸਲਾਈਡ",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "ਕੋਈ ਵਿਕਲਪ ਨਹੀਂ ਚੁਣਿਆ ਗਿਆ";
        } else if (number === 1) {
            return "ਇੱਕ ਵਿਕਲਪ ਚੁਣਿਆ ਗਿਆ";
        } else {
            return `${number} ਵਿਕਲਪ ਚੁਣੇ ਗਏ`;
        }
    },
    opacity: "ਅਪਾਰਦਰਸ਼ਤਾ",
    pickAColorFromTheScreen: "ਸਕ੍ਰੀਨ ਤੋਂ ਇੱਕ ਰੰਗ ਚੁਣੋ",
    previousSlide: "ਪਿਛਲੀ ਸਲਾਈਡ",
    progress: "ਤਰੱਕੀ",
    remove: "ਹਟਾਓ",
    resize: "ਆਕਾਰ ਬਦਲੋ",
    scrollableRegion: "ਸਕਰੋਲ ਕਰਨ ਯੋਗ ਖੇਤਰ",
    scrollToEnd: "ਅੰਤ ਤੱਕ ਸਕਰੋਲ ਕਰੋ",
    scrollToStart: "ਸ਼ੁਰੂਆਤ ਤੱਕ ਸਕਰੋਲ ਕਰੋ",
    showPassword: "ਪਾਸਵਰਡ ਦਿਖਾਓ",
    slideNum: (slide) => `ਸਲਾਈਡ ${slide}`,
    toggleColorFormat: "ਰੰਗ ਦਾ ਫਾਰਮੈਟ ਬਦਲੋ",
};

registerTranslation(translation);

export default translation;
