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
