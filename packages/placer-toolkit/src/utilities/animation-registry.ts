export interface ElementAnimation {
    keyframes: Keyframe[];
    rtlKeyframes?: Keyframe[];
    options?: KeyframeAnimationOptions;
}

export interface ElementAnimationMap {
    [animationName: string]: ElementAnimation;
}

export interface GetAnimationOptions {
    dir: string;
}

const defaultAnimationRegistry = new Map<string, ElementAnimation>();
const customAnimationRegistry = new WeakMap<Element, ElementAnimationMap>();

function ensureAnimation(animation: ElementAnimation | null) {
    return animation ?? { keyframes: [], options: { duration: 0 } };
}

function getLogicalAnimation(animation: ElementAnimation, dir: string) {
    if (dir.toLowerCase() === "rtl") {
        return {
            keyframes: animation.rtlKeyframes || animation.keyframes,
            options: animation.options,
        };
    }

    return animation;
}

export function setDefaultAnimation(
    animationName: string,
    animation: ElementAnimation | null,
) {
    defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}

export function setAnimation(
    element: Element,
    animationName: string,
    animation: ElementAnimation | null,
) {
    customAnimationRegistry.set(element, {
        ...customAnimationRegistry.get(element),
        [animationName]: ensureAnimation(animation),
    });
}

export function getAnimation(
    element: Element,
    animationName: string,
    options: GetAnimationOptions,
) {
    const customAnimation = customAnimationRegistry.get(element);

    if (customAnimation?.[animationName]) {
        return getLogicalAnimation(customAnimation[animationName], options.dir);
    }

    const defaultAnimation = defaultAnimationRegistry.get(animationName);

    if (defaultAnimation) {
        return getLogicalAnimation(defaultAnimation, options.dir);
    }

    return {
        keyframes: [],
        options: { duration: 0 },
    };
}
