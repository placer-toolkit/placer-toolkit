import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "bg",
    $name: "Български",
    $dir: "ltr",

    captions: "Субтитри",
    carousel: "Карусел",
    clearEntry: "Изчистване на записа",
    close: "Затваряне",
    controls: "Управление",
    copied: "Копирано!",
    copy: "Копирай",
    currentValue: "Текуща стойност",
    enterFullScreen: "Цял екран",
    error: "Грешка",
    exitFullScreen: "Изход от цял екран",
    goToSlide: (slide, count) => `Към слайд ${slide} от ${count}`,
    hidePassword: "Скрий паролата",
    hue: "Оттенък",
    loading: "Зареждане…",
    maximumValue: "Максимум",
    maximumValueDescriptive: (label) => `${label} (максимално значение)`,
    minimumValue: "Минимум",
    minimumValueDescriptive: (label) => `${label} (минимално значение)`,
    mute: "Спиране на звука",
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
    off: "Изкл.",
    opacity: "Непрозрачност",
    pause: "Пауза",
    pickAColorFromTheScreen: "Изберете цвят от екрана",
    pictureInPicture: "Картина в картината",
    play: "Възпроизвеждане",
    playbackSpeed: "Скорост на възпроизвеждане",
    previousSlide: "Предишен слайд",
    progress: "Прогрес",
    remove: "Премахване",
    resize: "Преоразмеряване",
    scrollableRegion: "Превъртаща се област",
    scrollToEnd: "Превъртете до края",
    scrollToStart: "Превъртете до началото",
    seek: "Търсене",
    settings: "Настройки",
    showPassword: "Покажи паролата",
    slideNum: (slide) => `Слайд ${slide}`,
    toggleColorFormat: "Превключи цветовия формат",
    track: (track) => `Път ${track}`,
    unmute: "Включване на звука",
    videoPlayer: "Видео плейър",
    volume: "Сила на звука",
};

registerTranslation(translation);

export default translation;
