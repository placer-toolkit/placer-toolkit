import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "el",
    $name: "Ελληνικά",
    $dir: "ltr",

    carousel: "Καρουζέλ",
    clearEntry: "Καθαρισμός εισαγωγής",
    close: "Κλείσιμο",
    copied: "Αντιγράφηκε!",
    copy: "Αντιγραφή",
    currentValue: "Τρέχουσα τιμή",
    error: "Σφάλμα",
    goToSlide: (slide, count) =>
        `Μετάβαση στην διαφάνεια ${slide} από ${count}`,
    hidePassword: "Απόκρυψη κωδικού",
    hue: "Τόνος χρώματος",
    loading: "Φόρτωση…",
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
    opacity: "Αδιαφάνεια",
    pickAColorFromTheScreen: "Επιλέξτε ένα χρώμα από την οθόνη",
    previousSlide: "Προηγούμενη διαφάνεια",
    progress: "Πρόοδος",
    remove: "Αφαίρεση",
    resize: "Αλλαγή μεγέθους",
    scrollableRegion: "Περιοχή με δυνατότητα κύλισης",
    scrollToEnd: "Κύλιση στο τέλος",
    scrollToStart: "Κύλιση στην αρχή",
    showPassword: "Εμφάνιση κωδικού",
    slideNum: (slide) => `Διαφάνεια ${slide}`,
    toggleColorFormat: "Εναλλαγή μορφής χρώματος",
};

registerTranslation(translation);

export default translation;
