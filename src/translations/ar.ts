import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

/* Note: This file contains literal U+200F (Right-to-Left Mark) characters after numbers.
   Do not remove them – they ensure correct number display in RTL text. */
const translation: Translation = {
    $code: "ar",
    $name: "العربية",
    $dir: "rtl",

    carousel: "كاروسيل",
    clearEntry: "مسح الإدخال",
    close: "إغلاق",
    copied: "تم النسخ!",
    copy: "نسخ",
    currentValue: "القيمة الحالية",
    error: "خطأ",
    goToSlide: (slide, count) => `عرض شريحة رقم ${slide}‏ من ${count}`,
    hidePassword: "إخفاء كلمة المرور",
    hue: "درجة اللون",
    loading: "جاري التحميل…",
    nextSlide: "الشريحة التالية",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "لم يتم تحديد أي خيارات";
        } else if (number === 1) {
            return "تم تحديد خيار واحد";
        } else if (number === 2) {
            return "تم تحديد خياران";
        } else if (number >= 3 && number <= 10) {
            return `تم تحديد ${number}‏ خيارات`;
        } else {
            return `تم تحديد ${number}‏ خيارًا`;
        }
    },
    opacity: "العتامة",
    pickAColorFromTheScreen: "اختر لون من الشاشة",
    previousSlide: "الشريحة السابقة",
    progress: "مقدار التقدم",
    remove: "حذف",
    resize: "تغيير الحجم",
    scrollableRegion: "منطقة قابلة للتمرير",
    scrollToEnd: "الانتقال إلى النهاية",
    scrollToStart: "الانتقال إلى البداية",
    showPassword: "عرض كلمة المرور",
    slideNum: (slide) => `شريحة ${slide}‏`,
    toggleColorFormat: "تغيير صيغة عرض اللون",
};

registerTranslation(translation);

export default translation;
