import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "lb",
    $name: "Lëtzebuergesch",
    $dir: "ltr",

    captions: "Untertitel",
    carousel: "Karusell",
    clearEntry: "Agab läschen",
    close: "Zoumaachen",
    controls: "Steierung",
    copied: "Kopéiert!",
    copy: "Kopéieren",
    currentValue: "Aktuelle Wäert",
    enterFullScreen: "Vollbildmodus",
    error: "Feeler",
    exitFullScreen: "Vollbildmodus verloossen",
    goToSlide: (slide, count) => {
        /* This is an attempt of following the vu/vun distinction in Luxembourgish.
           It is compatible with numbers from 0 to 1 000 000, which should be plenty for UI. */
        const getPreposition = (number: number) => {
            if (number < 1 || number >= 1000000) {
                return "vun";
            }

            const keepN = [1, 2, 3, 8, 10, 11, 12, 13, 18, 19];

            if (number <= 19) {
                return keepN.includes(number) ? "vun" : "vu";
            }

            if (number < 100) {
                const lastDigit = number % 10;

                if (lastDigit === 0) {
                    return [20, 30, 80, 90].includes(number) ? "vun" : "vu";
                }

                return [1, 2, 3, 8, 9].includes(lastDigit) ? "vun" : "vu";
            }

            const magnitude = number >= 1000 ? 1000 : 100;
            const lead = Math.floor(number / magnitude);

            if (lead > 10 && lead < 20) {
                return keepN.includes(lead) ? "vun" : "vu";
            }

            const firstDigitOfLead = parseInt(lead.toString()[0]);

            return [1, 2, 3, 8, 9].includes(firstDigitOfLead) ? "vun" : "vu";
        };

        return `Gitt op d’Säit ${slide} ${getPreposition(count)} ${count}`;
    },
    hidePassword: "Passwuert verstoppen",
    hue: "Faarftoun",
    loading: "Lueden…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (Maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (Minimum)`,
    mute: "Stomm",
    nextSlide: "Nächst Säit",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Keng Optiounen ausgewielt";
        } else if (number === 1) {
            return "Eng Optioun ausgewielt";
        } else {
            return `${number} Optiounen ausgewielt`;
        }
    },
    off: "Aus",
    opacity: "Opazitéit",
    pause: "Paus",
    pickAColorFromTheScreen: "Faarf vum Bildschierm wielen",
    pictureInPicture: "Bild‐am‐Bild",
    play: "Abspillen",
    playbackSpeed: "Ofspillgeschwindegkeet",
    previousSlide: "Vireg Säit",
    progress: "Fortschrëtt",
    remove: "Ewechhuelen",
    resize: "Gréisst änneren",
    scrollableRegion: "Scrollberäich",
    scrollToEnd: "Bis zum Schluss scrollen",
    scrollToStart: "Bis zum Ufank scrollen",
    seek: "Sichen",
    settings: "Astellungen",
    showPassword: "Passwuert weisen",
    slideNum: (slide) => `Säit ${slide}`,
    toggleColorFormat: "Faarfformat änneren",
    track: (track) => `Track ${track}`,
    unmute: "Toun aschalten",
    videoPlayer: "Videospiller",
    volume: "Lautstäerkt",
};

registerTranslation(translation);

export default translation;
