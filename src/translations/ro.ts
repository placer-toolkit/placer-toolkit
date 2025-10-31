import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ro",
    $name: "Română",
    $dir: "ltr",

    carousel: "Carusel",
    clearEntry: "Șterge intrarea",
    close: "Închide",
    copied: "Copiat!",
    copy: "Copiază",
    currentValue: "Valoare curentă",
    error: "Eroare",
    goToSlide: (slide, count) => `Du‐te la slide‐ul ${slide} din ${count}`,
    hidePassword: "Ascunde parola",
    loading: "Se încarcă…",
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
    pickAColorFromTheScreen: "Alege o culoare de pe ecran",
    previousSlide: "Slide‐ul anterior",
    progress: "Progres",
    remove: "Elimină",
    resize: "Redimensionează",
    scrollableRegion: "Regiune derulabilă",
    scrollToEnd: "Derulează la final",
    scrollToStart: "Derulează la început",
    showPassword: "Arată parola",
    slideNum: (slide) => `Slide‐ul ${slide}`,
    toggleColorFormat: "Comută formatul culorii",
};

registerTranslation(translation);

export default translation;
