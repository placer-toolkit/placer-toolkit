const TIMER_ID_KEY = Symbol();

export const debounce = (delay: number) => {
    return <T>(
        _target: T,
        _propertyKey: string,
        descriptor: PropertyDescriptor,
    ) => {
        const func = descriptor.value as (
            this: T & { [TIMER_ID_KEY]: number },
            ...args: unknown[]
        ) => unknown;

        descriptor.value = function (
            this: ThisParameterType<typeof func>,
            ...args: Parameters<typeof func>
        ) {
            clearTimeout(this[TIMER_ID_KEY]);

            this[TIMER_ID_KEY] = window.setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };
};
