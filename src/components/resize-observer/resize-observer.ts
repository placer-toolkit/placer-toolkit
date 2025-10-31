import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import styles from "./resize-observer.css";

/**
 * @summary The Resize Observer component offers a thin, declarative interface to the [`ResizeObserver` API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
 * @status experimental
 * @since 0.1.0
 *
 * @slot - One or more elements to watch for resizing.
 *
 * @event {{ entries: ResizeObserverEntry[] }} pc-resize - Emitted when the element is resized.
 */
@customElement("pc-resize-observer")
export class PcResizeObserver extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;

    private resizeObserver!: ResizeObserver;
    private observedElements: HTMLElement[] = [];

    /** Disables the resize observer. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    connectedCallback() {
        super.connectedCallback();

        this.resizeObserver = new ResizeObserver(
            (entries: ResizeObserverEntry[]) => {
                emit(this, "pc-resize", {
                    detail: { entries },
                });
            },
        );

        if (!this.disabled) {
            this.startObserver();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.stopObserver();
    }

    private handleSlotChange() {
        if (!this.disabled) {
            this.startObserver();
        }
    }

    private startObserver() {
        const slot = this.shadowRoot!.querySelector("slot");

        if (slot !== null) {
            const elements = slot.assignedElements({
                flatten: true,
            }) as HTMLElement[];

            this.observedElements.forEach((element) =>
                this.resizeObserver.unobserve(element),
            );
            this.observedElements = [];

            elements.forEach((element) => {
                this.resizeObserver.observe(element);
                this.observedElements.push(element);
            });
        }
    }

    private stopObserver() {
        this.resizeObserver.disconnect();
    }

    /** @internal This is an internal method. */
    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        if (this.disabled) {
            this.stopObserver();
        } else {
            this.startObserver();
        }
    }

    render() {
        return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-resize-observer": PcResizeObserver;
    }
}
