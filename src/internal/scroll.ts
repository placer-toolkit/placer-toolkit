import { getOffset } from "./offset.js";

const locks = new Set();

/** Returns the width of the document’s scrollbar. */
function getScrollbarWidth() {
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
}

/** Used in conjunction with `scrollbarWidth` to set proper body padding in case the user has already had padding on the `<body>` element. */
function getExistingBodyPadding() {
    const padding = Number(
        getComputedStyle(document.body).paddingRight.replace(/px/, ""),
    );

    if (isNaN(padding) || !padding) {
        return 0;
    }

    return padding;
}

/** Prevents body scrolling. Keeps track of which elements requested a lock so multiple levels of locking are possible without premature unlocking. */
export function lockBodyScrolling(lockingElement: HTMLElement) {
    locks.add(lockingElement);

    if (!document.documentElement.classList.contains("pc-scroll-lock")) {
        const scrollbarWidth = getScrollbarWidth() + getExistingBodyPadding();

        let scrollbarGutterProperty = getComputedStyle(
            document.documentElement,
        ).scrollbarGutter;

        if (!scrollbarGutterProperty || scrollbarGutterProperty === "auto") {
            scrollbarGutterProperty = "stable";
        }

        if (scrollbarWidth < 2) {
            scrollbarGutterProperty = "";
        }
        document.documentElement.style.setProperty(
            "--pc-scroll-lock-gutter",
            scrollbarGutterProperty,
        );
        document.documentElement.classList.add("pc-scroll-lock");
        document.documentElement.style.setProperty(
            "--pc-scroll-lock-size",
            `${scrollbarWidth}px`,
        );
    }
}

/** Unlocks body scrolling. Scrolling will only be unlocked once all elements that requested a lock call this method. */
export function unlockBodyScrolling(lockingElement: HTMLElement) {
    locks.delete(lockingElement);

    if (locks.size === 0) {
        document.documentElement.classList.remove("pc-scroll-lock");
        document.documentElement.style.removeProperty("--pc-scroll-lock-size");
    }
}

/** Scrolls an element into view of its container. If the element is already in view, nothing will happen. */
export function scrollIntoView(
    element: HTMLElement,
    container: HTMLElement,
    direction: "horizontal" | "vertical" | "both" = "vertical",
    behavior: "smooth" | "auto" = "smooth",
) {
    const offset = getOffset(element, container);
    const offsetTop = offset.top + container.scrollTop;
    const offsetLeft = offset.left + container.scrollLeft;
    const minX = container.scrollLeft;
    const maxX = container.scrollLeft + container.offsetWidth;
    const minY = container.scrollTop;
    const maxY = container.scrollTop + container.offsetHeight;

    if (direction === "horizontal" || direction === "both") {
        if (offsetLeft < minX) {
            container.scrollTo({ left: offsetLeft, behavior });
        } else if (offsetLeft + element.clientWidth > maxX) {
            container.scrollTo({
                left: offsetLeft - container.offsetWidth + element.clientWidth,
                behavior,
            });
        }
    }

    if (direction === "vertical" || direction === "both") {
        if (offsetTop < minY) {
            container.scrollTo({ top: offsetTop, behavior });
        } else if (offsetTop + element.clientHeight > maxY) {
            container.scrollTo({
                top: offsetTop - container.offsetHeight + element.clientHeight,
                behavior,
            });
        }
    }
}
