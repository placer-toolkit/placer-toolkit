import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "lt",
    $name: "Lietuvių",
    $dir: "ltr",

    captions: "Titrai",
    carousel: "Karoselė",
    clearEntry: "Išvalyti įrašą",
    close: "Uždaryti",
    controls: "Valdikliai",
    copied: "Nukopijuota!",
    copy: "Kopijuoti",
    currentValue: "Dabartinė reikšmė",
    enterFullScreen: "Visas ekranas",
    error: "Klaida",
    exitFullScreen: "Išeiti iš viso ekrano",
    goToSlide: (slide, count) => `Eiti į ${slide} iš ${count} skaidrę`,
    hidePassword: "Slėpti slaptažodį",
    hue: "Spalvos tonas",
    loading: "Įkeliama…",
    maximumValue: "Maksimum",
    maximumValueDescriptive: (label) => `${label} (maksimum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Nutildyti",
    nextSlide: "Kita skaidrė",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Pasirinkta 0 parinkčių";
        } else if (number === 1) {
            return "Pasirinkta viena parinktis";
        } else {
            return `${number} parinktys pasirinktos`;
        }
    },
    off: "Išjungta",
    opacity: "Nepermatomumas",
    pause: "Pauzė",
    pickAColorFromTheScreen: "Pasirinkite spalvą iš ekrano",
    pictureInPicture: "Vaizdas vaizde",
    play: "Leisti",
    playbackSpeed: "Atkūrimo greitis",
    previousSlide: "Ankstesnė skaidrė",
    progress: "Eiga",
    remove: "Pašalinti",
    resize: "Pakeisti dydį",
    scrollableRegion: "Slenkamas regionas",
    scrollToEnd: "Slinkti į pabaigą",
    scrollToStart: "Slinkti į pradžią",
    seek: "Ieškoti",
    settings: "Nustatymai",
    showPassword: "Rodyti slaptažodį",
    slideNum: (slide) => `Skaidrė ${slide}`,
    toggleColorFormat: "Perjungti spalvų formatą",
    track: (track) => `Takelis ${track}`,
    unmute: "Įjungti garsą",
    videoPlayer: "Vaizdo grotuvas",
    volume: "Garsumas",
};

registerTranslation(translation);

export default translation;
