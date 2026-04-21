import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "da",
    $name: "Dansk",
    $dir: "ltr",

    captions: "Undertekster",
    carousel: "Karrusel",
    clearEntry: "Ryd indtastning",
    close: "Luk",
    controls: "Styring",
    copied: "Kopieret!",
    copy: "Kopier",
    currentValue: "Nuværende værdi",
    enterFullScreen: "Fuldskærm",
    error: "Fejl",
    exitFullScreen: "Afslut fuldskærm",
    goToSlide: (slide, count) => `Gå til dias ${slide} af ${count}`,
    hidePassword: "Skjul adgangskode",
    hue: "Farvetone",
    loading: "Indlæser…",
    maximumValue: "Maksimum",
    maximumValueDescriptive: (label) => `${label} (Maksimum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (Minimum)`,
    mute: "Lyd fra",
    nextSlide: "Næste dias",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ingen valgt";
        } else if (number === 1) {
            return "Én valgt";
        } else {
            return `${number} valgt`;
        }
    },
    off: "Fra",
    opacity: "Gennemsigtighed",
    pause: "Pause",
    pickAColorFromTheScreen: "Vælg en farve fra skærmen",
    pictureInPicture: "Billede‐i‐billede",
    play: "Afspil",
    playbackSpeed: "Afspilningshastighed",
    previousSlide: "Forrige dias",
    progress: "Status",
    remove: "Fjern",
    resize: "Tilpas størrelse",
    scrollableRegion: "Rulleområde",
    scrollToEnd: "Scroll til slut",
    scrollToStart: "Scroll til start",
    seek: "Søg",
    settings: "Indstillinger",
    showPassword: "Vis adgangskode",
    slideNum: (slide) => `Dias ${slide}`,
    toggleColorFormat: "Skift farveformat",
    track: (track) => `Spor ${track}`,
    unmute: "Lyd til",
    videoPlayer: "Videoafspiller",
    volume: "Lydstyrke",
};

registerTranslation(translation);

export default translation;
