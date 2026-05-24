import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sq",
    $name: "Shqip",
    $dir: "ltr",

    captions: "Titrat",
    carousel: "Karusel",
    clearEntry: "Fshij hyrjen",
    close: "Mbyll",
    controls: "Kontrollet",
    copied: "Kopjuar!",
    copy: "Kopjo",
    currentValue: "Vlera aktuale",
    enterFullScreen: "Ekran i plotë",
    error: "Gabim",
    exitFullScreen: "Dil nga ekrani i plotë",
    goToSlide: (slide, count) => `Shko te diapozitivi ${slide} nga ${count}`,
    hidePassword: "Fshih fjalëkalimin",
    hue: "Ton ngjyre",
    loading: "Duke u ngarkuar…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Pa zë",
    nextSlide: "Diapozitivi tjetër",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Asnjë opsion nuk u zgjodh";
        } else if (number === 1) {
            return "Një opsion u zgjodh";
        } else {
            return `${number} opsione u zgjodhën`;
        }
    },
    off: "Fikur",
    opacity: "Patejdukshmëri",
    pause: "Pauzo",
    pickAColorFromTheScreen: "Zgjidh një ngjyrë nga ekrani",
    pictureInPicture: "Foto në foto",
    play: "Luaj",
    playbackSpeed: "Shpejtësia e riprodhimit",
    previousSlide: "Diapozitivi i mëparshëm",
    progress: "Progresi",
    remove: "Hiq",
    resize: "Ndrysho madhësinë",
    scrollableRegion: "Zona e lëvizshme",
    scrollToEnd: "Lëviz në fund",
    scrollToStart: "Lëviz në fillim",
    seek: "Kërko",
    settings: "Cilësimet",
    showPassword: "Shfaq fjalëkalimin",
    slideNum: (slide) => `Diapozitivi ${slide}`,
    toggleColorFormat: "Ndrysho formatin e ngjyrës",
    track: (track) => `Pista ${track}`,
    unmute: "Aktivizo zërin",
    videoPlayer: "Luajtës video",
    volume: "Vëllimi",
};

registerTranslation(translation);

export default translation;
