import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "pa",
    $name: "ਪੰਜਾਬੀ",
    $dir: "ltr",

    captions: "ਕੈਪਸ਼ਨ",
    carousel: "ਕੈਰੋਸਲ",
    clearEntry: "ਐਂਟਰੀ ਸਾਫ਼ ਕਰੋ",
    close: "ਬੰਦ ਕਰੋ",
    controls: "ਕੰਟਰੋਲ",
    copied: "ਕਾਪੀ ਕੀਤਾ ਗਿਆ!",
    copy: "ਕਾਪੀ ਕਰੋ",
    currentValue: "ਮੌਜੂਦਾ ਮੁੱਲ",
    enterFullScreen: "ਫੁੱਲ ਸਕ੍ਰੀਨ",
    error: "ਗਲਤੀ",
    exitFullScreen: "ਫੁੱਲ ਸਕ੍ਰੀਨ ਤੋਂ ਬਾਹਰ",
    goToSlide: (slide, count) => `ਸਲਾਈਡ ${slide} 'ਤੇ ਜਾਓ ${count} ਵਿੱਚੋਂ`,
    hidePassword: "ਪਾਸਵਰਡ ਲੁਕਾਓ",
    hue: "ਰੰਗ ਟੋਨ",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ…",
    maximumValue: "ਵੱਧ ਤੋਂ ਵੱਧ",
    maximumValueDescriptive: (label) => `${label} (ਵੱਧ ਤੋਂ ਵੱਧ ਵੈਲਯੂ)`,
    minimumValue: "ਘੱਟ ਤੋਂ ਘੱਟ",
    minimumValueDescriptive: (label) => `${label} (ਘੱਟ ਤੋਂ ਘੱਟ ਵੈਲਯੂ)`,
    mute: "ਮਿਊਟ",
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
    off: "ਬੰਦ",
    opacity: "ਅਪਾਰਦਰਸ਼ਤਾ",
    pause: "ਰੋਕੋ",
    pickAColorFromTheScreen: "ਸਕ੍ਰੀਨ ਤੋਂ ਇੱਕ ਰੰਗ ਚੁਣੋ",
    pictureInPicture: "ਪਿਕਚਰ ਇਨ ਪਿਕਚਰ",
    play: "ਚਲਾਓ",
    playbackSpeed: "ਪਲੇਬੈਕ ਗਤੀ",
    previousSlide: "ਪਿਛਲੀ ਸਲਾਈਡ",
    progress: "ਤਰੱਕੀ",
    remove: "ਹਟਾਓ",
    resize: "ਆਕਾਰ ਬਦਲੋ",
    scrollableRegion: "ਸਕਰੋਲ ਕਰਨ ਯੋਗ ਖੇਤਰ",
    scrollToEnd: "ਅੰਤ ਤੱਕ ਸਕਰੋਲ ਕਰੋ",
    scrollToStart: "ਸ਼ੁਰੂਆਤ ਤੱਕ ਸਕਰੋਲ ਕਰੋ",
    seek: "ਖੋਜੋ",
    settings: "ਸੈਟਿੰਗਾਂ",
    showPassword: "ਪਾਸਵਰਡ ਦਿਖਾਓ",
    slideNum: (slide) => `ਸਲਾਈਡ ${slide}`,
    toggleColorFormat: "ਰੰਗ ਦਾ ਫਾਰਮੈਟ ਬਦਲੋ",
    track: (track) => `ਟਰੈਕ ${track}`,
    unmute: "ਅਨਮਿਊਟ",
    videoPlayer: "ਵੀਡੀਓ ਪਲੇਅਰ",
    volume: "ਆਵਾਜ਼",
};

registerTranslation(translation);

export default translation;
