import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "gu",
    $name: "ગુજરાતી",
    $dir: "ltr",

    carousel: "કેરોસેલ",
    clearEntry: "એન્ટ્રી સાફ કરો",
    close: "બંધ કરો",
    copied: "નકલ કરવામાં આવ્યું!",
    copy: "નકલ કરો",
    currentValue: "વર્તમાન મૂલ્ય",
    error: "ભૂલ",
    goToSlide: (slide, count) => `${count} માંથી સ્લાઇડ ${slide} પર જાઓ`,
    hidePassword: "પાસવર્ડ છુપાવો",
    hue: "રંગની છટા",
    loading: "લોડ થઈ રહ્યું છે…",
    maximumValue: "મહત્તમ",
    maximumValueDescriptive: (label) => `${label} (મહત્તમ)`,
    minimumValue: "કન્યુનતમ",
    minimumValueDescriptive: (label) => `${label} (કન્યુનતમ)`,
    nextSlide: "આગલી સ્લાઇડ",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "કોઈ વિકલ્પ પસંદ કરેલ નથી";
        } else if (number === 1) {
            return "એક વિકલ્પ પસંદ કરેલ છે";
        } else {
            return `${number} વિકલ્પો પસંદ કરેલ છે`;
        }
    },
    opacity: "અસ્પષ્ટતા",
    pickAColorFromTheScreen: "સ્ક્રીનમાંથી એક રંગ પસંદ કરો",
    previousSlide: "પહેલાની સ્લાઇડ",
    progress: "પ્રગતિ",
    remove: "દૂર કરો",
    resize: "માપ બદલો",
    scrollableRegion: "સ્ક્રોલ કરી શકાય તેવો વિસ્તાર",
    scrollToEnd: "અંત સુધી સ્ક્રોલ કરો",
    scrollToStart: "શરૂઆત સુધી સ્ક્રોલ કરો",
    showPassword: "પાસવર્ડ બતાવો",
    slideNum: (slide) => `સ્લાઇડ ${slide}`,
    toggleColorFormat: "રંગનું ફોર્મેટ બદલો",
};

registerTranslation(translation);

export default translation;
