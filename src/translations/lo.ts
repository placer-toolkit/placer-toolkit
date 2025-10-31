import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "lo",
    $name: "ລາວ",
    $dir: "ltr",

    carousel: "ພາບສະໄລ້",
    clearEntry: "ລຶບລາຍການ",
    close: "ປິດ",
    copied: "ສຳເນົາແລ້ວ!",
    copy: "ສຳເນົາ",
    currentValue: "ຄ່າປະຈຸບັນ",
    error: "ຜິດພາດ",
    goToSlide: (slide, count) => `ໄປທີ່ສະໄລ້ທີ ${slide} ຈາກ ${count}`,
    hidePassword: "ເຊື່ອງລະຫັດຜ່ານ",
    loading: "ກຳລັງໂຫຼດ…",
    nextSlide: "ສະໄລ້ຕໍ່ໄປ",
    numOptionsSelected: (number) => `ໄດ້ເລືອກ ${number} ຕົວເລືອກ`,
    pickAColorFromTheScreen: "ເລືອກສີຈາກໜ້າຈໍ",
    previousSlide: "ສະໄລ້ກ່ອນໜ້າ",
    progress: "ຄວາມຄືບໜ້າ",
    remove: "ລຶບອອກ",
    resize: "ປັບຂະໜາດ",
    scrollableRegion: "ສ່ວນທີ່ສາມາດເລື່ອນໄດ້",
    scrollToEnd: "ເລື່ອນໄປຈຸດສິ້ນສຸດ",
    scrollToStart: "ເລື່ອນໄປຈຸດເລີ່ມຕົ້ນ",
    showPassword: "ສະແດງລະຫັດຜ່ານ",
    slideNum: (slide) => `ສະໄລ້ ${slide}`,
    toggleColorFormat: "ປ່ຽນຮູບແບບສີ",
};

registerTranslation(translation);

export default translation;
