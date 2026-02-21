import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ru",
    $name: "Русский",
    $dir: "ltr",

    carousel: "Карусель",
    clearEntry: "Очистить поле",
    close: "Закрыть",
    copied: "Скопировано!",
    copy: "Скопировать",
    currentValue: "Текущее значение",
    error: "Ошибка",
    goToSlide: (slide, count) => `Перейти к слайду ${slide} из ${count}`,
    hidePassword: "Скрыть пароль",
    hue: "Оттенок",
    loading: "Загрузка…",
    maximumValue: "Максимум",
    maximumValueDescriptive: (label) => `${label} (максимальное значение)`,
    minimumValue: "Минимум",
    minimumValueDescriptive: (label) => `${label} (минимальное значение)`,
    nextSlide: "Следующий слайд",
    numOptionsSelected: (number) => {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        if (number === 0) {
            return "Выбрано 0 вариантов";
        } else if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return `Выбрано ${number} вариантов`;
        } else if (lastDigit === 1) {
            return `Выбран ${number} вариант`;
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            return `Выбрано ${number} варианта`;
        } else {
            return `Выбрано ${number} вариантов`;
        }
    },
    opacity: "Непрозрачность",
    pickAColorFromTheScreen: "Выберите цвет на экране",
    previousSlide: "Предыдущий слайд",
    progress: "Прогресс",
    remove: "Удалить",
    resize: "Изменить размер",
    scrollableRegion: "Прокручиваемая область",
    scrollToEnd: "Прокрутить до конца",
    scrollToStart: "Прокрутить к началу",
    showPassword: "Показать пароль",
    slideNum: (slide) => `Слайд ${slide}`,
    toggleColorFormat: "Переключить формат цвета",
};

registerTranslation(translation);

export default translation;
