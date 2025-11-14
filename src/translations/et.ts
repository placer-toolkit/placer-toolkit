import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "et",
    $name: "Eesti",
    $dir: "ltr",

    carousel: "Karusell",
    clearEntry: "Tühista sisestus",
    close: "Sulge",
    copied: "Kopeeritud!",
    copy: "Kopeeri",
    currentValue: "Praegune väärtus",
    error: "Viga",
    goToSlide: (slide, count) => `Mine slaidile ${slide}/${count}`,
    hidePassword: "Peida parool",
    hue: "Värvitoon",
    loading: "Laadimine…",
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
    opacity: "Läbipaistmatus",
    pickAColorFromTheScreen: "Vali ekraanilt värv",
    previousSlide: "Eelmine slaid",
    progress: "Edenemine",
    remove: "Eemalda",
    resize: "Muuda suurust",
    scrollableRegion: "Keritav ala",
    scrollToEnd: "Keri lõppu",
    scrollToStart: "Keri algusesse",
    showPassword: "Kuva parool",
    slideNum: (slide) => `Slaid ${slide}`,
    toggleColorFormat: "Lülita värviformaati",
};

registerTranslation(translation);

export default translation;
