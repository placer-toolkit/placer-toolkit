import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ko",
    $name: "한국어",
    $dir: "ltr",

    captions: "자막",
    carousel: "캐러셀",
    clearEntry: "입력 지우기",
    close: "닫기",
    controls: "컨트롤",
    copied: "복사됨!",
    copy: "복사",
    currentValue: "현재 값",
    enterFullScreen: "전체 화면",
    error: "오류",
    exitFullScreen: "전체 화면 종료",
    goToSlide: (slide, count) => `${count}개 중 ${slide}번째 슬라이드로 이동`,
    hidePassword: "비밀번호 숨기기",
    hue: "색상",
    loading: "로딩 중…",
    maximumValue: "최대",
    maximumValueDescriptive: (label) => `${label} (최대값)`,
    minimumValue: "최소",
    minimumValueDescriptive: (label) => `${label} (최소값)`,
    mute: "음소거",
    nextSlide: "다음 슬라이드",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "선택된 옵션 없음";
        } else {
            return `${number}개 옵션 선택됨`;
        }
    },
    off: "끄기",
    opacity: "불투명도",
    pause: "일시중지",
    pickAColorFromTheScreen: "화면에서 색상 선택",
    pictureInPicture: "화면 속 화면",
    play: "재생",
    playbackSpeed: "재생 속도",
    previousSlide: "이전 슬라이드",
    progress: "진행 상황",
    remove: "제거",
    resize: "크기 변경",
    scrollableRegion: "스크롤 영역",
    scrollToEnd: "끝으로 스크롤",
    scrollToStart: "처음으로 스크롤",
    seek: "탐색",
    settings: "설정",
    showPassword: "비밀번호 표시",
    slideNum: (slide) => `슬라이드 ${slide}`,
    toggleColorFormat: "색상 형식 전환",
    track: (track) => `트랙 ${track}`,
    unmute: "음소거 해제",
    videoPlayer: "비디오 플레이어",
    volume: "볼륨",
};

registerTranslation(translation);

export default translation;
