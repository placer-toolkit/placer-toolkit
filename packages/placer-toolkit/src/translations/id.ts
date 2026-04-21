import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "id",
    $name: "Bahasa Indonesia",
    $dir: "ltr",

    captions: "Keterangan",
    carousel: "Karusel",
    clearEntry: "Bersihkan entri",
    close: "Tutup",
    controls: "Kontrol",
    copied: "Disalin!",
    copy: "Salin",
    currentValue: "Nilai saat ini",
    enterFullScreen: "Layar penuh",
    error: "Kesalahan",
    exitFullScreen: "Keluar dari layar penuh",
    goToSlide: (slide, count) => `Ke slide ${slide} dari ${count}`,
    hidePassword: "Sembunyikan kata sandi",
    hue: "Nada warna",
    loading: "Memuat…",
    maximumValue: "Maksimum",
    maximumValueDescriptive: (label) => `${label} (maksimum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Bisukan",
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
    off: "Mati",
    opacity: "Opasitas",
    pause: "Jeda",
    pickAColorFromTheScreen: "Pilih warna dari layar",
    pictureInPicture: "Gambar‐dalam‐gambar",
    play: "Putar",
    playbackSpeed: "Kecepatan putar",
    previousSlide: "Slide sebelumnya",
    progress: "Progres",
    remove: "Hapus",
    resize: "Ubah ukuran",
    scrollableRegion: "Area yang dapat digulir",
    scrollToEnd: "Gulir ke akhir",
    scrollToStart: "Gulir ke awal",
    seek: "Cari",
    settings: "Pengaturan",
    showPassword: "Tampilkan kata sandi",
    slideNum: (slide) => `Slide ${slide}`,
    toggleColorFormat: "Ubah format warna",
    track: (track) => `Trek ${track}`,
    unmute: "Aktifkan suara",
    videoPlayer: "Pemutar video",
    volume: "Volume",
};

registerTranslation(translation);

export default translation;
