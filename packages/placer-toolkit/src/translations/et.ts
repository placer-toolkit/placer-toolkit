import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "et",
    $name: "Eesti",
    $dir: "ltr",

    captions: "Subtiitrid",
    carousel: "Karusell",
    clearEntry: "Tühista sisestus",
    close: "Sulge",
    controls: "Juhtnupud",
    copied: "Kopeeritud!",
    copy: "Kopeeri",
    currentValue: "Praegune väärtus",
    enterFullScreen: "Täisekraan",
    error: "Viga",
    exitFullScreen: "Välju täisekraanilt",
    goToSlide: (slide, count) => `Mine slaidile ${slide}/${count}`,
    hidePassword: "Peida parool",
    hue: "Värvitoon",
    loading: "Laadimine…",
    maximumValue: "Maksimum",
    maximumValueDescriptive: (label) => `${label} (maksimum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Vaigista",
    nextSlide: "Järgmine slaid",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ühtegi valikut pole valitud";
        } else if (number === 1) {
            return "Üks valik valitud";
        } else {
            return `${number} valikut valitud`;
        }
    },
    off: "Väljas",
    opacity: "Läbipaistmatus",
    pause: "Paus",
    pickAColorFromTheScreen: "Vali ekraanilt värv",
    pictureInPicture: "Pilt pildis",
    play: "Esita",
    playbackSpeed: "Taasesituse kiirus",
    previousSlide: "Eelmine slaid",
    progress: "Edenemine",
    remove: "Eemalda",
    resize: "Muuda suurust",
    scrollableRegion: "Keritav ala",
    scrollToEnd: "Keri lõppu",
    scrollToStart: "Keri algusesse",
    seek: "Osi",
    settings: "Seaded",
    showPassword: "Kuva parool",
    slideNum: (slide) => `Slaid ${slide}`,
    toggleColorFormat: "Lülita värviformaati",
    track: (track) => `Rada ${track}`,
    unmute: "Lülita heli sisse",
    videoPlayer: "Videomängija",
    volume: "Helitugevus",
};

registerTranslation(translation);

export default translation;
