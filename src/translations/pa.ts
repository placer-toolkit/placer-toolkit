import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

/* Note: This file contains literal U+200F (Right-to-Left Mark) characters after numbers.
   Do not remove them – they ensure correct number display in RTL text. */
const translation: Translation = {
    $code: "pa",
    $name: "پنجابی",
    $dir: "rtl",

    carousel: "کیروسَل",
    clearEntry: "اندراج صاف کرو",
    close: "بند کرو",
    copied: "کاپی ہو گئی!",
    copy: "کاپی کرو",
    currentValue: "موجودہ ویلیو",
    error: "غلطی",
    goToSlide: (slide, count) => `${count}‏ وچوں سلائیڈ ${slide}‏ اُتے جاؤ`,
    hidePassword: "پاس ورڈ لُکاؤ",
    hue: "رنگ ٹون",
    loading: "لوڈ ہورہا ہے…",
    maximumValue: "زیادہ سے زیادہ",
    maximumValueDescriptive: (label) => `${label} (زیادہ سے زیادہ قدر)`,
    minimumValue: "کم سے کم",
    minimumValueDescriptive: (label) => `${label} (کم سے کم قدر)`,
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
    opacity: "غیر شفافیت",
    pickAColorFromTheScreen: "سکرین توں اک رنگ چُنو",
    previousSlide: "پچھلی سلائیڈ",
    progress: "ترقی",
    remove: "ہٹاؤ",
    resize: "سائز بدلو",
    scrollableRegion: "سکرول والا حصہ",
    scrollToEnd: "آخر تک سکرول کرو",
    scrollToStart: "شروع تک سکرول کرو",
    showPassword: "پاس ورڈ وکھاؤ",
    slideNum: (slide) => `سلائیڈ ${slide}‏`,
    toggleColorFormat: "رنگ دا فارمیٹ بدلو",
};

registerTranslation(translation);

export default translation;
