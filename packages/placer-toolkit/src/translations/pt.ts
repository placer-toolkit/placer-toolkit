import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "pt",
    $name: "Português",
    $dir: "ltr",

    captions: "Legendas",
    carousel: "Carrossel",
    clearEntry: "Limpar campo",
    close: "Fechar",
    controls: "Controles",
    copied: "Copiado",
    copy: "Copiar",
    currentValue: "Valor atual",
    enterFullScreen: "Tela cheia",
    error: "Erro",
    exitFullScreen: "Sair da tela cheia",
    goToSlide: (slide, count) => `Ir para o slide ${slide} de ${count}`,
    hidePassword: "Ocultar senha",
    hue: "Tonalidade",
    loading: "Carregando…",
    maximumValue: "Máximo",
    maximumValueDescriptive: (label) => `${label} (valor máximo)`,
    minimumValue: "Mínimo",
    minimumValueDescriptive: (label) => `${label} (valor mínimo)`,
    mute: "Mudo",
    nextSlide: "Slide seguinte",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Nenhuma opção selecionada";
        } else if (number === 1) {
            return "Uma opção selecionada";
        } else {
            return `${number} opções selecionadas`;
        }
    },
    off: "Desativado",
    opacity: "Opacidade",
    pause: "Pausa",
    pickAColorFromTheScreen: "Escolher uma cor do ecrã",
    pictureInPicture: "Picture‐in‐picture",
    play: "Reproduzir",
    playbackSpeed: "Velocidade de reprodução",
    previousSlide: "Slide anterior",
    progress: "Progresso",
    remove: "Remover",
    resize: "Redimensionar",
    scrollableRegion: "Região rolável",
    scrollToEnd: "Rolar até ao fim",
    scrollToStart: "Rolar até ao início",
    seek: "Buscar",
    settings: "Configurações",
    showPassword: "Mostrar senha",
    slideNum: (slide) => `Slide ${slide}`,
    toggleColorFormat: "Alternar formato de cor",
    track: (track) => `Faixa ${track}`,
    unmute: "Ativar som",
    videoPlayer: "Player de vídeo",
    volume: "Volume",
};

registerTranslation(translation);

export default translation;
