import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";
import baseTranslation from "./nl.js";

const translation: Translation = {
    ...baseTranslation,

    $code: "nl-BE",
    $name: "Nederlands (België)",

    resize: "Formaat aanpassen",
    scrollToEnd: "Scroll naar het einde",
    scrollToStart: "Scroll naar het begin",
    toggleColorFormat: "Kleurmodus wisselen",
};

registerTranslation(translation);

export default translation;
