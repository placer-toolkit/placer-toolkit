import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sk",
    $name: "Slovenčina",
    $dir: "ltr",

    carousel: "Karusel",
    clearEntry: "Vymazať položku",
    close: "Zatvoriť",
    copied: "Skopírované!",
    copy: "Kopírovať",
    currentValue: "Aktuálna hodnota",
    error: "Chyba",
    goToSlide: (slide, count) => `Prejsť na snímku ${slide} z ${count}`,
    hidePassword: "Skryť heslo",
    hue: "Tón farby",
    loading: "Načítava sa…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximálna hodnota)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimálna hodnota)`,
    nextSlide: "Ďalšia snímka",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Žiadne možnosti nie sú vybrané";
        } else if (number === 1) {
            return "Vybraná je jedna možnosť";
        } else if (number >= 2 && number <= 4) {
            return `Vybrané sú ${number} možnosti`;
        } else {
            return `${number} možností je vybraných`;
        }
    },
    opacity: "Krytie",
    pickAColorFromTheScreen: "Vybrať farbu z obrazovky",
    previousSlide: "Predchádzajúca snímka",
    progress: "Priebeh",
    remove: "Odstrániť",
    resize: "Zmeniť veľkosť",
    scrollableRegion: "Oblasť s možnosťou posúvania",
    scrollToEnd: "Posunúť na koniec",
    scrollToStart: "Posunúť na začiatok",
    showPassword: "Zobraziť heslo",
    slideNum: (slide) => `Snímka ${slide}`,
    toggleColorFormat: "Prepnúť formát farby",
};

registerTranslation(translation);

export default translation;
