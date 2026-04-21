import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "nb",
    $name: "Norsk bokmål",
    $dir: "ltr",

    captions: "Teksting",
    carousel: "Karusell",
    clearEntry: "Tøm felt",
    close: "Lukk",
    controls: "Kontroller",
    copied: "Kopiert!",
    copy: "Kopier",
    currentValue: "Nåværende verdi",
    enterFullScreen: "Fullskjerm",
    error: "Feil",
    exitFullScreen: "Avslutt fullskjerm",
    goToSlide: (slide, count) => `Gå til lysbilde ${slide} av ${count}`,
    hidePassword: "Skjul passord",
    hue: "Fargetone",
    loading: "Laster…",
    maximumValue: "Maksimum",
    maximumValueDescriptive: (label) => `${label} (maksimum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Demp",
    nextSlide: "Neste lysbilde",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ingen alternativer valgt";
        } else if (number === 1) {
            return "Ett alternativ valgt";
        } else {
            return `${number} alternativer valgt`;
        }
    },
    off: "Av",
    opacity: "Gjennomsiktighet",
    pause: "Pause",
    pickAColorFromTheScreen: "Velg en farge fra skjermen",
    pictureInPicture: "Bilde‐i‐bilde",
    play: "Spill av",
    playbackSpeed: "Avspillingshastighet",
    previousSlide: "Forrige lysbilde",
    progress: "Fremdrift",
    remove: "Fjern",
    resize: "Endre størrelse",
    scrollableRegion: "Rullbart område",
    scrollToEnd: "Rull til slutten",
    scrollToStart: "Rull til starten",
    seek: "Søk",
    settings: "Innstillinger",
    showPassword: "Vis passord",
    slideNum: (slide) => `Lysbilde ${slide}`,
    toggleColorFormat: "Bytt fargeformat",
    track: (track) => `Spor ${track}`,
    unmute: "Lyd på",
    videoPlayer: "Videospiller",
    volume: "Volum",
};

registerTranslation(translation);

export default translation;
