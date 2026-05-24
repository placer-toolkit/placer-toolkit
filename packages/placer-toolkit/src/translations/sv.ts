import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "sv",
    $name: "Svenska",
    $dir: "ltr",

    captions: "Undertexter",
    carousel: "Karusell",
    clearEntry: "Återställ val",
    close: "Stäng",
    controls: "Kontroller",
    copied: "Kopierat!",
    copy: "Kopiera",
    currentValue: "Nuvarande värde",
    enterFullScreen: "Helskärm",
    error: "Fel",
    exitFullScreen: "Avsluta helskärm",
    goToSlide: (slide, count) => `Gå till bild ${slide} av ${count}`,
    hidePassword: "Dölj lösenord",
    hue: "Färgton",
    loading: "Läser in…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Ljud av",
    nextSlide: "Nästa bild",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Inga alternativ har valts";
        } else if (number === 1) {
            return "Ett alternativ valt";
        } else {
            return `${number} alternativ valda`;
        }
    },
    off: "Av",
    opacity: "Opacitet",
    pause: "Pausa",
    pickAColorFromTheScreen: "Välj en färg från skärmen",
    pictureInPicture: "Bild‐i‐bild",
    play: "Spela upp",
    playbackSpeed: "Uppspelnigshastighet",
    previousSlide: "Föregående bild",
    progress: "Framsteg",
    remove: "Ta bort",
    resize: "Ändra storlek",
    scrollableRegion: "Rullningsbar region",
    scrollToEnd: "Skrolla till slutet",
    scrollToStart: "Skrolla till början",
    seek: "Sök",
    settings: "Inställningar",
    showPassword: "Visa lösenord",
    slideNum: (slide) => `Bild ${slide}`,
    toggleColorFormat: "Växla färgformat",
    track: (track) => `Spår ${track}`,
    unmute: "Ljud på",
    videoPlayer: "Videospelare",
    volume: "Volym",
};

registerTranslation(translation);

export default translation;
