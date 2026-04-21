import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "vi",
    $name: "Tiếng Việt",
    $dir: "ltr",

    captions: "Phụ đề",
    carousel: "Băng chuyền",
    clearEntry: "Xóa nội dung nhập",
    close: "Đóng",
    controls: "Điều khiển",
    copied: "Đã sao chép!",
    copy: "Sao chép",
    currentValue: "Giá trị hiện tại",
    enterFullScreen: "Toàn màn hình",
    error: "Lỗi",
    exitFullScreen: "Thoát toàn màn hình",
    goToSlide: (slide, count) => `Đi đến trang ${slide} trên ${count}`,
    hidePassword: "Ẩn mật khẩu",
    hue: "Tông màu",
    loading: "Đang tải…",
    maximumValue: "Tối đa",
    maximumValueDescriptive: (label) => `${label} (tối đa)`,
    minimumValue: "Tối thiểu",
    minimumValueDescriptive: (label) => `${label} (tối thiểu)`,
    mute: "Tắt tiếng",
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
    off: "Tắt",
    opacity: "Độ đục",
    pause: "Tạm dừng",
    pickAColorFromTheScreen: "Chọn màu từ màn hình",
    pictureInPicture: "Ảnh trong ảnh",
    play: "Phát",
    playbackSpeed: "Tốc độ phát",
    previousSlide: "Trang trước đó",
    progress: "Tiến độ",
    remove: "Gỡ bỏ",
    resize: "Thay đổi kích thước",
    scrollableRegion: "Vùng có thể cuộn",
    scrollToEnd: "Cuộn xuống cuối",
    scrollToStart: "Cuộn lên đầu",
    seek: "Tua",
    settings: "Cài đặt",
    showPassword: "Hiện mật khẩu",
    slideNum: (slide) => `Trang ${slide}`,
    toggleColorFormat: "Chuyển đổi định dạng màu",
    track: (track) => `Luồng ${track}`,
    unmute: "Bật tiếng",
    videoPlayer: "Trình phát video",
    volume: "Âม lượng",
};

registerTranslation(translation);

export default translation;
