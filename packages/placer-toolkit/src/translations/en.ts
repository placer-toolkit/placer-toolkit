import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "en",
    $name: "English",
    $dir: "ltr",

    captions: "Captions",
    carousel: "Carousel",
    clearEntry: "Clear entry",
    close: "Close",
    controls: "Controls",
    copied: "Copied!",
    copy: "Copy",
    currentValue: "Current value",
    enterFullScreen: "Enter full screen",
    error: "Error",
    exitFullScreen: "Exit full screen",
    goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
    hidePassword: "Hide password",
    hue: "Hue",
    loading: "Loading…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximum value)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum value)`,
    mute: "Mute",
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
    off: "Off",
    opacity: "Opacity",
    pause: "Pause",
    pickAColorFromTheScreen: "Pick a color from the screen",
    pictureInPicture: "Picture in Picture",
    play: "Play",
    playbackSpeed: "Playback speed",
    previousSlide: "Previous slide",
    progress: "Progress",
    remove: "Remove",
    resize: "Resize",
    scrollableRegion: "Scrollable region",
    scrollToEnd: "Scroll to end",
    scrollToStart: "Scroll to start",
    seek: "Seek",
    settings: "Settings",
    showPassword: "Show password",
    slideNum: (slide) => `Slide ${slide}`,
    toggleColorFormat: "Toggle color format",
    track: (track) => `Track ${track}`,
    unmute: "Unmute",
    videoPlayer: "Video player",
    volume: "Volume",
};

registerTranslation(translation);

export default translation;
