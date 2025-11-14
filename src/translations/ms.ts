import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "ms",
    $name: "Melayu",
    $dir: "ltr",

    carousel: "Karusel",
    clearEntry: "Kosongkan entri",
    close: "Tutup",
    copied: "Disalin!",
    copy: "Salin",
    currentValue: "Nilai semasa",
    error: "Ralat",
    goToSlide: (slide, count) => `Pergi ke slaid ${slide} daripada ${count}`,
    hidePassword: "Sembunyi kata laluan",
    hue: "Nada warna",
    loading: "Memuatkan…",
    nextSlide: "Slaid seterusnya",
    numOptionsSelected: (number) => `${number} pilihan telah dipilih`,
    opacity: "Kelegapan",
    pickAColorFromTheScreen: "Pilih warna daripada skrin",
    previousSlide: "Slaid sebelumnya",
    progress: "Kemajuan",
    remove: "Buang",
    resize: "Saiz semula",
    scrollableRegion: "Kawasan boleh tatal",
    scrollToEnd: "Tatal ke hujung",
    scrollToStart: "Tatal ke permulaan",
    showPassword: "Tunjuk kata laluan",
    slideNum: (slide) => `Slaid ${slide}`,
    toggleColorFormat: "Tukar format warna",
};

registerTranslation(translation);

export default translation;
