import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "hu",
    $name: "Magyar",
    $dir: "ltr",

    carousel: "Körhinta",
    clearEntry: "Bejegyzés törlése",
    close: "Bezárás",
    copied: "Másolva!",
    copy: "Másolás",
    currentValue: "Jelenlegi érték",
    error: "Hiba",
    goToSlide: (slide, count) =>
        `Ugrás ${[1, 5, 6, 7, 8, 10].includes(slide) ? "az" : "a"} ${slide}. diára ${[1, 5, 6, 7, 8, 10].includes(count) ? "az" : "a"} ${count} diából`,
    hidePassword: "Jelszó elrejtése",
    hue: "Színtónus",
    loading: "Betöltés…",
    nextSlide: "Következő dia",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Nincs kiválasztott opció";
        } else if (number === 1) {
            return "Egy opció kiválasztva";
        } else {
            return `${number} opció kiválasztva`;
        }
    },
    opacity: "Átlátszatlanság",
    pickAColorFromTheScreen: "Válassz egy színt a képernyőről",
    previousSlide: "Előző dia",
    progress: "Folyamat",
    remove: "Eltávolítás",
    resize: "Átméretezés",
    scrollableRegion: "Görgethető terület",
    scrollToEnd: "Görgetés a végére",
    scrollToStart: "Görgetés az elejére",
    showPassword: "Jelszó megjelenítése",
    slideNum: (slide) => `Dia ${slide}`,
    toggleColorFormat: "Színformátum váltása",
};

registerTranslation(translation);

export default translation;
