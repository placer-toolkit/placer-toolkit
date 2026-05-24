import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

/* Note: This file contains literal U+200F (Right-to-Left Mark) characters after numbers.
   Do not remove them – they ensure correct number display in RTL text. */
const translation: Translation = {
    $code: "pa-Arab",
    $name: "پنجابی (شاہ مکھی)",
    $dir: "rtl",

    captions: "سب ٹائٹلز",
    carousel: "کیروسَل",
    clearEntry: "اندراج صاف کرو",
    close: "بند کرو",
    controls: "کنٹرولز",
    copied: "کاپی ہو گئی!",
    copy: "کاپی کرو",
    currentValue: "موجودہ ویلیو",
    enterFullScreen: "فل اسکرین",
    error: "غلطی",
    exitFullScreen: "فل اسکرین توں باہر",
    goToSlide: (slide, count) => `${count}‏ وچوں سلائیڈ ${slide}‏ اُتے جاؤ`,
    hidePassword: "پاس ورڈ لُکاؤ",
    hue: "رنگ ٹون",
    loading: "لوڈ ہورہا ہے…",
    maximumValue: "زیادہ سے زیادہ",
    maximumValueDescriptive: (label) => `${label} (زیادہ سے زیادہ قدر)`,
    minimumValue: "کم سے کم",
    minimumValueDescriptive: (label) => `${label} (کم سے کم قدر)`,
    mute: "خاموش",
    nextSlide: "اگلی سلائیڈ",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "کوئی آپشن نہیں چُنا گیا";
        } else if (number === 1) {
            return "اک آپشن چُنا گیا";
        } else {
            return `${number}‏ آپشنز چُنے گئے`;
        }
    },
    off: "بند",
    opacity: "غیر شفافیت",
    pause: "روکو",
    pickAColorFromTheScreen: "سکرین توں اک رنگ چُنو",
    pictureInPicture: "تصویر وچ تصویر",
    play: "چلاؤ",
    playbackSpeed: "پلے بیک رفتار",
    previousSlide: "پچھلی سلائیڈ",
    progress: "ترقی",
    remove: "ہٹاؤ",
    resize: "سائز بدلو",
    scrollableRegion: "سکرول والا حصہ",
    scrollToEnd: "آخر تک سکرول کرو",
    scrollToStart: "شروع تک سکرول کرو",
    seek: "لبھو",
    settings: "سیٹنگاں",
    showPassword: "پاس ورڈ وکھاؤ",
    slideNum: (slide) => `سلائیڈ ${slide}‏`,
    toggleColorFormat: "رنگ دا فارمیٹ بدلو",
    track: (track) => `ٹریک ${track}‏`,
    unmute: "آواز کھولو",
    videoPlayer: "ویڈیو پلیئر",
    volume: "آواز",
};

registerTranslation(translation);

export default translation;
