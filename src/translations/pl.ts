import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "pl",
    $name: "Polski",
    $dir: "ltr",

    carousel: "Karuzela",
    clearEntry: "Wyczyść wpis",
    close: "Zamknij",
    copied: "Skopiowano!",
    copy: "Kopiuj",
    currentValue: "Bieżąca wartość",
    error: "Błąd",
    goToSlide: (slide, count) => `Przejdź do slajdu ${slide} z ${count}`,
    hidePassword: "Ukryj hasło",
    loading: "Ładowanie…",
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
    pickAColorFromTheScreen: "Wybierz kolor z ekranu",
    previousSlide: "Poprzedni slajd",
    progress: "Postęp",
    remove: "Usuń",
    resize: "Zmień rozmiar",
    scrollableRegion: "Obszar przewijania",
    scrollToEnd: "Przewiń do końca",
    scrollToStart: "Przewiń do początku",
    showPassword: "Pokaż hasło",
    slideNum: (slide) => `Slajd ${slide}`,
    toggleColorFormat: "Przełącz format koloru",
};

registerTranslation(translation);

export default translation;
