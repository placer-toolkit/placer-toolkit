import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "tr",
    $name: "Türkçe",
    $dir: "ltr",

    carousel: "Karusel",
    clearEntry: "Girişi temizle",
    close: "Kapat",
    copied: "Kopyalandı!",
    copy: "Kopyala",
    currentValue: "Mevcut değer",
    error: "Hata",
    goToSlide: (slide, count) => `${count} slayttan ${slide}. slayta git`,
    hidePassword: "Parolayı gizle",
    hue: "Renk tonu",
    loading: "Yükleniyor…",
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
    opacity: "Opaklık",
    pickAColorFromTheScreen: "Ekrandan bir renk seç",
    previousSlide: "Önceki slayt",
    progress: "İlerleme",
    remove: "Kaldır",
    resize: "Boyutlandır",
    scrollableRegion: "Kaydırılabilir alan",
    scrollToEnd: "Sona kaydır",
    scrollToStart: "Başa kaydır",
    showPassword: "Parolayı göster",
    slideNum: (slide) => `Slayt ${slide}`,
    toggleColorFormat: "Renk formatını değiştir",
};

registerTranslation(translation);

export default translation;
