import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ka",
    $name: "ქართული",
    $dir: "ltr",

    captions: "სუბტიტრები",
    carousel: "კარუსელი",
    clearEntry: "ჩანაწერის გასუფთავება",
    close: "დახურვა",
    controls: "მართვა",
    copied: "დაკოპირდა!",
    copy: "კოპირება",
    currentValue: "მიმდინარე მნიშვნელობა",
    enterFullScreen: "სრულ ეკრანზე",
    error: "შეცდომა",
    exitFullScreen: "სრული ეკრანიდან გამოსვლა",
    goToSlide: (slide, count) => `გადასვლა ${slide}-ზე ${count}-დან`,
    hidePassword: "პაროლის დამალვა",
    hue: "ტონალობა",
    loading: "იტვირთება…",
    maximumValue: "მაქსიმალური მნიშვნელობა",
    maximumValueDescriptive: (label) => `${label} (მაქსიმალური)`,
    minimumValue: "მინიმალური მნიშვნელობა",
    minimumValueDescriptive: (label) => `${label} (მინიმალური)`,
    mute: "ხმის გათიშვა",
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
    off: "გამორთული",
    opacity: "გაუმჭვირვალობა",
    pause: "პაუზა",
    pickAColorFromTheScreen: "ფერის არჩევა ეკრანიდან",
    pictureInPicture: "სურათი სურათში",
    play: "გაშვება",
    playbackSpeed: "დაკვრის სიჩქარე",
    previousSlide: "წინა სლაიდი",
    progress: "პროგრესი",
    remove: "წაშლა",
    resize: "ზომის შეცვლა",
    scrollableRegion: "სკროლირებადი არე",
    scrollToEnd: "ბოლოში გადასვლა",
    scrollToStart: "დასაწყისში გადასვლა",
    seek: "ძიება",
    settings: "პარამეტრები",
    showPassword: "პაროლის ჩვენება",
    slideNum: (slide) => `სლაიდი ${slide}`,
    toggleColorFormat: "ფერის ფორმატის შეცვლა",
    track: (track) => `ტრეკი ${track}`,
    unmute: "ხმის ჩართვა",
    videoPlayer: "ვიდეო პლეერი",
    volume: "ხმის სიმაღლე",
};

registerTranslation(translation);

export default translation;
