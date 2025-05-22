export function animateTo(
    element: HTMLElement,
    keyframes: Keyframe[],
    options?: KeyframeAnimationOptions,
) {
    return new Promise((resolve) => {
        if (options?.duration === Infinity) {
            throw new Error("Promise‐based animations must be finite.");
        }

        const animation = element.animate(keyframes, {
            ...options,
            duration: prefersReducedMotion() ? 0 : options!.duration,
        });

        animation.addEventListener("cancel", resolve, { once: true });
        animation.addEventListener("finish", resolve, { once: true });
    });
}

export function parseDuration(delay: number | string) {
    delay = delay.toString().toLowerCase();

    if (delay.indexOf("ms") > -1) {
        return parseFloat(delay);
    }

    if (delay.indexOf("s") > -1) {
        return parseFloat(delay) * 1000;
    }

    return parseFloat(delay);
}

export function prefersReducedMotion() {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    return query.matches;
}

export function stopAnimations(element: HTMLElement) {
    return Promise.all(
        element.getAnimations().map((animation) => {
            return new Promise((resolve) => {
                animation.cancel();
                requestAnimationFrame(resolve);
            });
        }),
    );
}

export function shimKeyframesHeightAuto(
    keyframes: Keyframe[],
    calculatedHeight: number,
) {
    return keyframes.map((keyframe) => ({
        ...keyframe,
        height:
            keyframe.height === "auto"
                ? `${calculatedHeight}px`
                : keyframe.height,
    }));
}
