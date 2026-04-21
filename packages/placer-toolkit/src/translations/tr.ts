import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "tr",
    $name: "Türkçe",
    $dir: "ltr",

    captions: "Altyazı",
    carousel: "Karusel",
    clearEntry: "Girişi temizle",
    close: "Kapat",
    controls: "Kontroller",
    copied: "Kopyalandı!",
    copy: "Kopyala",
    currentValue: "Mevcut değer",
    enterFullScreen: "Tam ekran",
    error: "Hata",
    exitFullScreen: "Tam ekrandan çık",
    goToSlide: (slide, count) => `${count} slayttan ${slide}. slayta git`,
    hidePassword: "Parolayı gizle",
    hue: "Renk tonu",
    loading: "Yükleniyor…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Sesi kapat",
    nextSlide: "Sonraki slayt",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Seçilen seçenek yok";
        } else if (number === 1) {
            return "Bir seçenek seçildi";
        } else {
            return `${number} seçenek seçildi`;
        }
    },
    off: "Kapalı",
    opacity: "Opaklık",
    pause: "Duraklat",
    pickAColorFromTheScreen: "Ekrandan bir renk seç",
    pictureInPicture: "Resim içinde resim",
    play: "Oynat",
    playbackSpeed: "Oynatma hızı",
    previousSlide: "Önceki slayt",
    progress: "İlerleme",
    remove: "Kaldır",
    resize: "Boyutlandır",
    scrollableRegion: "Kaydırılabilir alan",
    scrollToEnd: "Sona kaydır",
    scrollToStart: "Başa kaydır",
    seek: "Sar",
    settings: "Ayarlar",
    showPassword: "Parolayı göster",
    slideNum: (slide) => `Slayt ${slide}`,
    toggleColorFormat: "Renk formatını değiştir",
    track: (track) => `Parça ${track}`,
    unmute: "Sesi aç",
    videoPlayer: "Video oynatıcı",
    volume: "Ses düzeyi",
};

registerTranslation(translation);

export default translation;
