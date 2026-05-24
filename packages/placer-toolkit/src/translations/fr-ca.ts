import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";
import baseTranslation from "./fr.js";

const translation: Translation = {
    ...baseTranslation,

    $code: "fr-CA",
    $name: "Français (Canada)",

    pickAColorFromTheScreen: "Sélectionner une couleur à l’écran",
    showPassword: "Afficher le mot de passe",
};

registerTranslation(translation);

export default translation;
