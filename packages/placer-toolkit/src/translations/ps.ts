import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

/* Note: This file contains literal U+200F (Right-to-Left Mark) characters after numbers.
   Do not remove them – they ensure correct number display in RTL text. */
const translation: Translation = {
    $code: "ps",
    $name: "پښتو",
    $dir: "rtl",

    captions: "ژباړه",
    carousel: "کیروسل",
    clearEntry: "انټر پاک کړئ",
    close: "بندول",
    controls: "کنټرولونه",
    copied: "کاپی شو!",
    copy: "کاپی کول",
    currentValue: "اوسنی ارزښت",
    enterFullScreen: "بشپړ سکرین",
    error: "تېروتنه",
    exitFullScreen: "له بشپړ سکرین څخه وتل",
    goToSlide: (slide, count) => `سلايډ ${slide}‏ ته لاړ شئ له ${count}‏ څخه`,
    hidePassword: "پاسورډ پټول",
    hue: "د رنګ ټون",
    loading: "په بارولو کې دی…",
    maximumValue: "اعظمي",
    maximumValueDescriptive: (label) => `${label} (اعظمي ارزښت)`,
    minimumValue: "کمترين",
    minimumValueDescriptive: (label) => `${label} (کمترين ارزښت)`,
    mute: "بې غږه کول",
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
    off: "بند",
    opacity: "روڼتیا",
    pause: "بندول",
    pickAColorFromTheScreen: "د سکرین څخه یو رنګ وټاکئ",
    pictureInPicture: "انځور په انځور کې",
    play: "غږول",
    playbackSpeed: "د غږولو سرعت",
    previousSlide: "مخکینی سلايډ",
    progress: "پرمختګ",
    remove: "لرې کول",
    resize: "اندازه بدلول",
    scrollableRegion: "د سکرول کولو ساحه",
    scrollToEnd: "تر پای پورې سکرول",
    scrollToStart: "تر پیل پورې سکرول",
    seek: "لټون",
    settings: "تنظیمات",
    showPassword: "پاسورډ ښکاره کول",
    slideNum: (slide) => `سلايډ ${slide}‏`,
    toggleColorFormat: "د رنګ فارمټ بدلول",
    track: (track) => `ټریک ${track}‏`,
    unmute: "غږ فعالول",
    videoPlayer: "ویډیو پلیر",
    volume: "غږ",
};

registerTranslation(translation);

export default translation;
