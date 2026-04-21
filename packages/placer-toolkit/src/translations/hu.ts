import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "hu",
    $name: "Magyar",
    $dir: "ltr",

    captions: "Feliratok",
    carousel: "Körhinta",
    clearEntry: "Bejegyzés törlése",
    close: "Bezárás",
    controls: "Vezérlők",
    copied: "Másolva!",
    copy: "Másolás",
    currentValue: "Jelenlegi érték",
    enterFullScreen: "Teljes képernyő",
    error: "Hiba",
    exitFullScreen: "Kilépés a teljes képernyőből",
    goToSlide: (slide, count) =>
        `Ugrás ${[1, 5, 6, 7, 8, 10].includes(slide) ? "az" : "a"} ${slide}. diára ${[1, 5, 6, 7, 8, 10].includes(count) ? "az" : "a"} ${count} diából`,
    hidePassword: "Jelszó elrejtése",
    hue: "Színtónus",
    loading: "Betöltés…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Némítás",
    nextSlide: "Következő dia",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Nincs kiválasztott opció";
        } else if (number === 1) {
            return "Egy opció kiválasztva";
        } else {
            return `${number} opció kiválasztva`;
        }
    },
    off: "Ki",
    opacity: "Átlátszatlanság",
    pause: "Szünet",
    pickAColorFromTheScreen: "Válassz egy színt a képernyőről",
    pictureInPicture: "Kép a képben",
    play: "Lejátszás",
    playbackSpeed: "Lejátszási sebesség",
    previousSlide: "Előző dia",
    progress: "Folyamat",
    remove: "Eltávolítás",
    resize: "Átméretezés",
    scrollableRegion: "Görgethető terület",
    scrollToEnd: "Görgetés a végére",
    scrollToStart: "Görgetés az elejére",
    seek: "Keresés",
    settings: "Beállítások",
    showPassword: "Jelszó megjelenítése",
    slideNum: (slide) => `Dia ${slide}`,
    toggleColorFormat: "Színformátum váltása",
    track: (track) => `${track}. sáv`,
    unmute: "Némítás feloldása",
    videoPlayer: "Videólejázó",
    volume: "Hangerő",
};

registerTranslation(translation);

export default translation;
