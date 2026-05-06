import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "uk",
    $name: "Українська",
    $dir: "ltr",

    captions: "Субтитри",
    carousel: "Карусель",
    clearEntry: "Очистити поле",
    close: "Закрити",
    controls: "Керування",
    copied: "Скопійовано!",
    copy: "Скопіювати",
    currentValue: "Поточне значення",
    enterFullScreen: "Повний екран",
    error: "Помилка",
    exitFullScreen: "Вийти з повного еكرана",
    goToSlide: (slide, count) => `Перейти до слайда ${slide} з ${count}`,
    hidePassword: "Приховати пароль",
    hue: "Відтінок",
    loading: "Завантаження…",
    maximumValue: "Максимум",
    maximumValueDescriptive: (label) => `${label} (максимальне значення)`,
    minimumValue: "Мінімум",
    minimumValueDescriptive: (label) => `${label} (мінімальне значення)`,
    mute: "Вимкнути звук",
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
    off: "Вимк.",
    opacity: "Непрозорість",
    pause: "Пауза",
    pickAColorFromTheScreen: "Виберіть колір на екрані",
    pictureInPicture: "Картинка в картинці",
    play: "Відтворити",
    playbackSpeed: "Швидкість відтворення",
    previousSlide: "Попередній слайд",
    progress: "Прогрес",
    remove: "Видалити",
    resize: "Змінити розмір",
    scrollableRegion: "Прокручувана область",
    scrollToEnd: "Прокрутити в кінець",
    scrollToStart: "Прокрутити на початок",
    seek: "Пошук",
    settings: "Налаштування",
    showPassword: "Показати пароль",
    slideNum: (slide) => `Слайд ${slide}`,
    toggleColorFormat: "Переключити формат кольору",
    track: (track) => `Доріжка ${track}`,
    unmute: "Увімкнути звук",
    videoPlayer: "Відеопрогравач",
    volume: "Гучність",
};

registerTranslation(translation);

export default translation;
