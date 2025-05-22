import * as animations from "../../animations/index.js";

export { animations };

export function getAnimationNames() {
    return Object.entries(animations)
        .filter(([name]) => name !== "easings")
        .map(([name]) => name);
}

export function getEasingNames() {
    return Object.entries(animations.easings).map(([name]) => name);
}
