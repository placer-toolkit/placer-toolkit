import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sw",
    $name: "Kiswahili",
    $dir: "ltr",

    captions: "Manukuu",
    carousel: "Jukwaa la picha",
    clearEntry: "Futa ingizo",
    close: "Funga",
    controls: "Vidhibiti",
    copied: "Imenakiliwa!",
    copy: "Nakili",
    currentValue: "Thamani ya sasa",
    enterFullScreen: "Skrini nzima",
    error: "Hitilafu",
    exitFullScreen: "Ondoka kwenye skrini nzima",
    goToSlide: (slide, count) =>
        `Nenda kwenye slaidi ${slide} kati ya ${count}`,
    hidePassword: "Ficha nenosiri",
    hue: "Tona y rangi",
    loading: "Inapakia…",
    maximumValue: "Juu",
    maximumValueDescriptive: (label) => `${label} (juu)`,
    minimumValue: "Chini",
    minimumValueDescriptive: (label) => `${label} (chini)`,
    mute: "Nyamazisha",
    nextSlide: "Slaidi inayofuata",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Hakuna chaguo zilizochaguliwa";
        } else if (number === 1) {
            return "Chaguo moja limechaguliwa";
        } else {
            return `Chaguo ${number} zimechaguliwa`;
        }
    },
    off: "Zima",
    opacity: "Uwazi",
    pause: "Sitisha",
    pickAColorFromTheScreen: "Chagua rangi kutoka kwenye skrini",
    pictureInPicture: "Picha ndani ya picha",
    play: "Cheza",
    playbackSpeed: "Kasi ya uchezaji",
    previousSlide: "Slaidi iliyopita",
    progress: "Maendeleo",
    remove: "Ondoa",
    resize: "Badilisha ukubwa",
    scrollableRegion: "Eneo linaloweza kusogeza",
    scrollToEnd: "Sogeza hadi mwisho",
    scrollToStart: "Sogeza hadi mwanzo",
    seek: "Tafuta",
    settings: "Mipangilio",
    showPassword: "Onyesha nenosiri",
    slideNum: (slide) => `Slaidi ${slide}`,
    toggleColorFormat: "Badilisha umbizo la rangi",
    track: (track) => `Wimbo ${track}`,
    unmute: "Washa sauti",
    videoPlayer: "Kicheza video",
    volume: "Sauti",
};

registerTranslation(translation);

export default translation;
