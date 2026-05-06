import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sl",
    $name: "Slovenščina",
    $dir: "ltr",

    captions: "Podnapisi",
    carousel: "Vrtiljak",
    clearEntry: "Počisti vnos",
    close: "Zapri",
    controls: "Upravljanje",
    copied: "Kopirano!",
    copy: "Kopiraj",
    currentValue: "Trenutna vrednost",
    enterFullScreen: "Celozaslonski način",
    error: "Napaka",
    exitFullScreen: "Izhod iz celozaslonskega načina",
    goToSlide: (slide, count) => `Pojdi na diapozitiv ${slide} od ${count}`,
    hidePassword: "Skrij geslo",
    hue: "Ton barve",
    loading: "Nalaganje…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maksimalna vrednost)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimalna vrednost)`,
    mute: "Utišaj",
    nextSlide: "Naslednji diapozitiv",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Nobena možnost ni izbrana";
        } else if (number === 1) {
            return "Ena možnost je izbrana";
        } else if (number === 2) {
            return "Dve možnosti sta izbrani";
        } else if (number > 2 && number <= 4) {
            return `${number} možnosti so izbrane`;
        } else {
            return `${number} možnosti je izbranih`;
        }
    },
    off: "Izklopljeno",
    opacity: "Motnost",
    pause: "Premor",
    pickAColorFromTheScreen: "Izberi barvo z zaslona",
    pictureInPicture: "Slika v sliki",
    play: "Predvajaj",
    playbackSpeed: "Hitrost predvajanja",
    previousSlide: "Prejšnji diapozitiv",
    progress: "Napredek",
    remove: "Odstrani",
    resize: "Spremeni velikost",
    scrollableRegion: "Drseče območje",
    scrollToEnd: "Drsi na konec",
    scrollToStart: "Drsi na začetek",
    seek: "Išči",
    settings: "Nastavitve",
    showPassword: "Pokaži geslo",
    slideNum: (slide) => `Diapozitiv ${slide}`,
    toggleColorFormat: "Preklopi format barve",
    track: (track) => `Posnetek ${track}`,
    unmute: "Vklopi zvok",
    videoPlayer: "Video predvajalnik",
    volume: "Glasnost",
};

registerTranslation(translation);

export default translation;
