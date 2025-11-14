import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "en",
    $name: "English",
    $dir: "ltr",

    carousel: "Carousel",
    clearEntry: "Clear entry",
    close: "Close",
    copied: "Copied!",
    copy: "Copy",
    currentValue: "Current value",
    error: "Error",
    goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
    hidePassword: "Hide password",
    hue: "Hue",
    loading: "Loading…",
    nextSlide: "Next slide",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "No options selected";
        } else if (number === 1) {
            return "One option selected";
        } else {
            return `${number} options selected`;
        }
    },
    opacity: "Opacity",
    pickAColorFromTheScreen: "Pick a color from the screen",
    previousSlide: "Previous slide",
    progress: "Progress",
    remove: "Remove",
    resize: "Resize",
    scrollableRegion: "Scrollable region",
    scrollToEnd: "Scroll to end",
    scrollToStart: "Scroll to start",
    showPassword: "Show password",
    slideNum: (slide) => `Slide ${slide}`,
    toggleColorFormat: "Toggle color format",
};

registerTranslation(translation);

export default translation;
