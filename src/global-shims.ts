//! This is a critical file that provides global shims for browser APIs that may not be available in a Node.js environment.
//! This applies to Astro, Next.js, Nuxt.js, SvelteKit, Angular Universal, Remix, Gatsby, 11ty, Jest, Vitest, Web Test Runner and bundlers or environments that use Node.js internally.

if (typeof window === "undefined") {
    if (typeof globalThis.Event === "undefined") {
        globalThis.Event = class EventStub {
            static readonly NONE = 0;
            static readonly CAPTURING_PHASE = 1;
            static readonly AT_TARGET = 2;
            static readonly BUBBLING_PHASE = 3;

            bubbles: boolean = false;
            cancelBubble: boolean = false;
            cancelable: boolean = false;
            composed: boolean = false;
            currentTarget: EventTarget | null = null;
            defaultPrevented: boolean = false;
            eventPhase: number = 0;
            isTrusted: boolean = false;
            returnValue: boolean = true;
            srcElement: EventTarget | null = null;
            target: EventTarget | null = null;
            timeStamp: number = Date.now();
            type: string = "";

            composedPath(): EventTarget[] {
                return [];
            }

            initEvent(
                _type: string,
                _bubbles?: boolean,
                _cancelable?: boolean,
            ): void {}

            preventDefault(): void {
                this.defaultPrevented = true;
            }

            stopImmediatePropagation(): void {}
            stopPropagation(): void {}

            constructor(type?: string, eventInitDict?: EventInit) {
                if (type) this.type = type;

                if (eventInitDict) {
                    if (typeof eventInitDict.bubbles === "boolean") {
                        this.bubbles = eventInitDict.bubbles;
                    }

                    if (typeof eventInitDict.cancelable === "boolean") {
                        this.cancelable = eventInitDict.cancelable;
                    }

                    if (typeof eventInitDict.composed === "boolean") {
                        this.composed = eventInitDict.composed;
                    }
                }
            }
        } as any;
    }

    interface Touch {
        readonly clientX: number;
        readonly clientY: number;
        readonly identifier: number;
        readonly pageX: number;
        readonly pageY: number;
        readonly screenX: number;
        readonly screenY: number;
        readonly radiusX: number;
        readonly radiusY: number;
        readonly rotationAngle: number;
        readonly force: number;
    }

    interface TouchList {
        readonly length: number;
        [index: number]: Touch;
        item(index: number): Touch | null;
    }

    if (typeof globalThis.TouchEvent === "undefined") {
        class TouchEventStub extends (globalThis.Event as typeof Event) {
            public altKey: boolean = false;
            public changedTouches: TouchList = [] as any;
            public ctrlKey: boolean = false;
            public metaKey: boolean = false;
            public shiftKey: boolean = false;
            public targetTouches: TouchList = [] as any;
            public touches: TouchList = [] as any;

            constructor(type: string, eventInitDict?: EventInit) {
                super(type, eventInitDict);
            }
        }

        globalThis.TouchEvent = TouchEventStub as any;
    }

    if (typeof globalThis.MouseEvent === "undefined") {
        class MouseEventStub extends (globalThis.Event as typeof Event) {
            constructor(type: string, eventInitDict?: EventInit) {
                super(type, eventInitDict);
            }
        }
        globalThis.MouseEvent = MouseEventStub as any;
    }

    if (typeof globalThis.window === "undefined") {
        globalThis.window = {
            navigator: {},
        } as any;
    }

    if (typeof globalThis.document === "undefined") {
        globalThis.document = {
            documentElement: {
                dir: "ltr",
                hasAttribute: () => false,
            },
            createElement: (_tagName: string) => ({
                getBoundingClientRect: () => ({
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }),
                style: {},
            }),
            body: {} as any,
        } as any;
    }
}
