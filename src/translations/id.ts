import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "id",
    $name: "Bahasa Indonesia",
    $dir: "ltr",

    carousel: "Karusel",
    clearEntry: "Bersihkan entri",
    close: "Tutup",
    copied: "Disalin!",
    copy: "Salin",
    currentValue: "Nilai saat ini",
    error: "Kesalahan",
    goToSlide: (slide, count) => `Ke slide ${slide} dari ${count}`,
    hidePassword: "Sembunyikan kata sandi",
    loading: "Memuat…",
    nextSlide: "Slide berikutnya",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Tidak ada opsi yang dipilih";
        } else if (number === 1) {
            return "Satu opsi dipilih";
        } else {
            return `${number} opsi dipilih`;
        }
    },
    pickAColorFromTheScreen: "Pilih warna dari layar",
    previousSlide: "Slide sebelumnya",
    progress: "Progres",
    remove: "Hapus",
    resize: "Ubah ukuran",
    scrollableRegion: "Area yang dapat digulir",
    scrollToEnd: "Gulir ke akhir",
    scrollToStart: "Gulir ke awal",
    showPassword: "Tampilkan kata sandi",
    slideNum: (slide) => `Slide ${slide}`,
    toggleColorFormat: "Ubah format warna",
};

registerTranslation(translation);

export default translation;
