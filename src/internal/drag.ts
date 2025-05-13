interface DragOptions {
    onMove: (x: number, y: number) => void;
    onStop: () => void;
    initialEvent: PointerEvent;
}

export function drag(container: HTMLElement, options?: Partial<DragOptions>) {
    function move(pointerEvent: PointerEvent) {
        const dims = container.getBoundingClientRect();
        const defaultView = container.ownerDocument.defaultView!;
        const offsetX = dims.left + defaultView.scrollX;
        const offsetY = dims.top + defaultView.scrollY;
        const x = pointerEvent.pageX - offsetX;
        const y = pointerEvent.pageY - offsetY;

        if (options?.onMove) {
            options.onMove(x, y);
        }
    }

    function stop() {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", stop);

        if (options?.onStop) {
            options.onStop();
        }
    }

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerup", stop);

    if (options?.initialEvent instanceof PointerEvent) {
        move(options.initialEvent);
    }
}
