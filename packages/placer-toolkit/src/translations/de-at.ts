import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";
import baseTranslation from "./de.js";

const translation: Translation = {
    ...baseTranslation,

    $code: "de-AT",
    $name: "Deutsch (Österreich)",

    resize: "Größe anpassen",
};

registerTranslation(translation);

export default translation;
