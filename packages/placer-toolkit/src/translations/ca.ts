import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ca",
    $name: "Català",
    $dir: "ltr",

    captions: "Subtítols",
    carousel: "Carrusel",
    clearEntry: "Esborra l’entrada",
    close: "Tanca",
    controls: "Controls",
    copied: "Copiat!",
    copy: "Copia",
    currentValue: "Valor actual",
    enterFullScreen: "Pantalla completa",
    error: "Error",
    exitFullScreen: "Surt de pantalla completa",
    goToSlide: (slide, count) => `Vés a la diapositiva ${slide} de ${count}`,
    hidePassword: "Amaga la contrasenya",
    hue: "Tonalitat",
    loading: "S’està carregant…",
    maximumValue: "Màxim",
    maximumValueDescriptive: (label) => `${label} (màxim)`,
    minimumValue: "Mínim",
    minimumValueDescriptive: (label) => `${label} (mínim)`,
    mute: "Silencia",
    nextSlide: "Següent diapositiva",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "No hi ha opcions seleccionades";
        } else if (number === 1) {
            return "Una opció seleccionada";
        } else {
            return `${number} opcions seleccionades`;
        }
    },
    off: "Desactivat",
    opacity: "Opacitat",
    pause: "Pausa",
    pickAColorFromTheScreen: "Tria un color de la pantalla",
    pictureInPicture: "Imatge sobre imatge",
    play: "Reprodueix",
    playbackSpeed: "Velocitat de reproducció",
    previousSlide: "Diapositiva anterior",
    progress: "Progrés",
    remove: "Elimina",
    resize: "Redimensiona",
    scrollableRegion: "Regió desplaçable",
    scrollToEnd: "Desplaça’t al final",
    scrollToStart: "Desplaça’t al principi",
    seek: "Cerca",
    settings: "Configuració",
    showPassword: "Mostra la contrasenya",
    slideNum: (slide) => `Diapositiva ${slide}`,
    toggleColorFormat: "Canvia el format de color",
    track: (track) => `Pista ${track}`,
    unmute: "Activa el so",
    videoPlayer: "Reproductor de vídeo",
    volume: "Volum",
};

registerTranslation(translation);

export default translation;
