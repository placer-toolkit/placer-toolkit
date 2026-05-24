import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "fr",
    $name: "Français",
    $dir: "ltr",

    captions: "Sous‐titres",
    carousel: "Carrousel",
    clearEntry: "Effacer la saisie",
    close: "Fermer",
    controls: "Commandes",
    copied: "Copié !",
    copy: "Copier",
    currentValue: "Valeur actuelle",
    enterFullScreen: "Plein écran",
    error: "Erreur",
    exitFullScreen: "Quitter le plein écran",
    goToSlide: (slide, count) => `Aller à la diapositive ${slide} sur ${count}`,
    hidePassword: "Masquer le mot de passe",
    hue: "Teinte",
    loading: "Chargement…",
    maximumValue: "Maximum",
    maximumValueDescriptive: (label) => `${label} (maximum)`,
    minimumValue: "Minimum",
    minimumValueDescriptive: (label) => `${label} (minimum)`,
    mute: "Muet",
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
    off: "Désactivé",
    opacity: "Opacité",
    pause: "Pause",
    pickAColorFromTheScreen: "Choisir une couleur à l’écran",
    pictureInPicture: "Image dans l’image",
    play: "Lire",
    playbackSpeed: "Vitesse de lecture",
    previousSlide: "Diapositive précédente",
    progress: "Progrès",
    remove: "Supprimer",
    resize: "Redimensionner",
    scrollableRegion: "Région défilable",
    scrollToEnd: "Aller à la fin",
    scrollToStart: "Aller au début",
    seek: "Chercher",
    settings: "Paramètres",
    showPassword: "Voir le mot de passe",
    slideNum: (slide) => `Diapositive ${slide}`,
    toggleColorFormat: "Basculer le format de couleur",
    track: (track) => `Piste ${track}`,
    unmute: "Réactiver le son",
    videoPlayer: "Lecteur vidéo",
    volume: "Volume",
};

registerTranslation(translation);

export default translation;
