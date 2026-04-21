import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "kk",
    $name: "Қазақша",
    $dir: "ltr",

    captions: "Субтитрлер",
    carousel: "Карусель",
    clearEntry: "Жазбаны тазалау",
    close: "Жабу",
    controls: "Басқару элементтері",
    copied: "Көшірілді!",
    copy: "Көшіру",
    currentValue: "Ағымдағы мән",
    enterFullScreen: "Толық экран",
    error: "Қате",
    exitFullScreen: "Толық экраннан шығу",
    goToSlide: (slide, count) => `${count}‐ден ${slide}‐слайдқа өту`,
    hidePassword: "Құпия сөзді жасыру",
    hue: "Түс реңі",
    loading: "Жүктелуде…",
    maximumValue: "Максималды мән",
    maximumValueDescriptive: (label) => `${label} (максималды)`,
    minimumValue: "Минималды мән",
    minimumValueDescriptive: (label) => `${label} (минималды)`,
    mute: "Дыбысты өшіру",
    nextSlide: "Келесі слайд",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ешқандай опция таңдалмады";
        } else {
            return `${number} опция таңдалды`;
        }
    },
    off: "Өшірулі",
    opacity: "Мөлдірсіздік",
    pause: "Пауза",
    pickAColorFromTheScreen: "Экраннан түс таңдау",
    pictureInPicture: "Суреттегі сурет",
    play: "Ойнату",
    playbackSpeed: "Ойнату жылдамдығы",
    previousSlide: "Алдыңғы слайд",
    progress: "Прогресс",
    remove: "Өшіру",
    resize: "Өлшемін өзгерту",
    scrollableRegion: "Айналдырылатын аймақ",
    scrollToEnd: "Соңына дейін айналдыру",
    scrollToStart: "Басына дейін айналдыру",
    seek: "Іздеу",
    settings: "Параметрлер",
    showPassword: "Құпия сөзді көрсету",
    slideNum: (slide) => `${slide}‐слайд`,
    toggleColorFormat: "Түс форматын ауыстыру",
    track: (track) => `Жол ${track}`,
    unmute: "Дыбысты қосу",
    videoPlayer: "Бейне ойнатқыш",
    volume: "Дыбыс деңгейі",
};

registerTranslation(translation);

export default translation;
