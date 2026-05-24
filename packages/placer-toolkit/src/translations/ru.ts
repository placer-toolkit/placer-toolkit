import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ru",
    $name: "Русский",
    $dir: "ltr",

    captions: "Субтитры",
    carousel: "Карусель",
    clearEntry: "Очистить поле",
    close: "Закрыть",
    controls: "Управление",
    copied: "Скопировано!",
    copy: "Скопировать",
    currentValue: "Текущее значение",
    enterFullScreen: "Полный экран",
    error: "Ошибка",
    exitFullScreen: "Выйти из полного экрана",
    goToSlide: (slide, count) => `Перейти к слайду ${slide} из ${count}`,
    hidePassword: "Скрыть пароль",
    hue: "Оттенок",
    loading: "Загрузка…",
    maximumValue: "Максимум",
    maximumValueDescriptive: (label) => `${label} (максимальное значение)`,
    minimumValue: "Минимум",
    minimumValueDescriptive: (label) => `${label} (минимальное значение)`,
    mute: "Без звука",
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
    off: "Выкл.",
    opacity: "Непрозрачность",
    pause: "Пауза",
    pickAColorFromTheScreen: "Выберите цвет на экране",
    pictureInPicture: "Картинка в картинке",
    play: "Воспроизвести",
    playbackSpeed: "Скорость воспроизведения",
    previousSlide: "Предыдущий слайд",
    progress: "Прогресс",
    remove: "Удалить",
    resize: "Изменить размер",
    scrollableRegion: "Прокручиваемая область",
    scrollToEnd: "Прокрутить до конца",
    scrollToStart: "Прокрутить к началу",
    seek: "Поиск",
    settings: "Настройки",
    showPassword: "Показать пароль",
    slideNum: (slide) => `Слайд ${slide}`,
    toggleColorFormat: "Переключить формат цвета",
    track: (track) => `Дорожка ${track}`,
    unmute: "Включить звук",
    videoPlayer: "Видеопроигрыватель",
    volume: "Громкость",
};

registerTranslation(translation);

export default translation;
