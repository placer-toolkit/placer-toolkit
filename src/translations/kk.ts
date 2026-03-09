import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "kk",
    $name: "Қазақша",
    $dir: "ltr",

    carousel: "Карусель",
    clearEntry: "Жазбаны тазалау",
    close: "Жабу",
    copied: "Көшірілді!",
    copy: "Көшіру",
    currentValue: "Ағымдағы мән",
    error: "Қате",
    goToSlide: (slide, count) => `${count}‐ден ${slide}‐слайдқа өту`,
    hidePassword: "Құпия сөзді жасыру",
    hue: "Түс реңі",
    loading: "Жүктелуде…",
    maximumValue: "Максималды мән",
    maximumValueDescriptive: (label) => `${label} (максималды)`,
    minimumValue: "Минималды мән",
    minimumValueDescriptive: (label) => `${label} (минималды)`,
    nextSlide: "Келесі слайд",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Ешқандай опция таңдалмады";
        } else {
            return `${number} опция таңдалды`;
        }
    },
    opacity: "Мөлдірсіздік",
    pickAColorFromTheScreen: "Экраннан түс таңдау",
    previousSlide: "Алдыңғы слайд",
    progress: "Прогресс",
    remove: "Өшіру",
    resize: "Өлшемін өзгерту",
    scrollableRegion: "Айналдырылатын аймақ",
    scrollToEnd: "Соңына дейін айналдыру",
    scrollToStart: "Басына дейін айналдыру",
    showPassword: "Құпия сөзді көрсету",
    slideNum: (slide) => `${slide}‐слайд`,
    toggleColorFormat: "Түс форматын ауыстыру",
};

registerTranslation(translation);

export default translation;
