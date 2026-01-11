// This is a duplicate of placer-toolkit/dist/internal/animate.ts.
// If this file ever gets outdated, please update this accordingly.

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
