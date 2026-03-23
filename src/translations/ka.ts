import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ka",
    $name: "ქართული",
    $dir: "ltr",

    carousel: "კარუსელი",
    clearEntry: "ჩანაწერის გასუფთავება",
    close: "დახურვა",
    copied: "დაკოპირდა!",
    copy: "კოპირება",
    currentValue: "მიმდინარე მნიშვნელობა",
    error: "შეცდომა",
    goToSlide: (slide, count) => `გადასვლა ${slide}-ზე ${count}-დან`,
    hidePassword: "პაროლის დამალვა",
    hue: "ტონალობა",
    loading: "იტვირთება…",
    maximumValue: "მაქსიმალური მნიშვნელობა",
    maximumValueDescriptive: (label) => `${label} (მაქსიმალური)`,
    minimumValue: "მინიმალური მნიშვნელობა",
    minimumValueDescriptive: (label) => `${label} (მინიმალური)`,
    nextSlide: "შემდეგი სლაიდი",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "არცერთი ოპცია არ არის არჩეული";
        } else if (number === 1) {
            return "არჩეულია 1 ოპცია";
        } else {
            return `არჩეულია ${number} ოპცია`;
        }
    },
    opacity: "გაუმჭვირვალობა",
    pickAColorFromTheScreen: "ფერის არჩევა ეკრანიდან",
    previousSlide: "წინა სლაიდი",
    progress: "პროგრესი",
    remove: "წაშლა",
    resize: "ზომის შეცვლა",
    scrollableRegion: "სკროლირებადი არე",
    scrollToEnd: "ბოლოში გადასვლა",
    scrollToStart: "დასაწყისში გადასვლა",
    showPassword: "პაროლის ჩვენება",
    slideNum: (slide) => `სლაიდი ${slide}`,
    toggleColorFormat: "ფერის ფორმატის შეცვლა",
};

registerTranslation(translation);

export default translation;
