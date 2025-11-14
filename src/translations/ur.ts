import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

/* Note: This file contains literal U+200F (Right-to-Left Mark) characters after numbers.
   Do not remove them – they ensure correct number display in RTL text. */
const translation: Translation = {
    $code: "ur",
    $name: "اردو",
    $dir: "rtl",

    carousel: "کیروسیل",
    clearEntry: "اندراج صاف کریں",
    close: "بند کریں",
    copied: "کاپی ہو گیا!",
    copy: "کاپی کریں",
    currentValue: "موجودہ قدر",
    error: "خرابی",
    goToSlide: (slide, count) => `سلائیڈ ${slide}‏ پر جائیں ${count}‏ میں سے`,
    hidePassword: "پاس ورڈ چھپائیں",
    hue: "رنگ ٹون",
    loading: "لوڈنگ ہو رہی ہے…",
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
    opacity: "بے شفافیت",
    pickAColorFromTheScreen: "اسکرین سے ایک رنگ منتخب کریں",
    previousSlide: "پچھلی سلائیڈ",
    progress: "ترقی",
    remove: "ہٹائیں",
    resize: "سائز تبدیل کریں",
    scrollableRegion: "اسکرول کرنے والا علاقہ",
    scrollToEnd: "آخر تک اسکرول کریں",
    scrollToStart: "شروع تک اسکرول کریں",
    showPassword: "پاس ورڈ دکھائیں",
    slideNum: (slide) => `سلائیڈ ${slide}‏`,
    toggleColorFormat: "رنگ کی شکل تبدیل کریں",
};

registerTranslation(translation);

export default translation;
