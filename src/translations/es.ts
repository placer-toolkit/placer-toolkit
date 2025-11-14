import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "es",
    $name: "Español",
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
    hue: "Tono",
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
    opacity: "Opacidad",
    pickAColorFromTheScreen: "Seleccione un color de la pantalla",
    previousSlide: "Diapositiva anterior",
    progress: "Progreso",
    remove: "Eliminar",
    resize: "Cambiar tamaño",
    scrollableRegion: "Región desplazable",
    scrollToEnd: "Desplácese hasta el final",
    scrollToStart: "Desplácese al inicio",
    showPassword: "Mostrar contraseña",
    slideNum: (slide) => `Diapositiva ${slide}`,
    toggleColorFormat: "Alternar formato de color",
};

registerTranslation(translation);

export default translation;
