import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "te",
    $name: "తెలుగు",
    $dir: "ltr",

    captions: "శీర్షికలు",
    carousel: "సెల్యూల్",
    clearEntry: "ఎంట్రీని క్లియర్ చేయండి",
    close: "మూసివేయి",
    controls: "నియంత్రణలు",
    copied: "కాపీ చేయబడింది!",
    copy: "కాపీ చేయి",
    currentValue: "ప్రస్తుత విలువ",
    enterFullScreen: "పూర్తి స్క్రీన్",
    error: "లోపం",
    exitFullScreen: "పూర్তি స్క్రీన్ నుండి నిష్క్రమించు",
    goToSlide: (slide, count) => `${count} లో ${slide} స్లయిడ్‌కి వెళ్లు`,
    hidePassword: "పాస్‌వర్డ్‌ను దాచు",
    hue: "రంగు టోన్",
    loading: "లోడ్ అవుతోంది…",
    maximumValue: "గరిష్ట",
    maximumValueDescriptive: (label) => `${label} (గరిష్ట విలువ)`,
    minimumValue: "కనిష్ట",
    minimumValueDescriptive: (label) => `${label} (కనిష్ట విలువ)`,
    mute: "మ్యూట్",
    nextSlide: "తదుపరి స్లయిడ్",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "ఎంపికలు ఏవీ ఎంచుకోబడలేదు";
        } else if (number === 1) {
            return "ఒక ఎంపిక ఎంచుకోబడింది";
        } else {
            return `${number} ఎంపికలు ఎంచుకోబడ్డాయి`;
        }
    },
    off: "ఆఫ్",
    opacity: "అస్పష్టత",
    pause: "పాజ్",
    pickAColorFromTheScreen: "స్క్రీన్ నుండి ఒక రంగును ఎంచుకోండి",
    pictureInPicture: "పిక్చర్-ఇన్-పిక్చర్",
    play: "ప్లే",
    playbackSpeed: "ప్లేబ్యాక్ వేగం",
    previousSlide: "మునుపటి స్లయిడ్",
    progress: "ప్రగతి",
    remove: "తీసివేయి",
    resize: "పరిమాణాన్ని మార్చండి",
    scrollableRegion: "స్క్రోల్ చేయదగిన ప్రాంతం",
    scrollToEnd: "చివరికి స్క్రోల్ చేయి",
    scrollToStart: "మొదటికి స్క్రోల్ చేయి",
    seek: "వెతకండి",
    settings: "సెట్టింగ్‌లు",
    showPassword: "పాస్‌వర్డ్‌ను చూపు",
    slideNum: (slide) => `స్లయిడ్ ${slide}`,
    toggleColorFormat: "రంగు ఫార్మాట్‌ను మార్చు",
    track: (track) => `ట్రాక్ ${track}`,
    unmute: "మ్యూట్ తీసివేయి",
    videoPlayer: "వీడియో ప్లేయర్",
    volume: "వాల్యూమ్",
};

registerTranslation(translation);

export default translation;
