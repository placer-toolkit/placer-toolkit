import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "zh-hk",
    $name: "繁體中文（香港）",
    $dir: "ltr",

    captions: "字幕",
    carousel: "輪播圖",
    clearEntry: "清除",
    close: "关闭",
    controls: "控制項目",
    copied: "已複製！",
    copy: "複製",
    currentValue: "目前值",
    enterFullScreen: "全螢幕",
    error: "錯誤",
    exitFullScreen: "退出全螢幕",
    goToSlide: (slide, count) => `前往第${slide}張幻燈片，共${count}張`,
    hidePassword: "隱藏密碼",
    hue: "色相",
    loading: "載入中…",
    maximumValue: "最大值",
    maximumValueDescriptive: (label) => `${label}（最大值）`,
    minimumValue: "最小值",
    minimumValueDescriptive: (label) => `${label}（最小值）`,
    mute: "靜音",
    nextSlide: "下一張幻燈片",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "未選擇任何項目";
        } else {
            return `已選擇${number}個項目`;
        }
    },
    off: "關閉",
    opacity: "不透明度",
    pause: "暫停",
    pickAColorFromTheScreen: "從螢幕選取顏色",
    pictureInPicture: "子母畫面",
    play: "播放",
    playbackSpeed: "播放速度",
    previousSlide: "上一張幻燈片",
    progress: "進度",
    remove: "刪除",
    resize: "調整大小",
    scrollableRegion: "可捲動區域",
    scrollToEnd: "捲動至頁尾",
    scrollToStart: "捲動至頁首",
    seek: "進度調節",
    settings: "設定",
    showPassword: "顯示密碼",
    slideNum: (slide) => `幻燈片${slide}`,
    toggleColorFormat: "切換顏色模式",
    track: (track) => `軌道${track}`,
    unmute: "取消靜音",
    videoPlayer: "影片播放器",
    volume: "音量",
};

registerTranslation(translation);

export default translation;
