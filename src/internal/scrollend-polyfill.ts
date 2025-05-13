type GenericCallback = (this: unknown, ...args: unknown[]) => unknown;

type MethodOf<T, K extends keyof T> = T[K] extends GenericCallback
    ? T[K]
    : never;

const debounce = <T extends GenericCallback>(fn: T, delay: number) => {
    let timerId = 0;

    return function (this: unknown, ...args: unknown[]) {
        window.clearTimeout(timerId);
        timerId = window.setTimeout(() => {
            fn.call(this, ...args);
        }, delay);
    };
};

const decorate = <T, M extends keyof T>(
    proto: T,
    method: M,
    decorateFn: (this: T, superFn: T[M], ...args: unknown[]) => unknown
) => {
    const superFn = proto[method] as MethodOf<T, M>;

    proto[method] = function (this: unknown, ...args: unknown[]) {
        superFn.call(this, ...args);
        decorateFn.call(this as T, superFn, ...args);
    } as MethodOf<T, M>;
};

(() => {
    if (typeof window === "undefined") {
        return;
    }

    const isSupported = "onscrollend" in window;

    if (!isSupported) {
        const pointers = new Set();
        const scrollHandlers = new WeakMap<
            EventTarget,
            EventListenerOrEventListenerObject
        >();

        const handlePointerDown = (event: TouchEvent) => {
            for (const touch of Array.from(event.changedTouches)) {
                pointers.add(touch.identifier);
            }
        };

        const handlePointerUp = (event: TouchEvent) => {
            for (const touch of Array.from(event.changedTouches)) {
                pointers.delete(touch.identifier);
            }
        };

        document.addEventListener("touchstart", handlePointerDown, true);
        document.addEventListener("touchend", handlePointerUp, true);
        document.addEventListener("touchcancel", handlePointerUp, true);

        decorate(
            EventTarget.prototype,
            "addEventListener",
            function (this: EventTarget, addEventListener, type) {
                if (type !== "scrollend") return;

                const handleScrollEnd = debounce(() => {
                    if (!pointers.size) {
                        this.dispatchEvent(new Event("scrollend"));
                    } else {
                        handleScrollEnd();
                    }
                }, 100);

                addEventListener.call(this, "scroll", handleScrollEnd, {
                    passive: true,
                });
                scrollHandlers.set(this, handleScrollEnd);
            }
        );

        decorate(
            EventTarget.prototype,
            "removeEventListener",
            function (this: EventTarget, removeEventListener, type) {
                if (type !== "scrollend") return;

                const scrollHandler = scrollHandlers.get(this);
                if (scrollHandler) {
                    removeEventListener.call(this, "scroll", scrollHandler, {
                        passive: true,
                    } as unknown as EventListenerOptions);
                }
            }
        );
    }
})();

export {};
