let basePath = "";

export function setBasePath(path: string) {
    basePath = path;
}

export function getBasePath(subpath = "") {
    if (!basePath) {
        const scripts = [
            ...Array.from(document.getElementsByTagName("script")),
        ] as HTMLScriptElement[];
        const configScript = scripts.find((script) =>
            script.hasAttribute("data-placer")
        );

        if (configScript) {
            setBasePath(configScript.getAttribute("data-placer")!);
        } else {
            const fallbackScript = scripts.find((script) => {
                return (
                    /placer(\.min)?\.js($|\?)/.test(script.src) ||
                    /placer-autoloader(\.min)?\.js($|\?)/.test(script.src)
                );
            });
            let path = "";

            if (fallbackScript) {
                path = fallbackScript.getAttribute("src")!;
            }

            setBasePath(path.split("/").slice(0, -1).join("/"));
        }
    }

    return (
        basePath.replace(/\/$/, "") +
        (subpath ? `/${subpath.replace(/^\//, "")}` : ``)
    );
}
