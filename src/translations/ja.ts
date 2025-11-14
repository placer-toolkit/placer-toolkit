import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ja",
    $name: "日本語",
    $dir: "ltr",

    carousel: "カルーセル",
    clearEntry: "クリア",
    close: "閉じる",
    copied: "コピーしました！",
    copy: "コピー",
    currentValue: "現在の値",
    error: "エラー",
    goToSlide: (slide, count) => `${count}枚中${slide}枚のスライドに移動`,
    hidePassword: "パスワードを隠す",
    hue: "色相",
    loading: "読み込み中…",
    nextSlide: "次のスライド",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "項目が選択されていません";
        } else {
            return `${number}個の項目が選択されました`;
        }
    },
    opacity: "不透明度",
    pickAColorFromTheScreen: "画面から色を選択してください",
    previousSlide: "前のスライド",
    progress: "進行",
    remove: "削除",
    resize: "サイズ変更",
    scrollableRegion: "スクロール可能な領域",
    scrollToEnd: "最後にスクロールする",
    scrollToStart: "最初にスクロールする",
    showPassword: "パスワードを表示",
    slideNum: (slide) => `スライド${slide}`,
    toggleColorFormat: "色のフォーマットを切り替える",
};

registerTranslation(translation);

export default translation;
