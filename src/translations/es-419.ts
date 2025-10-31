import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";
import baseTranslation from "./es-es.js";

const translation: Translation = {
    ...baseTranslation,

    $code: "es-419",
    $name: "Español (Latinoamérica)",

    pickAColorFromTheScreen: "Seleccione un color de la pantalla",
    scrollToEnd: "Desplácese hasta el final",
    scrollToStart: "Desplácese al inicio",
    toggleColorFormat: "Alternar formato de color",
};

registerTranslation(translation);

export default translation;
