import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "cs",
    $name: "Čeština",
    $dir: "ltr",

    carousel: "Karusel",
    clearEntry: "Smazat položku",
    close: "Zavřít",
    copied: "Zkopírováno!",
    copy: "Kopírovat",
    currentValue: "Současná hodnota",
    error: "Chyba",
    goToSlide: (slide, count) => `Přejít na snímek ${slide} z ${count}`,
    hidePassword: "Skrýt heslo",
    loading: "Nahrává se…",
    nextSlide: "Další snímek",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Nejsou vybrány žádné možnosti";
        } else if (number === 1) {
            return "Je vybrána jedna možnost";
        } else if (number >= 2 && number <= 4) {
            return `Vybrány ${number} možnosti`;
        } else {
            return `Vybráno ${number} možností`;
        }
    },
    pickAColorFromTheScreen: "Vybrat barvu z obrazovky",
    previousSlide: "Předchozí snímek",
    progress: "Průběh",
    remove: "Odstranit",
    resize: "Změnit velikost",
    scrollableRegion: "Posuvná oblast",
    scrollToEnd: "Posunout na konec",
    scrollToStart: "Posunout na začátek",
    showPassword: "Zobrazit heslo",
    slideNum: (slide) => `Snímek ${slide}`,
    toggleColorFormat: "Přepnout formát barvy",
};

registerTranslation(translation);

export default translation;
