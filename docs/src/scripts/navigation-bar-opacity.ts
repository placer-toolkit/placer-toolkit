const navigationBar = document.querySelector<HTMLElement>(".navbar");

const scrollLimitPixels = 656;
const maxOpacity = 0.85;

function updateNavigationBarOpacity() {
    const scrollY = document.body.scrollTop || window.scrollY;

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

window.addEventListener("load", updateNavigationBarOpacity);

document.body.addEventListener("scroll", updateNavigationBarOpacity);

window.addEventListener("resize", updateNavigationBarOpacity);
