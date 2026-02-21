import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "is",
    $name: "Íslenska",
    $dir: "ltr",

    carousel: "Myndasafn",
    clearEntry: "Hreinsa færslu",
    close: "Loka",
    copied: "Afritað!",
    copy: "Afrita",
    currentValue: "Núverandi gildi",
    error: "Villa",
    goToSlide: (slide, count) => `Fara á glæru ${slide} af ${count}`,
    hidePassword: "Fela lykilorð",
    hue: "Litblær",
    loading: "Hleð…",
    maximumValue: "Hámark",
    maximumValueDescriptive: (label) => `${label} (hámark)`,
    minimumValue: "Lágmark",
    minimumValueDescriptive: (label) => `${label} (lágmark)`,
    nextSlide: "Næsta glæra",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Engir valkostir valdir";
        } else if (number === 1) {
            return "Einn valkostur valinn";
        } else {
            return `${number} valkostir valdir`;
        }
    },
    opacity: "Ógegnsæi",
    pickAColorFromTheScreen: "Velja lit af skjánum",
    previousSlide: "Fyrri glæra",
    progress: "Framvinda",
    remove: "Fjarlægja",
    resize: "Breyta stærð",
    scrollableRegion: "Skrollanlegt svæði",
    scrollToEnd: "Skrolla til enda",
    scrollToStart: "Skrolla á upphaf",
    showPassword: "Sýna lykilorð",
    slideNum: (slide) => `Glæra ${slide}`,
    toggleColorFormat: "Skipta um litarsnið",
};

registerTranslation(translation);

export default translation;
