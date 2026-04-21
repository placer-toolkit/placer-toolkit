import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";
import baseTranslation from "./en.js";

const translation: Translation = {
    ...baseTranslation,

    $code: "en-GB",
    $name: "English (United Kingdom)",

    pickAColorFromTheScreen: "Pick a colour from the screen",
    scrollToEnd: "Scroll to the end",
    scrollToStart: "Scroll to the start",
    toggleColorFormat: "Toggle colour format",
};

registerTranslation(translation);

export default translation;
