import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";
import baseTranslation from "./es.js";

const translation: Translation = {
    ...baseTranslation,

    $code: "es-ES",
    $name: "Español (España)",

    pickAColorFromTheScreen: "Selecciona un color de la pantalla",
    scrollToEnd: "Desplázate hasta el final",
    scrollToStart: "Desplázate al inicio",
    toggleColorFormat: "Alternar el formato de color",
};

registerTranslation(translation);

export default translation;
