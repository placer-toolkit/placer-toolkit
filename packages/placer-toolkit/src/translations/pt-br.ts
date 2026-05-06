import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";
import baseTranslation from "./pt.js";

const translation: Translation = {
    ...baseTranslation,

    $code: "pt-BR",
    $name: "Português do Brasil",

    copied: "Copiado!",
    pickAColorFromTheScreen: "Escolher uma cor da tela",
    scrollToEnd: "Rolar até o final",
    scrollToStart: "Rolar até o início",
};

registerTranslation(translation);

export default translation;
