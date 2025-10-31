import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";
import baseTranslation from "./zh-cn.js";

const translation: Translation = {
    ...baseTranslation,

    $code: "zh-tw",
    $name: "繁體中文（台灣）",

    carousel: "輪播圖",
    clearEntry: "清除",
    loading: "載入中……",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "未選擇任何項目";
        } else {
            return `已選擇${number}個項目`;
        }
    },
    pickAColorFromTheScreen: "從螢幕選取顏色",
    scrollableRegion: "可捲動區域",
    scrollToEnd: "捲動至頁尾",
    scrollToStart: "捲動至頁首",
};

registerTranslation(translation);

export default translation;
