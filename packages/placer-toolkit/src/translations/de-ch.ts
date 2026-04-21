import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";
import baseTranslation from "./de.js";

const translation: Translation = {
    ...baseTranslation,

    $code: "de-CH",
    $name: "Deutsch (Schweiz)",

    close: "Schliessen",
    resize: "Grösse anpassen",
};

registerTranslation(translation);

export default translation;
