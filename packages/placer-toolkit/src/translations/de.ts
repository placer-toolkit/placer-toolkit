import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "de",
    $name: "Deutsch",
    $dir: "ltr",

    captions: "Untertitel",
    carousel: "Karussell",
    clearEntry: "Eingabe löschen",
    close: "Schließen",
    controls: "Steuerung",
    copied: "Kopiert!",
    copy: "Kopieren",
    currentValue: "Aktueller Wert",
    enterFullScreen: "Vollbild öffnen",
    error: "Fehler",
    exitFullScreen: "Vollbild beenden",
    goToSlide: (slide, count) => `Zu Folie ${slide} von ${count} springen`,
    hidePassword: "Passwort verbergen",
    hue: "Farbton",
    loading: "Wird geladen …",
    maximumValue: "Höchstwert",
    maximumValueDescriptive: (label) => `${label} (Höchstwert)`,
    minimumValue: "Mindestwert",
    minimumValueDescriptive: (label) => `${label} (Mindestwert)`,
    mute: "Stummschalten",
    nextSlide: "Nächste Folie",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Keine Optionen ausgewählt";
        } else if (number === 1) {
            return "Eine Option ausgewählt";
        } else {
            return `${number} Optionen ausgewählt`;
        }
    },
    off: "Aus",
    opacity: "Deckkraft",
    pause: "Pause",
    pickAColorFromTheScreen: "Farbe vom Bildschirm auswählen",
    pictureInPicture: "Bild‐in‐Bild",
    play: "Abspielen",
    playbackSpeed: "Wiedergabetempo",
    previousSlide: "Vorherige Folie",
    progress: "Fortschritt",
    remove: "Entfernen",
    resize: "Größe ändern",
    scrollableRegion: "Scrollbarer Bereich",
    scrollToEnd: "Zum Ende scrollen",
    scrollToStart: "Zum Anfang scrollen",
    seek: "Suchen",
    settings: "Einstellungen",
    showPassword: "Passwort anzeigen",
    slideNum: (slide) => `Folie ${slide}`,
    toggleColorFormat: "Farbformat wechseln",
    track: (track) => `Spur ${track}`,
    unmute: "Ton einschalten",
    videoPlayer: "Videoplayer",
    volume: "Lautstärke",
};

registerTranslation(translation);

export default translation;
