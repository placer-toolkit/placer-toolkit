import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "kk-Latn",
    $name: "Qazaqşa",
    $dir: "ltr",

    captions: "Subtitrler",
    carousel: "Karusel",
    clearEntry: "Jazbany tazalau",
    close: "Jabu",
    controls: "Basqarw elementteri",
    copied: "Köşırıldı!",
    copy: "Köşıru",
    currentValue: "Ağymdağy män",
    enterFullScreen: "Tolıq ekran",
    error: "Qate",
    exitFullScreen: "Tolıq ekrannan şığw",
    goToSlide: (slide, count) => `${count}‐den ${slide}‐slaidqa ötu`,
    hidePassword: "Qūpia sözdı jasyru",
    hue: "Tüs reñı",
    loading: "Jüktelude…",
    maximumValue: "Maksimaldy män",
    maximumValueDescriptive: (label) => `${label} (maksimaldy)`,
    minimumValue: "Minimaldy män",
    minimumValueDescriptive: (label) => `${label} (minimaldy)`,
    mute: "Dıbıstı öşirw",
    nextSlide: "Kelesı slaid",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Eşqandai opsia tañdalmady";
        } else {
            return `${number} opsia tañdaldy`;
        }
    },
    off: "Öşirwli",
    opacity: "Möldırsızdık",
    pause: "Pawza",
    pickAColorFromTheScreen: "Ékrannan tüs tañdau",
    pictureInPicture: "Swrettegi swret",
    play: "Oynatw",
    playbackSpeed: "Oynatw jıldamdığı",
    previousSlide: "Aldyñğy slaid",
    progress: "Progress",
    remove: "Öşıru",
    resize: "Ölşemın özgertu",
    scrollableRegion: "Ainaldyrylatyn aimaq",
    scrollToEnd: "Soñyna dein ainaldyru",
    scrollToStart: "Basyna dein ainaldyru",
    seek: "İzdew",
    settings: "Parametrler",
    showPassword: "Qūpia sözdı körsetu",
    slideNum: (slide) => `${slide}‐slaid`,
    toggleColorFormat: "Tüs formatyn auystyru",
    track: (track) => `Jol ${track}`,
    unmute: "Dıbıstı qosw",
    videoPlayer: "Beyne oynatqış",
    volume: "Dıbıs deñgeyi",
};

registerTranslation(translation);

export default translation;
