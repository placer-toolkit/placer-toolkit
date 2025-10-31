import { getKitCode } from "../../utilities/kit-code.js";
import type { IconLibrary } from "./library.js";

const faVersion = "7.1.0";

function getIconURL(name: string, iconStyle: string, autoWidth: boolean) {
    const basePath = autoWidth ? "svgs" : "svgs-full";
    const kitCode = getKitCode();
    const isPro = kitCode.length > 0;

    /* Font Awesome Free icons are fetched from jsDelivr, which is GDPR‐compliant.
       Font Awesome Pro and Pro+ icons are fetched from Font Awesome’s Kit CDN,
       which sends users’ IP addresses to Font Awesome’s servers to count pageviews.
       IP addresses are considered personal data under GDPR.

       If you use FA Pro/Pro+, **you** are responsible for:
        • Disclosing this in your website’s privacy policy
        • Ensuring compliance with GDPR and other privacy laws
        • Having a valid legal basis for this data processing

       See the Placer Toolkit privacy policy under https://placer-toolkit.netlify.app/legal/privacy for more information. */
    return isPro
        ? `https://ka-p.fontawesome.com/releases/v${faVersion}/${basePath}/${iconStyle}/${name}.svg?token=${encodeURIComponent(kitCode)}`
        : `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@${faVersion}/${basePath}/${iconStyle}/${name}.svg`;
}

const library: IconLibrary = {
    name: "default",
    resolver: (name: string, iconStyle = "solid", autoWidth = false) => {
        return getIconURL(name, iconStyle, autoWidth);
    },
    mutator: (svg, hostElement) => {
        if (
            hostElement?.iconStyle &&
            !svg.hasAttribute("data-duotone-initialized")
        ) {
            const { iconStyle } = hostElement;

            if (
                iconStyle?.startsWith("duotone") ||
                iconStyle?.startsWith("sharp-duotone") ||
                iconStyle === "jelly-duo-regular" ||
                iconStyle === "notdog-duo-solid" ||
                iconStyle?.startsWith("thumbprint") ||
                iconStyle === "utility-duo-semibold"
            ) {
                const paths = [...svg.querySelectorAll<SVGPathElement>("path")];
                const primaryPath = paths.find(
                    (path) => !path.hasAttribute("opacity"),
                );
                const secondaryPath = paths.find((path) =>
                    path.hasAttribute("opacity"),
                );

                if (!primaryPath || !secondaryPath) {
                    return;
                }

                primaryPath.setAttribute("data-duotone-primary", "");
                secondaryPath.setAttribute("data-duotone-secondary", "");

                if (hostElement.swapOpacity && primaryPath && secondaryPath) {
                    const originalOpacity =
                        secondaryPath.getAttribute("opacity") || "0.4";

                    primaryPath.style.setProperty(
                        "--fa-primary-opacity",
                        originalOpacity,
                    );
                    secondaryPath.style.setProperty(
                        "--fa-secondary-opacity",
                        "1",
                    );
                }

                svg.setAttribute("data-duotone-initialized", "");
            }
        }
    },
};

export default library;
