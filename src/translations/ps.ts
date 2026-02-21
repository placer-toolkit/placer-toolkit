import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

/* Note: This file contains literal U+200F (Right-to-Left Mark) characters after numbers.
   Do not remove them – they ensure correct number display in RTL text. */
const translation: Translation = {
    $code: "ps",
    $name: "پښتو",
    $dir: "rtl",

    carousel: "کیروسل",
    clearEntry: "انټر پاک کړئ",
    close: "بندول",
    copied: "کاپی شو!",
    copy: "کاپی کول",
    currentValue: "اوسنی ارزښت",
    error: "تېروتنه",
    goToSlide: (slide, count) => `سلايډ ${slide}‏ ته لاړ شئ له ${count}‏ څخه`,
    hidePassword: "پاسورډ پټول",
    hue: "د رنګ ټون",
    loading: "په بارولو کې دی…",
    maximumValue: "اعظمي",
    maximumValueDescriptive: (label) => `${label} (اعظمي ارزښت)`,
    minimumValue: "کمترين",
    minimumValueDescriptive: (label) => `${label} (کمترين ارزښت)`,
    nextSlide: "راتلونکی سلايډ",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return `هیڅ انتخاب نه دی شوی`;
        } else if (number === 1) {
            return `یو انتخاب شوی دی`;
        } else {
            return `${number}‏ انتخابونه شوي دي`;
        }
    },
    opacity: "روڼتیا",
    pickAColorFromTheScreen: "د سکرین څخه یو رنګ وټاکئ",
    previousSlide: "مخکینی سلايډ",
    progress: "پرمختګ",
    remove: "لرې کول",
    resize: "اندازه بدلول",
    scrollableRegion: "د سکرول کولو ساحه",
    scrollToEnd: "تر پای پورې سکرول",
    scrollToStart: "تر پیل پورې سکرول",
    showPassword: "پاسورډ ښکاره کول",
    slideNum: (slide) => `سلايډ ${slide}‏`,
    toggleColorFormat: "د رنګ فارمټ بدلول",
};

registerTranslation(translation);

export default translation;
