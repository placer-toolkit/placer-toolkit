/** Animates an element using keyframes. This returns a promise that resolves after the animation completes or gets cancelled. */
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

/** Parses a CSS duration and returns the number in milliseconds (ms). */
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

/** Tells if the user has the “reduced motion” setting enabled in their browser or operating system. */
export function prefersReducedMotion() {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    return query.matches;
}

/** Stops all active animations on the target element. This returns a promise that resolves after all animations are cancelled. */
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

/** Animates `height: auto` and `block-size: auto` by calculating the resulting height and replacing the intrinsic height value (in this case `auto`) with the element’s `scrollHeight` before the animation. */
export function shimKeyframesHeightAuto(
    keyframes: Keyframe[],
    calculatedHeight: number,
) {
    return keyframes.map((keyframe) => {
        const shimmed: Keyframe = { ...keyframe };

        if (keyframe.height === "auto") {
            shimmed.height = `${calculatedHeight}px`;
        }

        if (keyframe.blockSize === "auto") {
            shimmed.blockSize = `${calculatedHeight}px`;
        }

        return shimmed;
    });
}
