let kitCode = "";

export function setKitCode(code: string) {
    kitCode = code;
}

export function getKitCode() {
    if (!kitCode) {
        const element = document.querySelector("[data-fa-kit-code]");

        if (element) {
            setKitCode(element.getAttribute("data-fa-kit-code") || "");
        }
    }

    return kitCode;
}
