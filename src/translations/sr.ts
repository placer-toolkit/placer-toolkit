import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sr",
    $name: "Српски",
    $dir: "ltr",

    carousel: "Вртешка",
    clearEntry: "Обриши поље",
    close: "Затвори",
    copied: "Копирано!",
    copy: "Копирај",
    currentValue: "Тренутна вредност",
    error: "Грешка",
    goToSlide: (slide, count) => `Иди на слајд ${slide} од ${count}`,
    hidePassword: "Сакриј лозинку",
    hue: "Тон боје",
    loading: "Учитавање…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maksimalna vrednost)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimalna vrednost)`,
    nextSlide: "Следећи слајд",
    numOptionsSelected: (number) => {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        if (number === 0) {
            return "Изабрано је 0 опција";
        } else if (number === 1) {
            return "Изабрана је једна опција";
        } else if (
            lastDigit >= 2 &&
            lastDigit <= 4 &&
            !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
        ) {
            return `Изабране су ${number} опције`;
        } else {
            return `Изабрано је ${number} опција`;
        }
    },
    opacity: "Непрозирност",
    pickAColorFromTheScreen: "Изабери боју са екрана",
    previousSlide: "Претходни слајд",
    progress: "Напредак",
    remove: "Уклони",
    resize: "Промени величину",
    scrollableRegion: "Скролујућа област",
    scrollToEnd: "Скролуј до краја",
    scrollToStart: "Скролуј до почетка",
    showPassword: "Прикажи лозинку",
    slideNum: (slide) => `Слајд ${slide}`,
    toggleColorFormat: "Промени формат боје",
};

registerTranslation(translation);

export default translation;
