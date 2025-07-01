let basePath: string = "";

export function setBasePath(path: string) {
    if (basePath === null) {
        basePath = path.replace(/\/$/, "");
    }
}

export function getBasePath(subpath = ""): string {
    if (basePath === null) {
        const scripts = Array.from(
            document.getElementsByTagName("script"),
        ) as HTMLScriptElement[];

        const configScript = scripts.find((script) =>
            script.hasAttribute("data-placer"),
        );

        if (configScript) {
            setBasePath(configScript.getAttribute("data-placer")!);
        } else {
            const fallbackScript = scripts.find(
                (script) =>
                    /placer(\.min)?\.js($|\?)/.test(script.src) ||
                    /placer-autoloader(\.min)?\.js($|\?)/.test(script.src),
            );

            if (fallbackScript) {
                const path = fallbackScript.getAttribute("src")!;
                const folder = path.split("/").slice(0, -1).join("/");
                setBasePath(folder);
            } else {
                setBasePath("");
            }
        }
    }

    return basePath + (subpath ? `/${subpath.replace(/^\//, "")}` : "");
}
