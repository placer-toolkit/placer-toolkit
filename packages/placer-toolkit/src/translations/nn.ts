import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";
import baseTranslation from "./nb.js";

const translation: Translation = {
    ...baseTranslation,

    $code: "nn",
    $name: "Norsk nynorsk",

    clearEntry: "Tøm feltet",
    currentValue: "Noverande verdi",
    loading: "Lastar…",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ingen alternativ valt";
        } else if (number === 1) {
            return "Eitt alternativ valt";
        } else {
            return `${number} alternativ valde`;
        }
    },
    opacity: "Gjennomsikt",
    pickAColorFromTheScreen: "Vel ein farge frå skjermen",
    previousSlide: "Førre lysbilde",
    progress: "Framdrift",
    resize: "Endre storleik",
};

registerTranslation(translation);

export default translation;
