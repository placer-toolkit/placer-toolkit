import { nanoid } from "nanoid";

/** Ensures a number stays within a minimum and maximum value. This is similar to the CSS `clamp()` function. */
export function clamp(value: number, min: number, max: number) {
    const noNegativeZero = (number: number) =>
        Object.is(number, -0) ? 0 : number;

    if (value < min) {
        return noNegativeZero(min);
    }

    if (value > max) {
        return noNegativeZero(max);
    }

    return noNegativeZero(value);
}

/** Generates a 21‐character long random ID with a specified prefix. */
export function uniqueID(prefix = "") {
    return `${prefix}${nanoid()}`;
}
