import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ko",
    $name: "한국어",
    $dir: "ltr",

    carousel: "캐러셀",
    clearEntry: "입력 지우기",
    close: "닫기",
    copied: "복사됨!",
    copy: "복사",
    currentValue: "현재 값",
    error: "오류",
    goToSlide: (slide, count) => `${count}개 중 ${slide}번째 슬라이드로 이동`,
    hidePassword: "비밀번호 숨기기",
    hue: "색상",
    loading: "로딩 중…",
    nextSlide: "다음 슬라이드",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "선택된 옵션 없음";
        } else {
            return `${number}개 옵션 선택됨`;
        }
    },
    opacity: "불투명도",
    pickAColorFromTheScreen: "화면에서 색상 선택",
    previousSlide: "이전 슬라이드",
    progress: "진행 상황",
    remove: "제거",
    resize: "크기 변경",
    scrollableRegion: "스크롤 영역",
    scrollToEnd: "끝으로 스크롤",
    scrollToStart: "처음으로 스크롤",
    showPassword: "비밀번호 표시",
    slideNum: (slide) => `슬라이드 ${slide}`,
    toggleColorFormat: "색상 형식 전환",
};

registerTranslation(translation);

export default translation;
