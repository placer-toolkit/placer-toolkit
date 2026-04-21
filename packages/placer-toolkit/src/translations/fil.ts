import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "fil",
    $name: "Filipino",
    $dir: "ltr",

    captions: "Mga caption",
    carousel: "Karusel",
    clearEntry: "I‐clear ang entry",
    close: "Isara",
    controls: "Mga kontrol",
    copied: "Nakopya!",
    copy: "Kopyahin",
    currentValue: "Kasalukuyang halaga",
    enterFullScreen: "I‐fullscreen",
    error: "Error",
    exitFullScreen: "Lumabas sa Fullscreen",
    goToSlide: (slide, count) => `Pumunta sa slide ${slide} ng ${count}`,
    hidePassword: "Itago ang password",
    hue: "Tono ng kulay",
    loading: "Naglo‐load…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "I‐mute",
    nextSlide: "Susunod na slide",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Walang napiling mga opsyon";
        } else if (number === 1) {
            return "Isang opsyon ang napili";
        } else {
            return `${number} opsyon ang napili`;
        }
    },
    off: "Naka‐off",
    opacity: "Opacity",
    pause: "I‐pause",
    pickAColorFromTheScreen: "Pumili ng kulay mula sa screen",
    pictureInPicture: "Larawan sa loob ng larawan",
    play: "I‐play",
    playbackSpeed: "Bilis ng pag‐playback",
    previousSlide: "Nakaraang slide",
    progress: "Pag‐usad",
    remove: "Alisin",
    resize: "Palitan ang laki",
    scrollableRegion: "Maaaring i‐scroll na rehiyon",
    scrollToEnd: "Mag‐scroll sa dulo",
    scrollToStart: "Mag‐scroll sa simula",
    seek: "Maghanap",
    settings: "Mga setting",
    showPassword: "Ipakita ang password",
    slideNum: (slide) => `Slide ${slide}`,
    toggleColorFormat: "I‐toggle ang format ng kulay",
    track: (track) => `Track ${track}`,
    unmute: "I‐unmute",
    videoPlayer: "Video Player",
    volume: "Lakas ng tunog",
};

registerTranslation(translation);

export default translation;
