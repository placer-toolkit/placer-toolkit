import { registerTranslation } from "./index.js";
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
    $code: "th",
    $name: "ไทย",
    $dir: "ltr",

    carousel: "ภาพหมุน",
    clearEntry: "ล้างรายการ",
    close: "ปิด",
    copied: "คัดลอกแล้ว!",
    copy: "คัดลอก",
    currentValue: "ค่าปัจจุบัน",
    error: "ข้อผิดพลาด",
    goToSlide: (slide, count) => `ไปที่ภาพที่ ${slide} จาก ${count}`,
    hidePassword: "ซ่อนรหัสผ่าน",
    hue: "โทนสี",
    loading: "กำลังโหลด…",
    maximumValue: "สูงสุด",
    maximumValueDescriptive: (label) => `${label} (สูงสุด)`,
    minimumValue: "ต่ำสุด",
    minimumValueDescriptive: (label) => `${label} (ต่ำสุด)`,
    nextSlide: "ภาพถัดไป",
    numOptionsSelected: (number) => `${number} ตัวเลือกที่เลือก`,
    opacity: "ความทึบแสง",
    pickAColorFromTheScreen: "เลือกสีจากหน้าจอ",
    previousSlide: "ภาพก่อนหน้า",
    progress: "ความคืบหน้า",
    remove: "ลบ",
    resize: "ปรับขนาด",
    scrollableRegion: "ส่วนที่เลื่อนได้",
    scrollToEnd: "เลื่อนไปท้ายสุด",
    scrollToStart: "เลื่อนไปต้นสุด",
    showPassword: "แสดงรหัสผ่าน",
    slideNum: (slide) => `ภาพที่ ${slide}`,
    toggleColorFormat: "สลับรูปแบบสี",
};

registerTranslation(translation);

export default translation;
