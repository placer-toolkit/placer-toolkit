import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "vi",
    $name: "Tiếng Việt",
    $dir: "ltr",

    carousel: "Băng chuyền",
    clearEntry: "Xóa nội dung nhập",
    close: "Đóng",
    copied: "Đã sao chép!",
    copy: "Sao chép",
    currentValue: "Giá trị hiện tại",
    error: "Lỗi",
    goToSlide: (slide, count) => `Đi đến trang ${slide} trên ${count}`,
    hidePassword: "Ẩn mật khẩu",
    hue: "Tông màu",
    loading: "Đang tải…",
    maximumValue: "Tối đa",
    maximumValueDescriptive: (label) => `${label} (tối đa)`,
    minimumValue: "Tối thiểu",
    minimumValueDescriptive: (label) => `${label} (tối thiểu)`,
    nextSlide: "Trang tiếp theo",
    numOptionsSelected: (number) => {
        if (number === 0) {
            return "Không có lựa chọn nào";
        } else if (number === 1) {
            return "Một lựa chọn";
        } else {
            return `${number} lựa chọn đã chọn`;
        }
    },
    opacity: "Độ đục",
    pickAColorFromTheScreen: "Chọn màu từ màn hình",
    previousSlide: "Trang trước đó",
    progress: "Tiến độ",
    remove: "Gỡ bỏ",
    resize: "Thay đổi kích thước",
    scrollableRegion: "Vùng có thể cuộn",
    scrollToEnd: "Cuộn xuống cuối",
    scrollToStart: "Cuộn lên đầu",
    showPassword: "Hiện mật khẩu",
    slideNum: (slide) => `Trang ${slide}`,
    toggleColorFormat: "Chuyển đổi định dạng màu",
};

registerTranslation(translation);

export default translation;
