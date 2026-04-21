import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

/* Note: This file contains literal U+200F (Right-to-Left Mark) characters after numbers.
   Do not remove them – they ensure correct number display in RTL text. */
const translation: Translation = {
    $code: "fa",
    $name: "فارسی",
    $dir: "rtl",

    captions: "زیرنویس",
    carousel: "اسلایدشو",
    clearEntry: "پاک کردن ورودی",
    close: "بستن",
    controls: "کنترل‌ها",
    copied: "کپی شد!",
    copy: "کپی کردن",
    currentValue: "مقدار فعلی",
    enterFullScreen: "تمام‌صفحه",
    error: "خطا",
    exitFullScreen: "خروج از تمام‌صفحه",
    goToSlide: (slide, count) => `رفتن به اسلاید ${slide}‏ از ${count}‏`,
    hidePassword: "پنهان کردن رمز عبور",
    hue: "تون رنگ",
    loading: "در حال بارگذاری…",
    maximumValue: "حداکثر",
    maximumValueDescriptive: (label) => `${label} (حداکثر مقدار)`,
    minimumValue: "حداقل",
    minimumValueDescriptive: (label) => `${label} (حداقل مقدار)`,
    mute: "بی‌صدا",
    nextSlide: "اسلاید بعدی",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return `هیچ گزینه‌ای انتخاب نشده است`;
        } else if (number === 1) {
            return `یک گزینه انتخاب شده است`;
        } else {
            return `${number}‏ گزینه انتخاب شده‌اند`;
        }
    },
    off: "خاموش",
    opacity: "شفافیت",
    pause: "توقف موقت",
    pickAColorFromTheScreen: "انتخاب رنگ از روی صفحه",
    pictureInPicture: "تصویر در تصویر",
    play: "پخش",
    playbackSpeed: "سرعت پخش",
    previousSlide: "اسلاید قبلی",
    progress: "پیشرفت",
    remove: "حذف",
    resize: "تغییر اندازه",
    scrollableRegion: "ناحیه قابل اسکرول",
    scrollToEnd: "اسکرول به انتها",
    scrollToStart: "اسکرول به ابتدا",
    seek: "جستجو",
    settings: "تنظیمات",
    showPassword: "نمایش رمز عبور",
    slideNum: (slide) => `اسلاید ${slide}‏`,
    toggleColorFormat: "تغییر فرمت رنگ",
    track: (track) => `قطعه ${track}‏`,
    unmute: "فعال کردن صدا",
    videoPlayer: "ویدیو پلیر",
    volume: "صدا",
};

registerTranslation(translation);

export default translation;
