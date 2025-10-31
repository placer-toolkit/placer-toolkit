import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "es-es",
    $name: "Español (España)",
    $dir: "ltr",

    carousel: "Carrusel",
    clearEntry: "Borrar entrada",
    close: "Cerrar",
    copied: "¡Copiado!",
    copy: "Copiar",
    currentValue: "Valor actual",
    error: "Error",
    goToSlide: (slide, count) => `Ir a la diapositiva ${slide} de ${count}`,
    hidePassword: "Ocultar contraseña",
    loading: "Cargando…",
    nextSlide: "Siguiente diapositiva",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "No hay opciones seleccionadas";
        } else if (number === 1) {
            return "Una opción seleccionada";
        } else {
            return `${number} opciones seleccionadas`;
        }
    },
    pickAColorFromTheScreen: "Seleccionad un color de la pantalla",
    previousSlide: "Diapositiva anterior",
    progress: "Progreso",
    remove: "Eliminar",
    resize: "Cambiar tamaño",
    scrollableRegion: "Región desplazable",
    scrollToEnd: "Desplazaos hasta el final",
    scrollToStart: "Desplazaos al inicio",
    showPassword: "Mostrar contraseña",
    slideNum: (slide) => `Diapositiva ${slide}`,
    toggleColorFormat: "Alternar el formato de color",
};

registerTranslation(translation);

export default translation;
