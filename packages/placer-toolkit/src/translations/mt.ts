import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "mt",
    $name: "Malti",
    $dir: "ltr",

    captions: "Sottotitoli",
    carousel: "Karosell",
    clearEntry: "Neħħi d‐dħul",
    close: "Agħlaq",
    controls: "Kontrolli",
    copied: "Ikkupjat!",
    copy: "Ikkopja",
    currentValue: "Valur kurrenti",
    enterFullScreen: "Skrin sħiħ",
    error: "Żball",
    exitFullScreen: "Ħruġ minn skrin sħiħ",
    goToSlide: (slide, count) => `Mur fuq is‐slajd ${slide} minn ${count}`,
    hidePassword: "Aħbi l‐password",
    hue: "Ton ta’ kulur",
    loading: "Tagħbija…",
    maximumValue: "Massimu",
    maximumValueDescriptive: (label) => `${label} (massimu)`,
    minimumValue: "Minimu",
    minimumValueDescriptive: (label) => `${label} (minimu)`,
    mute: "Muta",
    nextSlide: "Slajd li jmiss",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "L‐ebda għażla magħżula";
        } else if (number === 1) {
            return "Għażla waħda magħżula";
        } else {
            return `${number} għażliet magħżula`;
        }
    },
    off: "Mitfi",
    opacity: "Opaċità",
    pause: "Pawża",
    pickAColorFromTheScreen: "Agħżel kulur mill‐iskrin",
    pictureInPicture: "Stampa fi stampa",
    play: "Iddoqq",
    playbackSpeed: "Veloċità tal‐plejbek",
    previousSlide: "Slajd preċedenti",
    progress: "Progress",
    remove: "Neħħi",
    resize: "Ibdel id‐daqs",
    scrollableRegion: "Reġjun li jitħarreġ",
    scrollToEnd: "Ħarreġ sal‐aħħar",
    scrollToStart: "Ħarreġ sal‐bidu",
    seek: "Fittex",
    settings: "Settings",
    showPassword: "Uri l‐password",
    slideNum: (slide) => `Slajd ${slide}`,
    toggleColorFormat: "Aqleb il‐format tal‐kulur",
    track: (track) => `Track ${track}`,
    unmute: "Attiva l‐ħoss",
    videoPlayer: "Video player",
    volume: "Volum",
};

registerTranslation(translation);

export default translation;
