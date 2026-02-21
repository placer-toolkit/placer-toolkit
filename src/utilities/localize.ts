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

    carousel: string;
    clearEntry: string;
    close: string;
    copied: string;
    copy: string;
    currentValue: string;
    error: string;
    goToSlide: (slide: number, count: number) => string;
    hidePassword: string;
    hue: string;
    loading: string;
    maximumValue: string;
    maximumValueDescriptive: (label: string) => string;
    minimumValue: string;
    minimumValueDescriptive: (label: string) => string;
    nextSlide: string;
    numOptionsSelected: (number: number) => string;
    opacity: string;
    pickAColorFromTheScreen: string;
    previousSlide: string;
    progress: string;
    remove: string;
    resize: string;
    scrollableRegion: string;
    scrollToEnd: string;
    scrollToStart: string;
    showPassword: string;
    slideNum: (slide: number) => string;
    toggleColorFormat: string;
}
