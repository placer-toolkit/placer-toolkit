import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "fi",
    $name: "Suomi",
    $dir: "ltr",

    captions: "Tekstitykset",
    carousel: "Karuselli",
    clearEntry: "Tyhjennä kenttä",
    close: "Sulje",
    controls: "Säätimet",
    copied: "Kopioitu!",
    copy: "Kopioi",
    currentValue: "Nykyinen arvo",
    enterFullScreen: "Koko näyttö",
    error: "Virhe",
    exitFullScreen: "Poistu koko näytöstä",
    goToSlide: (slide, count) => `Siirry diaan ${slide} / ${count}`,
    hidePassword: "Piilota salasana",
    hue: "Värisävy",
    loading: "Ladataan…",
    maximumValue: "Maksimi",
    maximumValueDescriptive: (label) => `${label} (maksimi)`,
    minimumValue: "Minimi",
    minimumValueDescriptive: (label) => `${label} (minimi)`,
    mute: "Mykistä",
    nextSlide: "Seuraava dia",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ei valittuja vaihtoehtoja";
        } else if (number === 1) {
            return "Yksi vaihtoehto valittu";
        } else {
            return `${number} vaihtoehtoa valittu`;
        }
    },
    off: "Pois",
    opacity: "Läpinäkymättömyys",
    pause: "Tauko",
    pickAColorFromTheScreen: "Valitse väri näytöltä",
    pictureInPicture: "Kuva kuvassa",
    play: "Toista",
    playbackSpeed: "Toistonopeus",
    previousSlide: "Edellinen dia",
    progress: "Edistyminen",
    remove: "Poista",
    resize: "Muuta kokoa",
    scrollableRegion: "Vieritettävä alue",
    scrollToEnd: "Vieritä loppuun",
    scrollToStart: "Vieritä alkuun",
    seek: "Haku",
    settings: "Asetukset",
    showPassword: "Näytä salasana",
    slideNum: (slide) => `Dia ${slide}`,
    toggleColorFormat: "Vaihda väriformaattia",
    track: (track) => `Raita ${track}`,
    unmute: "Poista mykistys",
    videoPlayer: "Videosoitin",
    volume: "Äänenvoimakkuus",
};

registerTranslation(translation);

export default translation;
