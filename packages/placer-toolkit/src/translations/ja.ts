import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ja",
    $name: "日本語",
    $dir: "ltr",

    captions: "字幕",
    carousel: "カルーセル",
    clearEntry: "クリア",
    close: "閉じる",
    controls: "コントロール",
    copied: "コピーしました！",
    copy: "コピー",
    currentValue: "現在の値",
    enterFullScreen: "全画面表示",
    error: "エラー",
    exitFullScreen: "全画面表示を終了",
    goToSlide: (slide, count) => `${count}枚中${slide}枚のスライドに移動`,
    hidePassword: "パスワードを隠す",
    hue: "色相",
    loading: "読み込み中…",
    maximumValue: "最大",
    maximumValueDescriptive: (label) => `${label}（最大値）`,
    minimumValue: "最小",
    minimumValueDescriptive: (label) => `${label}（最小値）`,
    mute: "ミュート",
    nextSlide: "次のスライド",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "項目が選択されていません";
        } else {
            return `${number}個の項目が選択されました`;
        }
    },
    off: "オフ",
    opacity: "不透明度",
    pause: "一時停止",
    pickAColorFromTheScreen: "画面から色を選択してください",
    pictureInPicture: "ピクチャーインピクチャー",
    play: "再生",
    playbackSpeed: "再生速度",
    previousSlide: "前のスライド",
    progress: "進行",
    remove: "削除",
    resize: "サイズ変更",
    scrollableRegion: "スクロール可能な領域",
    scrollToEnd: "最後にスクロールする",
    scrollToStart: "最初にスクロールする",
    seek: "シーク",
    settings: "設定",
    showPassword: "パスワードを表示",
    slideNum: (slide) => `スライド${slide}`,
    toggleColorFormat: "色のフォーマットを切り替える",
    track: (track) => `トラック${track}`,
    unmute: "ミュート解除",
    videoPlayer: "ビデオプレーヤー",
    volume: "音量",
};

registerTranslation(translation);

export default translation;
