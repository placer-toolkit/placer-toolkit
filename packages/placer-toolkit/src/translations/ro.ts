import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ro",
    $name: "Română",
    $dir: "ltr",

    captions: "Subtitrări",
    carousel: "Carusel",
    clearEntry: "Șterge intrarea",
    close: "Închide",
    controls: "Comenzi",
    copied: "Copiat!",
    copy: "Copiază",
    currentValue: "Valoare curentă",
    enterFullScreen: "Ecran complet",
    error: "Eroare",
    exitFullScreen: "Ieșire ecran complet",
    goToSlide: (slide, count) => `Du‐te la slide‐ul ${slide} din ${count}`,
    hidePassword: "Ascunde parola",
    hue: "Ton de culoare",
    loading: "Se încarcă…",
    maximumValue: "Maxim",
    maximumValueDescriptive: (label) => `${label} (valoare maximă)`,
    minimumValue: "Minim",
    minimumValueDescriptive: (label) => `${label} (valoare minimă)`,
    mute: "Fără sunet",
    nextSlide: "Slide‐ul următor",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Nicio opțiune selectată";
        } else if (number === 1) {
            return "O opțiune selectată";
        } else {
            return `${number} opțiuni selectate`;
        }
    },
    off: "Dezactivat",
    opacity: "Opacitate",
    pause: "Pauză",
    pickAColorFromTheScreen: "Alege o culoare de pe ecran",
    pictureInPicture: "Imagine în imagine",
    play: "Redare",
    playbackSpeed: "Viteza de redare",
    previousSlide: "Slide‐ul anterior",
    progress: "Progres",
    remove: "Elimină",
    resize: "Redimensionează",
    scrollableRegion: "Regiune derulabilă",
    scrollToEnd: "Derulează la final",
    scrollToStart: "Derulează la început",
    seek: "Caută",
    settings: "Setări",
    showPassword: "Arată parola",
    slideNum: (slide) => `Slide‐ul ${slide}`,
    toggleColorFormat: "Comută formatul culorii",
    track: (track) => `Pista ${track}`,
    unmute: "Sunet pornit",
    videoPlayer: "Player video",
    volume: "Volum",
};

registerTranslation(translation);

export default translation;
