import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "cy",
    $name: "Cymraeg",
    $dir: "ltr",

    captions: "Penawdau",
    carousel: "Carwsél",
    clearEntry: "Clirio cofnod",
    close: "Cau",
    controls: "Rheolyddion",
    copied: "Copïwyd!",
    copy: "Copïo",
    currentValue: "Gwerth cyfredol",
    enterFullScreen: "Sgrin lawn",
    error: "Gwall",
    exitFullScreen: "Gadael sgrin lawn",
    goToSlide: (slide, count) => `Ewch i sleid ${slide} o ${count}`,
    hidePassword: "Cuddio cyfrinair",
    hue: "Tôn lliw",
    loading: "Llwytho…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Mudo",
    nextSlide: "Sleid nesaf",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Dim opsiynau wedi’u dewis";
        } else if (number === 1) {
            return "Un opsiwn wedi’i ddewis";
        } else {
            return `${number} opsiwn wedi’u dewis`;
        }
    },
    off: "Diffodd",
    opacity: "Tryloywder",
    pause: "Oedi",
    pickAColorFromTheScreen: "Dewiswch liw o’r sgrin",
    pictureInPicture: "Llun‐mewn‐llun",
    play: "Chwarae",
    playbackSpeed: "Cyflymder chwarae",
    previousSlide: "Sleid flaenorol",
    progress: "Cynnydd",
    remove: "Dileu",
    resize: "Ailosod maint",
    scrollableRegion: "Rhanbarth sgroliadwy",
    scrollToEnd: "Sgroliwch i’r diwedd",
    scrollToStart: "Sgroliwch i’r dechrau",
    seek: "Chwilio",
    settings: "Gosodiadau",
    showPassword: "Dangos cyfrinair",
    slideNum: (slide) => `Sleid ${slide}`,
    toggleColorFormat: "Toglo fformat lliw",
    track: (track) => `Trac ${track}`,
    unmute: "Dad‐fudo",
    videoPlayer: "Chwaraewr fideo",
    volume: "Lefel sain",
};

registerTranslation(translation);

export default translation;
