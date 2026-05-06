import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ga",
    $name: "Gaeilge",
    $dir: "ltr",

    captions: "Fotheidil",
    carousel: "Rothlach",
    clearEntry: "Glan isteach",
    close: "Dún",
    controls: "Rialuithe",
    copied: "Cóipeáilte!",
    copy: "Cóipeáil",
    currentValue: "Luach reatha",
    enterFullScreen: "Scáileán iomlán",
    error: "Earráid",
    exitFullScreen: "Scoir den scáileán iomlán",
    goToSlide: (slide, count) => `Téigh go sleamhnán ${slide} de ${count}`,
    hidePassword: "Folaigh an pasfhocal",
    hue: "Tóin datha",
    loading: "Lódáil…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Múch an fhuaim",
    nextSlide: "An chéad sleamhnán eile",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Níl aon roghanna roghnaithe";
        } else if (number === 1) {
            return "Rogha amháin roghnaithe";
        } else {
            return `${number} roghanna roghnaithe`;
        }
    },
    off: "As",
    opacity: "Trédhearcacht",
    pause: "Sos",
    pickAColorFromTheScreen: "Roghnaigh dath ón scáileán",
    pictureInPicture: "Pictiúr i bpictiúr",
    play: "Seinn",
    playbackSpeed: "Luas athsheanma",
    previousSlide: "Sleamhnán roimhe",
    progress: "Dul chun cinn",
    remove: "Bain",
    resize: "Athraigh méid",
    scrollableRegion: "Réigiún scrollaithe",
    scrollToEnd: "Scrollaigh go deireadh",
    scrollToStart: "Scrollaigh go tús",
    seek: "Cuardaigh",
    settings: "Socruithe",
    showPassword: "Taispeáin an pasfhocal",
    slideNum: (slide) => `Sleamhnán ${slide}`,
    toggleColorFormat: "Athraigh formáid dath",
    track: (track) => `Traic ${track}`,
    unmute: "Cas air an fhuaim",
    videoPlayer: "Seinnteoir físe",
    volume: "Airde fuaime",
};

registerTranslation(translation);

export default translation;
