import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "es",
    $name: "Español",
    $dir: "ltr",

    captions: "Subtítulos",
    carousel: "Carrusel",
    clearEntry: "Borrar entrada",
    close: "Cerrar",
    controls: "Controles",
    copied: "¡Copiado!",
    copy: "Copiar",
    currentValue: "Valor actual",
    enterFullScreen: "Pantalla completa",
    error: "Error",
    exitFullScreen: "Salir de pantalla completa",
    goToSlide: (slide, count) => `Ir a la diapositiva ${slide} de ${count}`,
    hidePassword: "Ocultar contraseña",
    hue: "Tono",
    loading: "Cargando…",
    maximumValue: "Máximo",
    maximumValueDescriptive: (label) => `${label} (valor máximo)`,
    minimumValue: "Mínimo",
    minimumValueDescriptive: (label) => `${label} (valor mínimo)`,
    mute: "Silenciar",
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
    off: "Desactivado",
    opacity: "Opacidad",
    pause: "Pausa",
    pickAColorFromTheScreen: "Seleccione un color de la pantalla",
    pictureInPicture: "Imagen en imagen",
    play: "Reproducir",
    playbackSpeed: "Velocidad de reproducción",
    previousSlide: "Diapositiva anterior",
    progress: "Progreso",
    remove: "Eliminar",
    resize: "Cambiar tamaño",
    scrollableRegion: "Región desplazable",
    scrollToEnd: "Desplácese hasta el final",
    scrollToStart: "Desplácese al inicio",
    seek: "Buscar",
    settings: "Ajustes",
    showPassword: "Mostrar contraseña",
    slideNum: (slide) => `Diapositiva ${slide}`,
    toggleColorFormat: "Alternar formato de color",
    track: (track) => `Pista ${track}`,
    unmute: "Activar sonido",
    videoPlayer: "Reproductor de vídeo",
    volume: "Volumen",
};

registerTranslation(translation);

export default translation;
