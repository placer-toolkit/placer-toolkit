import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "bn",
    $name: "বাংলা",
    $dir: "ltr",

    carousel: "ক্যারোসেল",
    clearEntry: "এন্ট্রি সাফ করুন",
    close: "বন্ধ করুন",
    copied: "অনুলিপি করা হয়েছে!",
    copy: "অনুলিপি করুন",
    currentValue: "বর্তমান মান",
    error: "ত্রুটি",
    goToSlide: (slide, count) => `স্লাইড ${count} এর মধ্যে ${slide} এ যান`,
    hidePassword: "পাসওয়ার্ড লুকান",
    loading: "লোড হচ্ছে…",
    nextSlide: "পরবর্তী স্লাইড",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "কোনো বিকল্প নির্বাচন করা হয়নি";
        } else if (number === 1) {
            return "একটি বিকল্প নির্বাচন করা হয়েছে";
        } else {
            return `${number} টি বিকল্প নির্বাচন করা হয়েছে`;
        }
    },
    pickAColorFromTheScreen: "স্ক্রিন থেকে একটি রঙ বেছে নিন",
    previousSlide: "পূর্ববর্তী স্লাইড",
    progress: "অগ্রগতি",
    remove: "সরান",
    resize: "আকার পরিবর্তন করুন",
    scrollableRegion: "স্ক্রলযোগ্য অঞ্চল",
    scrollToEnd: "শেষে স্ক্রল করুন",
    scrollToStart: "শুরুতে স্ক্রল করুন",
    showPassword: "পাসওয়ার্ড দেখান",
    slideNum: (slide) => `স্লাইড ${slide}`,
    toggleColorFormat: "রঙের বিন্যাস পরিবর্তন করুন",
};

registerTranslation(translation);

export default translation;
