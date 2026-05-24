import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "zh-cn",
    $name: "简体中文",
    $dir: "ltr",

    captions: "字幕",
    carousel: "轮播图",
    clearEntry: "清空",
    close: "关闭",
    controls: "控制",
    copied: "已复制！",
    copy: "复制",
    currentValue: "当前值",
    enterFullScreen: "全屏",
    error: "错误",
    exitFullScreen: "退出全屏",
    goToSlide: (slide, count) => `转到第${slide}张幻灯片，共${count}张`,
    hidePassword: "隐藏密码",
    hue: "色相",
    loading: "加载中…",
    maximumValue: "最大值",
    maximumValueDescriptive: (label) => `${label}（最大值）`,
    minimumValue: "最小值",
    minimumValueDescriptive: (label) => `${label}（最小值）`,
    mute: "静音",
    nextSlide: "下一张幻灯片",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "未选择任何项目";
        } else if (number === 1) {
            return "已选择1个项目";
        } else {
            return `${number}个已选择项目`;
        }
    },
    off: "关闭",
    opacity: "不透明度",
    pause: "暂停",
    pickAColorFromTheScreen: "从屏幕选择颜色",
    pictureInPicture: "画中画",
    play: "播放",
    playbackSpeed: "播放速度",
    previousSlide: "上一张幻灯片",
    progress: "进度",
    remove: "删除",
    resize: "调整大小",
    scrollableRegion: "可滚动区域",
    scrollToEnd: "滚动至页尾",
    scrollToStart: "滚动至页首",
    seek: "进度调节",
    settings: "设置",
    showPassword: "显示密码",
    slideNum: (slide) => `幻灯片${slide}`,
    toggleColorFormat: "切换颜色模式",
    track: (track) => `轨道${track}`,
    unmute: "取消静音",
    videoPlayer: "视频播放器",
    volume: "音量",
};

registerTranslation(translation);

export default translation;
