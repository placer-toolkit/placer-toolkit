import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sq",
    $name: "Shqip",
    $dir: "ltr",

    carousel: "Karusel",
    clearEntry: "Fshij hyrjen",
    close: "Mbyll",
    copied: "Kopjuar!",
    copy: "Kopjo",
    currentValue: "Vlera aktuale",
    error: "Gabim",
    goToSlide: (slide, count) => `Shko te diapozitivi ${slide} nga ${count}`,
    hidePassword: "Fshih fjalëkalimin",
    hue: "Ton ngjyre",
    loading: "Duke u ngarkuar…",
    nextSlide: "Diapozitivi tjetër",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Asnjë opsion nuk u zgjodh";
        } else if (number === 1) {
            return "Një opsion u zgjodh";
        } else {
            return `${number} opsione u zgjodhën`;
        }
    },
    opacity: "Patejdukshmëri",
    pickAColorFromTheScreen: "Zgjidh një ngjyrë nga ekrani",
    previousSlide: "Diapozitivi i mëparshëm",
    progress: "Progresi",
    remove: "Hiq",
    resize: "Ndrysho madhësinë",
    scrollableRegion: "Zona e lëvizshme",
    scrollToEnd: "Lëviz në fund",
    scrollToStart: "Lëviz në fillim",
    showPassword: "Shfaq fjalëkalimin",
    slideNum: (slide) => `Diapozitivi ${slide}`,
    toggleColorFormat: "Ndrysho formatin e ngjyrës",
};

registerTranslation(translation);

export default translation;
