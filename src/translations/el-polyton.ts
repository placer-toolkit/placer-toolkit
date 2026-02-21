import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

// Note: This translation is mainly for linguistic purposes. Use Modern Greek (el) in production UI.
const translation: Translation = {
    $code: "el-polyton",
    $name: "Ἑλληνικὰ (Πολυτονικά)",
    $dir: "ltr",

    carousel: "Περιστρεφόμενον",
    clearEntry: "Ἐκκαθάρισις καταχωρίσεως",
    close: "Κλεῖσαι",
    copied: "Ἀντεγράφη!",
    copy: "Ἀντιγραφή",
    currentValue: "Τρέχουσα τιμή",
    error: "Σφάλμα",
    goToSlide: (slide, count) =>
        `Μετάβασις εἰς τὴν διαφάνειαν ${slide} ἐξ ${count}`,
    hidePassword: "Ἀπόκρυψις κωδικοῦ",
    hue: "Τόνος χρώματος",
    loading: "Φόρτωσις…",
    maximumValue: "Μέγιστον",
    maximumValueDescriptive: (label) => `${label} (μεγίστη τιμή)`,
    minimumValue: "Ἐλάχιστον",
    minimumValueDescriptive: (label) => `${label} (ἐλαχίστη τιμή)`,
    nextSlide: "Ἐπόμενη διαφάνειᾱ",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Οὐδεμία ἐπιλογὴ ἐπελέγη";
        } else if (number === 1) {
            return "Μία ἐπιλογὴ ἐπελέγη";
        } else {
            return `${number} ἐπιλογαὶ ἐπελέγησαν`;
        }
    },
    opacity: "Ἀδιαφάνεια",
    pickAColorFromTheScreen: "Ἐπιλέξατε χρῶμα ἐκ τῆς ὀθόνης",
    previousSlide: "Προηγουμένη διαφάνεια",
    progress: "Πρόοδος",
    remove: "Ἀφαίρεσις",
    resize: "Ἀλλαγὴ μεγέθους",
    scrollableRegion: "Κυλιομένη περιοχή",
    scrollToEnd: "Κύλισις πρὸς τὸ τέλος",
    scrollToStart: "Κύλισις πρὸς τὴν ἀρχήν",
    showPassword: "Ἐμφάνισις κωδικοῦ",
    slideNum: (slide) => `Διαφάνεια ${slide}`,
    toggleColorFormat: "Ἐναλλαγὴ μορφῆς χρώματος",
};

registerTranslation(translation);

export default translation;
