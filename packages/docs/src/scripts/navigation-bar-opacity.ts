const navigationBar = document.querySelector<HTMLElement>(".navbar");

const scrollLimitPixels = 656;
const maxOpacity = 0.85;

function updateNavigationBarOpacity() {
    const scrollY = window.scrollY;

    let scrollProgressPercent = (scrollY / scrollLimitPixels) * 100;

    scrollProgressPercent = Math.min(100, scrollProgressPercent);

    const scrollRatioDecimal = scrollProgressPercent / 100;
    const opacityDecimal = scrollRatioDecimal * maxOpacity;
    const opacityPercent = opacityDecimal * 100;

    navigationBar?.style.setProperty(
        "--navigation-opacity",
        opacityPercent.toFixed(1) + "%",
    );
}

document.addEventListener("astro:page-load", updateNavigationBarOpacity);
document.addEventListener("astro:after-swap", updateNavigationBarOpacity);
window.addEventListener("scroll", updateNavigationBarOpacity);
window.addEventListener("resize", updateNavigationBarOpacity);
