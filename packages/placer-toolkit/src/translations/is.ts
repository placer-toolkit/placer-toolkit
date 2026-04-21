import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "is",
    $name: "Íslenska",
    $dir: "ltr",

    captions: "Texti",
    carousel: "Myndasafn",
    clearEntry: "Hreinsa færslu",
    close: "Loka",
    controls: "Stýringar",
    copied: "Afritað!",
    copy: "Afrita",
    currentValue: "Núverandi gildi",
    enterFullScreen: "Fullur skjár",
    error: "Villa",
    exitFullScreen: "Hætta í fullum skjá",
    goToSlide: (slide, count) => `Fara á glæru ${slide} af ${count}`,
    hidePassword: "Fela lykilorð",
    hue: "Litblær",
    loading: "Hleð…",
    maximumValue: "Hámark",
    maximumValueDescriptive: (label) => `${label} (hámark)`,
    minimumValue: "Lágmark",
    minimumValueDescriptive: (label) => `${label} (lágmark)`,
    mute: "Þagga",
    nextSlide: "Næsta glæra",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Engir valkostir valdir";
        } else if (number === 1) {
            return "Einn valkostur valinn";
        } else {
            return `${number} valkostir valdir`;
        }
    },
    off: "Slökkt",
    opacity: "Ógegnsæi",
    pause: "Pása",
    pickAColorFromTheScreen: "Velja lit af skjánum",
    pictureInPicture: "Mynd‐í‐mynd",
    play: "Spila",
    playbackSpeed: "Spilunarhraði",
    previousSlide: "Fyrri glæra",
    progress: "Framvinda",
    remove: "Fjarlægja",
    resize: "Breyta stærð",
    scrollableRegion: "Skrollanlegt svæði",
    scrollToEnd: "Skrolla til enda",
    scrollToStart: "Skrolla á upphaf",
    seek: "Leita",
    settings: "Stillingar",
    showPassword: "Sýna lykilorð",
    slideNum: (slide) => `Glæra ${slide}`,
    toggleColorFormat: "Skipta um litarsnið",
    track: (track) => `Rás ${track}`,
    unmute: "Kveikja á hljóði",
    videoPlayer: "Myndbandsspilan",
    volume: "Hljóðstyrkur",
};

registerTranslation(translation);

export default translation;
