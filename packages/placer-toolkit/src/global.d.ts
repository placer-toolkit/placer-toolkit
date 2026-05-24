declare module "*.css" {
    const styles: string;

    export default styles;
}

interface HTMLInputElement {
    showPicker(): void;
}

interface HTMLVideoElement {
    webkitEnterFullscreen?(): void;
    webkitExitFullscreen?(): void;

    readonly webkitDisplayingFullscreen?: boolean;
}

interface CloseWatcher extends EventTarget {
    requestClose(): void;
    close(): void;
    destroy(): void;

    oncancel: ((event: Event) => void) | null;
    onclose: ((event: Event) => void) | null;
}

interface CloseWatcherConstructor {
    new (options?: CloseWatcherOptions): CloseWatcher;
    prototype: CloseWatcher;
}

interface CloseWatcherOptions {
    signal?: AbortSignal;
}

declare const CloseWatcher: CloseWatcherConstructor;

interface Window {
    CloseWatcher?: CloseWatcherConstructor;
}
