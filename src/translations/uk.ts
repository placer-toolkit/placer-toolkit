import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "uk",
    $name: "Українська",
    $dir: "ltr",

    carousel: "Карусель",
    clearEntry: "Очистити поле",
    close: "Закрити",
    copied: "Скопійовано!",
    copy: "Скопіювати",
    currentValue: "Поточне значення",
    error: "Помилка",
    goToSlide: (slide, count) => `Перейти до слайда ${slide} з ${count}`,
    hidePassword: "Приховати пароль",
    loading: "Завантаження…",
    nextSlide: "Наступний слайд",
    numOptionsSelected: (number) => {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        if (number === 0) {
            return "Не вибрано жодного варіанта";
        } else if (lastDigit === 1 && lastTwoDigits !== 11) {
            return `Вибрано ${number} варіант`;
        } else if (
            lastDigit >= 2 &&
            lastDigit <= 4 &&
            (lastTwoDigits < 10 || lastTwoDigits > 20)
        ) {
            return `Вибрано ${number} варіанти`;
        } else {
            return `Вибрано ${number} варіантів`;
        }
    },
    pickAColorFromTheScreen: "Виберіть колір на екрані",
    previousSlide: "Попередній слайд",
    progress: "Прогрес",
    remove: "Видалити",
    resize: "Змінити розмір",
    scrollableRegion: "Прокручувана область",
    scrollToEnd: "Прокрутити в кінець",
    scrollToStart: "Прокрутити на початок",
    showPassword: "Показати пароль",
    slideNum: (slide) => `Слайд ${slide}`,
    toggleColorFormat: "Переключити формат кольору",
};

registerTranslation(translation);

export default translation;
