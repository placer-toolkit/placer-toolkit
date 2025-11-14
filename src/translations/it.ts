import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "it",
    $name: "Italiano",
    $dir: "ltr",

    carousel: "Carosello",
    clearEntry: "Cancella inserimento",
    close: "Chiudi",
    copied: "Copiato!",
    copy: "Copia",
    currentValue: "Valore attuale",
    error: "Errore",
    goToSlide: (slide, count) => `Vai alla diapositiva ${slide} di ${count}`,
    hidePassword: "Nascondi password",
    hue: "Tonalità",
    loading: "In caricamento…",
    nextSlide: "Prossima diapositiva",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Nessuna opzione selezionata";
        } else if (number === 1) {
            return "Un’opzione selezionata";
        } else {
            return `${number} opzioni selezionate`;
        }
    },
    opacity: "Opacità",
    pickAColorFromTheScreen: "Seleziona un colore dallo schermo",
    previousSlide: "Diapositiva precedente",
    progress: "Avanzamento",
    remove: "Rimuovi",
    resize: "Ridimensiona",
    scrollableRegion: "Area scorrevole",
    scrollToEnd: "Scorri alla fine",
    scrollToStart: "Scorri all’inizio",
    showPassword: "Mostra password",
    slideNum: (slide) => `Diapositiva ${slide}`,
    toggleColorFormat: "Cambia formato colore",
};

registerTranslation(translation);

export default translation;
