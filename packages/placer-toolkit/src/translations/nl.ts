import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "nl",
    $name: "Nederlands",
    $dir: "ltr",

    captions: "Ondertiteling",
    carousel: "Carrousel",
    clearEntry: "Invoer wissen",
    close: "Sluiten",
    controls: "Bediening",
    copied: "Gekopieerd!",
    copy: "Kopiëren",
    currentValue: "Huidige waarde",
    enterFullScreen: "Volledig scherm",
    error: "Fout",
    exitFullScreen: "Volledig scherm afsluiten",
    goToSlide: (slide, count) => `Ga naar dia ${slide} van ${count}`,
    hidePassword: "Wachtwoord verbergen",
    hue: "Kleurtint",
    loading: "Laden…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (Maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (Minimum)`,
    mute: "Dempen",
    nextSlide: "Volgende dia",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Geen opties geselecteerd";
        } else if (number === 1) {
            return "Eén optie geselecteerd";
        } else {
            return `${number} opties geselecteerd`;
        }
    },
    off: "Uit",
    opacity: "Dekking",
    pause: "Pauze",
    pickAColorFromTheScreen: "Selecteer een kleur van het scherm",
    pictureInPicture: "Beeld‐in‐beeld",
    play: "Afspelen",
    playbackSpeed: "Afspeelsnelheid",
    previousSlide: "Vorige dia",
    progress: "Voortgang",
    remove: "Verwijderen",
    resize: "Formaat wijzigen",
    scrollableRegion: "Scrollbaar gebied",
    scrollToEnd: "Scrol naar het einde",
    scrollToStart: "Scrol naar het begin",
    seek: "Zoeken",
    settings: "Innstelligen",
    showPassword: "Wachtwoord tonen",
    slideNum: (slide) => `Dia ${slide}`,
    toggleColorFormat: "Kleurnotatie wisselen",
    track: (track) => `Track ${track}`,
    unmute: "Dempen opheffen",
    videoPlayer: "Videospeler",
    volume: "Volume",
};

registerTranslation(translation);

export default translation;
