import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "fr",
    $name: "Français",
    $dir: "ltr",

    carousel: "Carrousel",
    clearEntry: "Effacer la saisie",
    close: "Fermer",
    copied: "Copié !",
    copy: "Copier",
    currentValue: "Valeur actuelle",
    error: "Erreur",
    goToSlide: (slide, count) => `Aller à la diapositive ${slide} sur ${count}`,
    hidePassword: "Masquer le mot de passe",
    hue: "Teinte",
    loading: "Chargement…",
    nextSlide: "Diapositive suivante",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Aucune option sélectionnée";
        } else if (number === 1) {
            return "Une option sélectionnée";
        } else {
            return `${number} options sélectionnées`;
        }
    },
    opacity: "Opacité",
    pickAColorFromTheScreen: "Choisir une couleur à l’écran",
    previousSlide: "Diapositive précédente",
    progress: "Progrès",
    remove: "Supprimer",
    resize: "Redimensionner",
    scrollableRegion: "Région défilable",
    scrollToEnd: "Aller à la fin",
    scrollToStart: "Aller au début",
    showPassword: "Voir le mot de passe",
    slideNum: (slide) => `Diapositive ${slide}`,
    toggleColorFormat: "Basculer le format de couleur",
};

registerTranslation(translation);

export default translation;
