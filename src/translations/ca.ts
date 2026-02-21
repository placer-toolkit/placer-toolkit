import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ca",
    $name: "Català",
    $dir: "ltr",

    carousel: "Carrusel",
    clearEntry: "Esborra l’entrada",
    close: "Tanca",
    copied: "Copiat!",
    copy: "Copia",
    currentValue: "Valor actual",
    error: "Error",
    goToSlide: (slide, count) => `Vés a la diapositiva ${slide} de ${count}`,
    hidePassword: "Amaga la contrasenya",
    hue: "Tonalitat",
    loading: "S’està carregant…",
    maximumValue: "Màxim",
    maximumValueDescriptive: (label) => `${label} (màxim)`,
    minimumValue: "Mínim",
    minimumValueDescriptive: (label) => `${label} (mínim)`,
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
    opacity: "Opacitat",
    pickAColorFromTheScreen: "Tria un color de la pantalla",
    previousSlide: "Diapositiva anterior",
    progress: "Progrés",
    remove: "Elimina",
    resize: "Redimensiona",
    scrollableRegion: "Regió desplaçable",
    scrollToEnd: "Desplaça’t al final",
    scrollToStart: "Desplaça’t al principi",
    showPassword: "Mostra la contrasenya",
    slideNum: (slide) => `Diapositiva ${slide}`,
    toggleColorFormat: "Canvia el format de color",
};

registerTranslation(translation);

export default translation;
