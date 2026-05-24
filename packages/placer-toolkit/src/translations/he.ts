import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

/* Note: This file contains literal U+200F (Right-to-Left Mark) characters after numbers.
   Do not remove them – they ensure correct number display in RTL text. */
const translation: Translation = {
    $code: "he",
    $name: "עברית",
    $dir: "rtl",

    captions: "כתוביות",
    carousel: "קרוסלה",
    clearEntry: "נקה קלט",
    close: "סגור",
    controls: "פקדים",
    copied: "הועתק!",
    copy: "העתק",
    currentValue: "ערך נוכחי",
    enterFullScreen: "מסך מלא",
    error: "שגיאה",
    exitFullScreen: "יציאה ממסך מלא",
    goToSlide: (slide, count) => `עבור לשקופית ${slide}‏ מתוך ${count}‏`,
    hidePassword: "הסתר סיסמה",
    hue: "גוון צבע",
    loading: "טוען…",
    maximumValue: "מקסימום",
    maximumValueDescriptive: (label) => `${label} (מקסימום)`,
    minimumValue: "מינימום",
    minimumValueDescriptive: (label) => `${label} (מינימום)`,
    mute: "השתק",
    nextSlide: "השקופית הבאה",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return `לא נבחרו אפשרויות`;
        } else if (number === 1) {
            return `אפשרות אחת נבחרה`;
        } else {
            return `${number}‏ אפשרויות נבחרו`;
        }
    },
    off: "כבוי",
    opacity: "אטימות",
    pause: "השהה",
    pickAColorFromTheScreen: "בחר צבע מהמסך",
    pictureInPicture: "תמונה בתוך תמונה",
    play: "נגן",
    playbackSpeed: "מהירות הפעלה",
    previousSlide: "השקופית הקודמת",
    progress: "התקדמות",
    remove: "הסר",
    resize: "שנה גודל",
    scrollableRegion: "אזור ניתן לגלילה",
    scrollToEnd: "גלול לסוף",
    scrollToStart: "גלול להתחלה",
    seek: "חיפוש",
    settings: "הגדרות",
    showPassword: "הצג סיסמה",
    slideNum: (slide) => `שקופית ${slide}‏`,
    toggleColorFormat: "החלף פורמט צבע",
    track: (track) => `רצועה ${track}‏`,
    unmute: "בטל השתקה",
    videoPlayer: "נגן וידאו",
    volume: "עוצמת קול",
};

registerTranslation(translation);

export default translation;
