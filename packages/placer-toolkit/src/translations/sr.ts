import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sr",
    $name: "Српски",
    $dir: "ltr",

    captions: "Титлови",
    carousel: "Вртешка",
    clearEntry: "Обриши поље",
    close: "Затвори",
    controls: "Контроле",
    copied: "Копирано!",
    copy: "Копирај",
    currentValue: "Тренутна вредност",
    enterFullScreen: "Цео екран",
    error: "Грешка",
    exitFullScreen: "Изађи из целог екрана",
    goToSlide: (slide, count) => `Иди на слајд ${slide} од ${count}`,
    hidePassword: "Сакриј лозинку",
    hue: "Тон боје",
    loading: "Учитавање…",
    maximumValue: "Максимум",
    maximumValueDescriptive: (label) => `${label} (максимална вредност)`,
    minimumValue: "Минимум",
    minimumValueDescriptive: (label) => `${label} (минимална вредност)`,
    mute: "Искључи звук",
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
    off: "Искључено",
    opacity: "Непрозирност",
    pause: "Пауза",
    pickAColorFromTheScreen: "Изабери боју са екрана",
    pictureInPicture: "Слика у слици",
    play: "Репродукуј",
    playbackSpeed: "Брзина репродукције",
    previousSlide: "Претходни слајд",
    progress: "Напредак",
    remove: "Уклони",
    resize: "Промени величину",
    scrollableRegion: "Скролујућа област",
    scrollToEnd: "Скролуј до краја",
    scrollToStart: "Скролуј до почетка",
    seek: "Тражи",
    settings: "Поставке",
    showPassword: "Прикажи лозинку",
    slideNum: (slide) => `Слајд ${slide}`,
    toggleColorFormat: "Промени формат боје",
    track: (track) => `Запис ${track}`,
    unmute: "Укључи звук",
    videoPlayer: "Видео плејер",
    volume: "Гласноћа",
};

registerTranslation(translation);

export default translation;
