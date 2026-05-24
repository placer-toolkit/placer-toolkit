import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "it",
    $name: "Italiano",
    $dir: "ltr",

    captions: "Sottotitoli",
    carousel: "Carosello",
    clearEntry: "Cancella inserimento",
    close: "Chiudi",
    copied: "Copiato!",
    controls: "Controlli",
    copy: "Copia",
    currentValue: "Valore attuale",
    enterFullScreen: "Schermo intero",
    error: "Errore",
    exitFullScreen: "Esci da schermo intero",
    goToSlide: (slide, count) => `Vai alla diapositiva ${slide} di ${count}`,
    hidePassword: "Nascondi password",
    hue: "Tonalità",
    loading: "In caricamento…",
    maximumValue: "Massimo",
    maximumValueDescriptive: (label) => `${label} (valore massimo)`,
    minimumValue: "Minimo",
    minimumValueDescriptive: (label) => `${label} (valore minimo)`,
    mute: "Disattiva audio",
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
    off: "Disattiva",
    opacity: "Opacità",
    pause: "Pausa",
    pickAColorFromTheScreen: "Seleziona un colore dallo schermo",
    pictureInPicture: "Picture‐in‐picture",
    play: "Riproduci",
    playbackSpeed: "Velocità di riproduzione",
    previousSlide: "Diapositiva precedente",
    progress: "Avanzamento",
    remove: "Rimuovi",
    resize: "Ridimensiona",
    scrollableRegion: "Area scorrevole",
    scrollToEnd: "Scorri alla fine",
    scrollToStart: "Scorri all’inizio",
    seek: "Cerca",
    settings: "Impostazioni",
    showPassword: "Mostra password",
    slideNum: (slide) => `Diapositiva ${slide}`,
    toggleColorFormat: "Cambia formato colore",
    track: (track) => `Traccia ${track}`,
    unmute: "Attiva audio",
    videoPlayer: "Lettore video",
    volume: "Volume",
};

registerTranslation(translation);

export default translation;
