import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

/* Note: This file contains literal U+200F (Right-to-Left Mark) characters after numbers.
   Do not remove them – they ensure correct number display in RTL text. */
const translation: Translation = {
    $code: "ur",
    $name: "اردو",
    $dir: "rtl",

    captions: "سب ٹائٹلز",
    carousel: "کیروسیل",
    clearEntry: "اندراج صاف کریں",
    close: "بند کریں",
    controls: "کنٹرولز",
    copied: "کاپی ہو گیا!",
    copy: "کاپی کریں",
    currentValue: "موجودہ قدر",
    enterFullScreen: "فل اسکرین",
    error: "خرابی",
    exitFullScreen: "فل اسکرین سے باہر نکلیں",
    goToSlide: (slide, count) => `سلائیڈ ${slide}‏ پر جائیں ${count}‏ میں سے`,
    hidePassword: "پاس ورڈ چھپائیں",
    hue: "رنگ ٹون",
    loading: "لوڈنگ ہو رہی ہے…",
    maximumValue: "زیادہ سے زیادہ",
    maximumValueDescriptive: (label) => `${label} (زیادہ سے زیادہ قدر)`,
    minimumValue: "کم سے کم",
    minimumValueDescriptive: (label) => `${label} (کم سے کم قدر)`,
    mute: "میوٹ",
    nextSlide: "اگلی سلائیڈ",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return `کوئی آپشن منتخب نہیں ہے`;
        } else if (number === 1) {
            return `ایک آپشن منتخب کیا گیا ہے`;
        } else {
            return `${number}‏ آپشنز منتخب کیے گئے ہیں`;
        }
    },
    off: "بند",
    opacity: "بے شفافیت",
    pause: "روکیں",
    pickAColorFromTheScreen: "اسکرین سے ایک رنگ منتخب کریں",
    pictureInPicture: "تصویر میں تصویر",
    play: "چلائیں",
    playbackSpeed: "پلے بیک کی رفتار",
    previousSlide: "پچھلی سلائیڈ",
    progress: "ترقی",
    remove: "ہٹائیں",
    resize: "سائز تبدیل کریں",
    scrollableRegion: "اسکرول کرنے والا علاقہ",
    scrollToEnd: "آخر تک اسکرول کریں",
    scrollToStart: "شروع تک اسکرول کریں",
    seek: "تلاش",
    settings: "ترتیبات",
    showPassword: "پاس ورڈ دکھائیں",
    slideNum: (slide) => `سلائیڈ ${slide}‏`,
    toggleColorFormat: "رنگ کی شکل تبدیل کریں",
    track: (track) => `ٹریک ${track}‏`,
    unmute: "آواز کھولیں",
    videoPlayer: "ویڈیو پلیئر",
    volume: "آواز",
};

registerTranslation(translation);

export default translation;
