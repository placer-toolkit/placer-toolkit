import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "lv",
    $name: "Latviešu",
    $dir: "ltr",

    captions: "Subtitri",
    carousel: "Karuselis",
    clearEntry: "Notīrīt ievadi",
    close: "Aizvērt",
    controls: "Vadīklas",
    copied: "Nokopēts!",
    copy: "Kopēt",
    currentValue: "Pašreizējā vērtība",
    enterFullScreen: "Pilnekrāns",
    error: "Kļūda",
    exitFullScreen: "Iziet no pilnekrāna",
    goToSlide: (slide, count) => `Iet uz slaidu ${slide} no ${count}`,
    hidePassword: "Slēpt paroli",
    hue: "Krāsas tonis",
    loading: "Notiek ielāde…",
    maximumValue: "Maksimum",
    maximumValueDescriptive: (label) => `${label} (maksimum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Izslēgt skaņu",
    nextSlide: "Nākamais slaids",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Izvēlētas 0 opcijas";
        } else if (number === 1) {
            return "Izvēlēta viena opcija";
        } else {
            return `Izvēlētas ${number} opcijas`;
        }
    },
    off: "Izslēgts",
    opacity: "Necaurredzamība",
    pause: "Pauze",
    pickAColorFromTheScreen: "Izvēlieties krāsu no ekrāna",
    pictureInPicture: "Attēls attēlā",
    play: "Atskaņot",
    playbackSpeed: "Atskaņošanas ātrums",
    previousSlide: "Iepriekšējais slaids",
    progress: "Progress",
    remove: "Noņemt",
    resize: "Mainīt izmēru",
    scrollableRegion: "Ritjosla",
    scrollToEnd: "Ritiniet līdz beigām",
    scrollToStart: "Ritiniet uz sākumu",
    seek: "Meklēt",
    settings: "Iestatījumi",
    showPassword: "Rādīt paroli",
    slideNum: (slide) => `Slaids ${slide}`,
    toggleColorFormat: "Pārslēgt krāsu formātu",
    track: (track) => `Celiņš ${track}`,
    unmute: "Ieslēgt skaņu",
    videoPlayer: "Video atskaņotājs",
    volume: "Skaļums",
};

registerTranslation(translation);

export default translation;
