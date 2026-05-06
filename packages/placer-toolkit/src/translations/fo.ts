import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "fo",
    $name: "Føroyskt",
    $dir: "ltr",

    captions: "Undirtekstir",
    carousel: "Karusell",
    clearEntry: "Strika inntøku",
    close: "Lat aftur",
    controls: "Stýring",
    copied: "Kopierað!",
    copy: "Kopiera",
    currentValue: "Núverandi virði",
    enterFullScreen: "Fullur skíggi",
    error: "Feilur",
    exitFullScreen: "Skift frá fullum skíggja",
    goToSlide: (slide, count) => `Far til myndaflok ${slide} av ${count}`,
    hidePassword: "Fjal loyniorð",
    hue: "Litútónn",
    loading: "Løðir…",
    maximumValue: "Maks",
    maximumValueDescriptive: (label) => `${label} (min)`,
    minimumValue: "Min",
    minimumValueDescriptive: (label) => `${label} (maks)`,
    mute: "Ljóð av",
    nextSlide: "Næsti myndaflokkur",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Einki val er valt";
        } else if (number === 1) {
            return "Eitt val er valt";
        } else {
            return `${number} val eru vald`;
        }
    },
    off: "Av",
    opacity: "Gjøgnumsæi",
    pause: "Steðga",
    pickAColorFromTheScreen: "Vel ein lit av skíggjanum",
    pictureInPicture: "Mynd‐í—mynd",
    play: "Spæl",
    playbackSpeed: "Spæliferð",
    previousSlide: "Fyrri myndaflokkur",
    progress: "Framgongd",
    remove: "Strika",
    resize: "Broyt stødd",
    scrollableRegion: "Rullandi øki",
    scrollToEnd: "Rulla til enda",
    scrollToStart: "Rulla til byrjan",
    seek: "Leita",
    settings: "Stillingar",
    showPassword: "Vís loyniorð",
    slideNum: (slide) => `Myndaflokkur ${slide}`,
    toggleColorFormat: "Skifta litarsnið",
    track: (track) => `Spor ${track}`,
    unmute: "Ljóð á",
    videoPlayer: "Videospælari",
    volume: "Ljóðstyrki",
};

registerTranslation(translation);

export default translation;
