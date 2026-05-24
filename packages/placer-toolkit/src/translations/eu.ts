import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "eu",
    $name: "Euskara",
    $dir: "ltr",

    captions: "Azpitituluak",
    carousel: "Karrusela",
    clearEntry: "Garbitu sarrera",
    close: "Itxi",
    controls: "Kontrolak",
    copied: "Kopiatuta!",
    copy: "Kopiatu",
    currentValue: "Uneko balioa",
    enterFullScreen: "Pantaila osoa",
    error: "Errorea",
    exitFullScreen: "Irten pantaila osotik",
    goToSlide: (slide, count) => `Joan ${slide}. diapositibara, ${count}‐etik`,
    hidePassword: "Ezkutatu pasahitza",
    hue: "Kolore‐tona",
    loading: "Kargatzen…",
    maximumValue: "Maximo",
    maximumValueDescriptive: (label) => `${label} (maximo)`,
    minimumValue: "Minimo",
    minimumValueDescriptive: (label) => `${label} (minimo)`,
    mute: "Mututu",
    nextSlide: "Hurrengo diapositiba",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ez dago aukera hautaturik";
        } else if (number === 1) {
            return "Aukera bat hautatuta";
        } else {
            return `${number} aukera hautatuta`;
        }
    },
    off: "Desaktibatuta",
    opacity: "Opakutasuna",
    pause: "Pausatu",
    pickAColorFromTheScreen: "Hautatu kolore bat pantailatik",
    pictureInPicture: "Irudia irudian",
    play: "Erreproduzitu",
    playbackSpeed: "Erreprodukzio‐abiadura",
    previousSlide: "Aurreko diapositiba",
    progress: "Aurrerapena",
    remove: "Ezabatu",
    resize: "Tamainaz aldatu",
    scrollableRegion: "Korrigarri eskualdea",
    scrollToEnd: "Korritu amaierara",
    scrollToStart: "Korritu hasierara",
    seek: "Bilatu",
    settings: "Ezarpenak",
    showPassword: "Erakutsi pasahitza",
    slideNum: (slide) => `${slide}. diapositiba`,
    toggleColorFormat: "Aldatu kolore formatua",
    track: (track) => `${track}. pista`,
    unmute: "Aktibatu soinua",
    videoPlayer: "Bideo‐erreproduzitzailea",
    volume: "Bolumena",
};

registerTranslation(translation);

export default translation;
