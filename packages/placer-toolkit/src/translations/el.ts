import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "el",
    $name: "Ελληνικά",
    $dir: "ltr",

    captions: "Υπότιτλοι",
    carousel: "Καρουζέλ",
    clearEntry: "Καθαρισμός εισαγωγής",
    close: "Κλείσιμο",
    controls: "Στοιχεία ελέγχου",
    copied: "Αντιγράφηκε!",
    copy: "Αντιγραφή",
    currentValue: "Τρέχουσα τιμή",
    enterFullScreen: "Πλήρης οθόνη",
    error: "Σφάλμα",
    exitFullScreen: "Έξοδος από πλήρη οθόνη",
    goToSlide: (slide, count) =>
        `Μετάβαση στην διαφάνεια ${slide} από ${count}`,
    hidePassword: "Απόκρυψη κωδικού",
    hue: "Τόνος χρώματος",
    loading: "Φόρτωση…",
    maximumValue: "Μέγιστο",
    maximumValueDescriptive: (label) => `${label} (μέγιστη τιμή)`,
    minimumValue: "Ελάχιστο",
    minimumValueDescriptive: (label) => `${label} (ελάχιστη τιμή)`,
    mute: "Σίγαση",
    nextSlide: "Επόμενη διαφάνεια",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Δεν έχει επιλεγεί καμία επιλογή";
        } else if (number === 1) {
            return "Έχει επιλεγεί μία επιλογή";
        } else {
            return `${number} επιλογές επιλεγμένες`;
        }
    },
    off: "Απενεργοποίηση",
    opacity: "Αδιαφάνεια",
    pause: "Παύση",
    pickAColorFromTheScreen: "Επιλέξτε ένα χρώμα από την οθόνη",
    pictureInPicture: "Εικόνα εντός εικόνας",
    play: "Αναπαραγωγή",
    playbackSpeed: "Ταχύτητα αναπαραγωγής",
    previousSlide: "Προηγούμενη διαφάνεια",
    progress: "Πρόοδος",
    remove: "Αφαίρεση",
    resize: "Αλλαγή μεγέθους",
    scrollableRegion: "Περιοχή με δυνατότητα κύλισης",
    scrollToEnd: "Κύλιση στο τέλος",
    scrollToStart: "Κύλιση στην αρχή",
    seek: "Αναζήτηση",
    settings: "Ρυθμίσεις",
    showPassword: "Εμφάνιση κωδικού",
    slideNum: (slide) => `Διαφάνεια ${slide}`,
    toggleColorFormat: "Εναλλαγή μορφής χρώματος",
    track: (track) => `Κοмμάτι ${track}`,
    unmute: "Κατάργηση σίγασης",
    videoPlayer: "Πρόγραμμα αναπαραγωγής βίντεο",
    volume: "Ένταση",
};

registerTranslation(translation);

export default translation;
