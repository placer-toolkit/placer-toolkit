import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "pt",
    $name: "Português",
    $dir: "ltr",

    carousel: "Carrossel",
    clearEntry: "Limpar campo",
    close: "Fechar",
    copied: "Copiado",
    copy: "Copiar",
    currentValue: "Valor atual",
    error: "Erro",
    goToSlide: (slide, count) => `Ir para o slide ${slide} de ${count}`,
    hidePassword: "Ocultar senha",
    hue: "Tonalidade",
    loading: "Carregando…",
    maximumValue: "Máximo",
    maximumValueDescriptive: (label) => `${label} (valor máximo)`,
    minimumValue: "Mínimo",
    minimumValueDescriptive: (label) => `${label} (valor mínimo)`,
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
    opacity: "Opacidade",
    pickAColorFromTheScreen: "Escolher uma cor do ecrã",
    previousSlide: "Slide anterior",
    progress: "Progresso",
    remove: "Remover",
    resize: "Redimensionar",
    scrollableRegion: "Região rolável",
    scrollToEnd: "Rolar até ao fim",
    scrollToStart: "Rolar até ao início",
    showPassword: "Mostrar senha",
    slideNum: (slide) => `Slide ${slide}`,
    toggleColorFormat: "Alternar formato de cor",
};

registerTranslation(translation);

export default translation;
