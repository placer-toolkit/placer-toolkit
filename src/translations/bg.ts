import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "bg",
    $name: "Български",
    $dir: "ltr",

    carousel: "Карусел",
    clearEntry: "Изчистване на записа",
    close: "Затваряне",
    copied: "Копирано!",
    copy: "Копирай",
    currentValue: "Текуща стойност",
    error: "Грешка",
    goToSlide: (slide, count) => `Към слайд ${slide} от ${count}`,
    hidePassword: "Скрий паролата",
    hue: "Оттенък",
    loading: "Зареждане…",
    nextSlide: "Следващ слайд",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Няма избрани опции";
        } else if (number === 1) {
            return "Една опция избрана";
        } else {
            return `${number} избрани опции`;
        }
    },
    opacity: "Непрозрачност",
    pickAColorFromTheScreen: "Изберете цвят от екрана",
    previousSlide: "Предишен слайд",
    progress: "Прогрес",
    remove: "Премахване",
    resize: "Преоразмеряване",
    scrollableRegion: "Превъртаща се област",
    scrollToEnd: "Превъртете до края",
    scrollToStart: "Превъртете до началото",
    showPassword: "Покажи паролата",
    slideNum: (slide) => `Слайд ${slide}`,
    toggleColorFormat: "Превключи цветовия формат",
};

registerTranslation(translation);

export default translation;
