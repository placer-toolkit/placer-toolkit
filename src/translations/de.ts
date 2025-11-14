import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "de",
    $name: "Deutsch",
    $dir: "ltr",

    carousel: "Karussell",
    clearEntry: "Eingabe löschen",
    close: "Schließen",
    copied: "Kopiert!",
    copy: "Kopieren",
    currentValue: "Aktueller Wert",
    error: "Fehler",
    goToSlide: (slide, count) => `Gehe zu Folie ${slide} von ${count}`,
    hidePassword: "Passwort verbergen",
    hue: "Farbton",
    loading: "Wird geladen …",
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
    opacity: "Deckkraft",
    pickAColorFromTheScreen: "Farbe vom Bildschirm auswählen",
    previousSlide: "Vorherige Folie",
    progress: "Fortschritt",
    remove: "Entfernen",
    resize: "Größe ändern",
    scrollableRegion: "Scrollbarer Bereich",
    scrollToEnd: "Zum Ende scrollen",
    scrollToStart: "Zum Anfang scrollen",
    showPassword: "Passwort anzeigen",
    slideNum: (slide) => `Folie ${slide}`,
    toggleColorFormat: "Farbformat wechseln",
};

registerTranslation(translation);

export default translation;
