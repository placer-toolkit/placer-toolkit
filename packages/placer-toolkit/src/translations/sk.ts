import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sk",
    $name: "Slovenčina",
    $dir: "ltr",

    captions: "Titulky",
    carousel: "Karusel",
    clearEntry: "Vymazať položku",
    close: "Zatvoriť",
    controls: "Ovládanie",
    copied: "Skopírované!",
    copy: "Kopírovať",
    currentValue: "Aktuálna hodnota",
    enterFullScreen: "Celá obrazovka",
    error: "Chyba",
    exitFullScreen: "Ukončiť celú obrazovku",
    goToSlide: (slide, count) => `Prejsť na snímku ${slide} z ${count}`,
    hidePassword: "Skryť heslo",
    hue: "Tón farby",
    loading: "Načítava sa…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximálna hodnota)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimálna hodnota)`,
    mute: "Stlmiť",
    nextSlide: "Ďalšia snímka",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Žiadne možnosti nie sú vybrané";
        } else if (number === 1) {
            return "Vybraná je jedna možnosť";
        } else if (number >= 2 && number <= 4) {
            return `Vybrané sú ${number} možnosti`;
        } else {
            return `${number} možností je vybraných`;
        }
    },
    off: "Vypnuté",
    opacity: "Krytie",
    pause: "Pozastaviť",
    pickAColorFromTheScreen: "Vybrať farbu z obrazovky",
    pictureInPicture: "Obraz v obraze",
    play: "Prehrať",
    playbackSpeed: "Rýchlosť prehrávania",
    previousSlide: "Predchádzajúca snímka",
    progress: "Priebeh",
    remove: "Odstrániť",
    resize: "Zmeniť veľkosť",
    scrollableRegion: "Oblasť s možnosťou posúvania",
    scrollToEnd: "Posunúť na koniec",
    scrollToStart: "Posunúť na začiatok",
    seek: "Posunúť",
    settings: "Nastavenia",
    showPassword: "Zobraziť heslo",
    slideNum: (slide) => `Snímka ${slide}`,
    toggleColorFormat: "Prepnúť formát farby",
    track: (track) => `Stopa ${track}`,
    unmute: "Zapnúť zvuk",
    videoPlayer: "Video prehrávač",
    volume: "Hlasitosť",
};

registerTranslation(translation);

export default translation;
