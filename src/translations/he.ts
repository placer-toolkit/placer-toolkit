import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

/* Note: This file contains literal U+200F (Right-to-Left Mark) characters after numbers.
   Do not remove them – they ensure correct number display in RTL text. */
const translation: Translation = {
    $code: "he",
    $name: "עברית",
    $dir: "rtl",

    carousel: "קרוסלה",
    clearEntry: "נקה קלט",
    close: "סגור",
    copied: "הועתק!",
    copy: "העתק",
    currentValue: "ערך נוכחי",
    error: "שגיאה",
    goToSlide: (slide, count) => `עבור לשקופית ${slide}‏ מתוך ${count}‏`,
    hidePassword: "הסתר סיסמה",
    hue: "גוון צבע",
    loading: "טוען…",
    maximumValue: "מקסימום",
    maximumValueDescriptive: (label) => `${label} (מקסימום)`,
    minimumValue: "מינימום",
    minimumValueDescriptive: (label) => `${label} (מינימום)`,
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
    opacity: "אטימות",
    pickAColorFromTheScreen: "בחר צבע מהמסך",
    previousSlide: "השקופית הקודמת",
    progress: "התקדמות",
    remove: "הסר",
    resize: "שנה גודל",
    scrollableRegion: "אזור ניתן לגלילה",
    scrollToEnd: "גלול לסוף",
    scrollToStart: "גלול להתחלה",
    showPassword: "הצג סיסמה",
    slideNum: (slide) => `שקופית ${slide}‏`,
    toggleColorFormat: "החלף פורמט צבע",
};

registerTranslation(translation);

export default translation;
