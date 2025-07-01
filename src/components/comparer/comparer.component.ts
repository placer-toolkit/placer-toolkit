import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { clamp } from "../../internal/math.js";
import { drag } from "../../internal/drag.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcIcon } from "../icon/icon.js";
import { styles } from "./comparer.styles.js";

/**
 * @summary Compare visual differences between similar content with a sliding panel.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-icon
 *
 * @slot before — The before content, often an `<img>` or `<svg>` element.
 * @slot after — The after content, often an `<img>` or `<svg>` element.
 * @slot handle — The icon used inside the handle.
 *
 * @event pc-change — Emitted when the position of the handle changes.
 *
 * @csspart base — The component’s base wrapper.
 * @csspart before — The container that wraps the before content.
 * @csspart after — The container that wraps the after content.
 * @csspart divider — The divider that separates both sides.
 * @csspart handle — The handle that the user drags to expose the after content.
 *
 * @cssproperty --divider-width — The width of the dividing line.
 * @cssproperty --handle-size — The size of the compare handle.
 */
@customElement("pc-comparer")
export class PcComparer extends LitElement {
    static styles: CSSResultGroup = styles;
    /** @internal This is an internal property. */
    static scopedElement = { "pc-icon": PcIcon };

    /** @internal This is an internal property. */
    @query(".comparer") base!: HTMLElement;
    /** @internal This is an internal property. */
    @query(".comparer-handle") handle!: HTMLElement;

    /** The position of the divider as a percentage. */
    @property({ type: Number, reflect: true }) position = 50;

    private handleDrag(event: PointerEvent) {
        const { width } = this.base.getBoundingClientRect();
        const isRTL =
            document.documentElement.dir === "rtl" ||
            (!document.documentElement.dir &&
                getComputedStyle(document.documentElement).direction === "rtl");

        event.preventDefault();

        drag(this.base, {
            onMove: (x) => {
                this.position = parseFloat(
                    clamp((x / width) * 100, 0, 100).toFixed(2),
                );
                if (isRTL) {
                    this.position = 100 - this.position;
                }
            },
            initialEvent: event,
        });
    }

    private handleKeyDown(event: KeyboardEvent) {
        const isLTR =
            document.documentElement.dir === "ltr" ||
            (document.documentElement.dir === "" &&
                getComputedStyle(document.documentElement).direction === "ltr");
        const isRTL =
            document.documentElement.dir === "rtl" ||
            (!document.documentElement.dir &&
                getComputedStyle(document.documentElement).direction === "rtl");

        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            const increment = event.shiftKey ? 10 : 1;
            let newPosition = this.position;

            event.preventDefault();

            if (
                (isLTR && event.key === "ArrowLeft") ||
                (isRTL && event.key === "ArrowRight")
            ) {
                newPosition -= increment;
            }

            if (
                (isLTR && event.key === "ArrowRight") ||
                (isRTL && event.key === "ArrowLeft")
            ) {
                newPosition += increment;
            }

            if (event.key === "Home") {
                newPosition = 0;
            }

            if (event.key === "End") {
                newPosition = 100;
            }

            newPosition = clamp(newPosition, 0, 100);

            this.position = newPosition;
        }
    }

    /** @internal This is an internal property. */
    @watch("position", { waitUntilFirstUpdate: true })
    handlePositionChange() {
        emit(this, "pc-change");
    }

    render() {
        const isRTL =
            document.documentElement.dir === "rtl" ||
            (!document.documentElement.dir &&
                getComputedStyle(document.documentElement).direction === "rtl");

        return html`
            <div
                part="base"
                class=${classMap({
                    "comparer": true,
                    "comparer-rtl": isRTL === true,
                })}
                id="comparer"
                @keydown=${this.handleKeyDown}
            >
                <div class="comparer-content">
                    <div part="before" class="comparer-before-content">
                        <slot name="before"></slot>
                    </div>

                    <div
                        part="after"
                        class="comparer-after-content"
                        style=${styleMap({
                            clipPath: isRTL
                                ? `inset(0 0 0 ${100 - this.position}%)`
                                : `inset(0 ${100 - this.position}% 0 0)`,
                        })}
                    >
                        <slot name="after"></slot>
                    </div>
                </div>

                <div
                    part="divider"
                    class="comparer-divider"
                    style=${styleMap({
                        left: isRTL
                            ? `${100 - this.position}%`
                            : `${this.position}%`,
                    })}
                    @mousedown=${this.handleDrag}
                    @touchstart=${this.handleDrag}
                >
                    <div
                        part="handle"
                        class="comparer-handle"
                        role="scrollbar"
                        aria-valuenow=${this.position}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-controls="comparer"
                        tabindex="0"
                    >
                        <slot name="handle">
                            <pc-icon
                                library="system"
                                icon-style="solid"
                                name="grip-vertical"
                            ></pc-icon>
                        </slot>
                    </div>
                </div>
            </div>
        `;
    }
}
