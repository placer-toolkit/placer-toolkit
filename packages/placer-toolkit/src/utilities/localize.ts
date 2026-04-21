import {
    LocalizeController as DefaultLocalizationController,
    registerTranslation,
} from "../translations/index.js";
import en from "../translations/en.js";
import type { Translation as DefaultTranslation } from "../translations/index.js";

export class LocalizeController extends DefaultLocalizationController<Translation> {
    static {
        registerTranslation(en);
    }
}

export { registerTranslation } from "../translations/index.js";

export interface Translation extends DefaultTranslation {
    $code: string;
    $name: string;
    $dir: "ltr" | "rtl";

    captions: string;
    carousel: string;
    clearEntry: string;
    close: string;
    controls: string;
    copied: string;
    copy: string;
    currentValue: string;
    enterFullScreen: string;
    error: string;
    exitFullScreen: string;
    goToSlide: (slide: number, count: number) => string;
    hidePassword: string;
    hue: string;
    loading: string;
    maximumValue: string;
    maximumValueDescriptive: (label: string) => string;
    minimumValue: string;
    minimumValueDescriptive: (label: string) => string;
    mute: string;
    nextSlide: string;
    numOptionsSelected: (number: number) => string;
    off: string;
    opacity: string;
    pause: string;
    pickAColorFromTheScreen: string;
    pictureInPicture: string;
    play: string;
    playbackSpeed: string;
    previousSlide: string;
    progress: string;
    remove: string;
    resize: string;
    scrollableRegion: string;
    scrollToEnd: string;
    scrollToStart: string;
    seek: string;
    settings: string;
    showPassword: string;
    slideNum: (slide: number) => string;
    toggleColorFormat: string;
    track: (track: number) => string;
    unmute: string;
    videoPlayer: string;
    volume: string;
}
