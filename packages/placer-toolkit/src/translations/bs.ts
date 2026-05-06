import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "bs",
    $name: "Bosanski",
    $dir: "ltr",

    captions: "Titlovi",
    carousel: "Vrtuljak",
    clearEntry: "Obriši unos",
    close: "Zatvori",
    controls: "Kontrole",
    copied: "Kopirano!",
    copy: "Kopiraj",
    currentValue: "Trenutna vrijednost",
    enterFullScreen: "Cijeli zaslon",
    error: "Greška",
    exitFullScreen: "Izađi iz cijelog zaslona",
    goToSlide: (slide, count) => `Idi na slajd ${slide} od ${count}`,
    hidePassword: "Sakrij lozinku",
    hue: "Ton boje",
    loading: "Učitavam…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Isključi zvuk",
    nextSlide: "Sljedeći slajd",
    numOptionsSelected: (number) => {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        if (number === 0) {
            return "Odabrano je 0 opcija";
        } else if (number === 1) {
            return "Odabrana je jedna opcija";
        } else if (
            lastDigit >= 2 &&
            lastDigit <= 4 &&
            !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
        ) {
            return `Odabrane su ${number} opcije`;
        } else {
            return `Odabrano je ${number} opcija`;
        }
    },
    off: "Isklj.",
    opacity: "Providnost",
    pause: "Pauza",
    pickAColorFromTheScreen: "Odaberite boju sa zaslona",
    pictureInPicture: "Slika u slici",
    play: "Reproduciraj",
    playbackSpeed: "Brzina reprodukcije",
    previousSlide: "Prethodni slajd",
    progress: "Napredak",
    remove: "Ukloni",
    resize: "Promijeni veličinu",
    scrollableRegion: "Pomakajuće područje",
    scrollToEnd: "Pomakni do kraja",
    scrollToStart: "Pomakni na početak",
    seek: "Traži",
    settings: "Postavke",
    showPassword: "Prikaži lozinku",
    slideNum: (slide) => `Slajd ${slide}`,
    toggleColorFormat: "Prebaci format boje",
    track: (track) => `Zapis ${track}`,
    unmute: "Uključi zvuk",
    videoPlayer: "Video player",
    volume: "Glasnoća",
};

registerTranslation(translation);

export default translation;
