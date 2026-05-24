import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "cs",
    $name: "Čeština",
    $dir: "ltr",

    captions: "Titulky",
    carousel: "Karusel",
    clearEntry: "Smazat položku",
    close: "Zavřít",
    copied: "Zkopírováno!",
    controls: "Ovládání",
    copy: "Kopírovat",
    currentValue: "Současná hodnota",
    enterFullScreen: "Celá obrazovka",
    error: "Chyba",
    exitFullScreen: "Ukončit celou obrazovku",
    goToSlide: (slide, count) => `Přejít na snímek ${slide} z ${count}`,
    hidePassword: "Skrýt heslo",
    hue: "Tón barvy",
    loading: "Nahrává se…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximální hodnota)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimální hodnota)`,
    mute: "Ztlumit",
    nextSlide: "Další snímek",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Nejsou vybrány žádné možnosti";
        } else if (number === 1) {
            return "Je vybrána jedna možnost";
        } else if (number >= 2 && number <= 4) {
            return `Vybrány ${number} možnosti`;
        } else {
            return `Vybráno ${number} možností`;
        }
    },
    off: "Vypnuto",
    opacity: "Krytí",
    pause: "Pozastavit",
    pickAColorFromTheScreen: "Vybrat barvu z obrazovky",
    pictureInPicture: "Obraz v obraze",
    play: "Přehrát",
    playbackSpeed: "Rychlost přehrávání",
    previousSlide: "Předchozí snímek",
    progress: "Průběh",
    remove: "Odstranit",
    resize: "Změnit velikost",
    scrollableRegion: "Posuvná oblast",
    scrollToEnd: "Posunout na konec",
    scrollToStart: "Posunout na začátek",
    seek: "Posunout",
    settings: "Nastavení",
    showPassword: "Zobrazit heslo",
    slideNum: (slide) => `Snímek ${slide}`,
    toggleColorFormat: "Přepnout formát barvy",
    track: (track) => `Stopa ${track}`,
    unmute: "Zapnout zvuk",
    videoPlayer: "Video přehrávač",
    volume: "Hlasitost",
};

registerTranslation(translation);

export default translation;
