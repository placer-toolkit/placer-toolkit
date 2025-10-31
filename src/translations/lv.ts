import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "lv",
    $name: "Latviešu",
    $dir: "ltr",

    carousel: "Karuselis",
    clearEntry: "Notīrīt ievadi",
    close: "Aizvērt",
    copied: "Nokopēts!",
    copy: "Kopēt",
    currentValue: "Pašreizējā vērtība",
    error: "Kļūda",
    goToSlide: (slide, count) => `Iet uz slaidu ${slide} no ${count}`,
    hidePassword: "Slēpt paroli",
    loading: "Notiek ielāde…",
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
    pickAColorFromTheScreen: "Izvēlieties krāsu no ekrāna",
    previousSlide: "Iepriekšējais slaids",
    progress: "Progress",
    remove: "Noņemt",
    resize: "Mainīt izmēru",
    scrollableRegion: "Ritjosla",
    scrollToEnd: "Ritiniet līdz beigām",
    scrollToStart: "Ritiniet uz sākumu",
    showPassword: "Rādīt paroli",
    slideNum: (slide) => `Slaids ${slide}`,
    toggleColorFormat: "Pārslēgt krāsu formātu",
};

registerTranslation(translation);

export default translation;
