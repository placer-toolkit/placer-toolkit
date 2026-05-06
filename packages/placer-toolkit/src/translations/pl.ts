import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "pl",
    $name: "Polski",
    $dir: "ltr",

    captions: "Napisy",
    carousel: "Karuzela",
    clearEntry: "Wyczyść wpis",
    close: "Zamknij",
    controls: "Sterowanie",
    copied: "Skopiowano!",
    copy: "Kopiuj",
    currentValue: "Bieżąca wartość",
    enterFullScreen: "Pełny ekran",
    error: "Błąd",
    exitFullScreen: "Wyjdź z pełnego ekranu",
    goToSlide: (slide, count) => `Przejdź do slajdu ${slide} z ${count}`,
    hidePassword: "Ukryj hasło",
    hue: "Odcień",
    loading: "Ładowanie…",
    maximumValue: "Maksimum",
    maximumValueDescriptive: (label) => `${label} (maksymalna wartość)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimalna wartość)`,
    mute: "Wycisz",
    nextSlide: "Następny slajd",
    numOptionsSelected: (number) => {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        if (number === 0) {
            return "Brak wybranych opcji";
        } else if (number === 1) {
            return "Wybrano jedną opcję";
        } else if (
            lastDigit >= 2 &&
            lastDigit <= 4 &&
            !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
        ) {
            return `Wybrano ${number} opcje`;
        } else {
            return `Wybrano ${number} opcji`;
        }
    },
    off: "Wyłączone",
    opacity: "Krycie",
    pause: "Wstrzymaj",
    pickAColorFromTheScreen: "Wybierz kolor z ekranu",
    pictureInPicture: "Obraz w obrazie",
    play: "Odtwarzaj",
    playbackSpeed: "Prędkość odtwarzania",
    previousSlide: "Poprzedni slajd",
    progress: "Postęp",
    remove: "Usuń",
    resize: "Zmień rozmiar",
    scrollableRegion: "Obszar przewijania",
    scrollToEnd: "Przewiń do końca",
    scrollToStart: "Przewiń do początku",
    seek: "Szukaj",
    settings: "Ustawienia",
    showPassword: "Pokaż hasło",
    slideNum: (slide) => `Slajd ${slide}`,
    toggleColorFormat: "Przełącz format koloru",
    track: (track) => `Ścieżka ${track}`,
    unmute: "Wyłącz wyciszenie",
    videoPlayer: "Odtwarzacz wideo",
    volume: "Głośność",
};

registerTranslation(translation);

export default translation;
