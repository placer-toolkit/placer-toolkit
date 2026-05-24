import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";
import baseTranslation from "./pt-br.js";

const translation: Translation = {
    ...baseTranslation,

    $code: "pt-PT",
    $name: "Português Europeu",

    hidePassword: "Ocultar palavra‐passe",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Nenhuma opção seleccionada";
        } else if (number === 1) {
            return "Uma opção seleccionada";
        } else {
            return `${number} opções seleccionadas`;
        }
    },
    showPassword: "Mostrar palavra‐passe",
    pickAColorFromTheScreen: "Escolher uma cor do ecrã",
};

registerTranslation(translation);

export default translation;
