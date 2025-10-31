import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LocalizeController } from "../../utilities/localize.js";
import { clamp } from "../../internal/math.js";
import { drag } from "../../internal/drag.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcIcon } from "../icon/icon.js";
import styles from "./comparer.css";

/**
 * @summary Compare visual differences between similar content with a sliding panel.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-icon
 *
 * @slot before - The before content, often an `<img>` or `<svg>` element.
 * @slot after - The after content, often an `<img>` or `<svg>` element.
 * @slot handle - The icon used inside the handle.
 *
 * @event pc-change - Emitted when the position of the handle changes.
 *
 * @csspart base - The component’s base wrapper.
 * @csspart before - The container that wraps the before content.
 * @csspart after - The container that wraps the after content.
 * @csspart divider - The divider that separates both sides.
 * @csspart handle - The handle that the user drags to expose the after content.
 *
 * @cssproperty --divider-width: 0.125rem - The width of the dividing line.
 * @cssproperty --handle-size: 2.5rem - The size of the compare handle.
 */
@customElement("pc-comparer")
export class PcComparer extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;
    /** @internal This is an internal static property. */
    static scopedElement = { "pc-icon": PcIcon };

    private readonly localize = new LocalizeController(this);

    /** @internal This is an internal class property. */
    @query(".comparer") base!: HTMLElement;
    /** @internal This is an internal class property. */
    @query(".handle") handle!: HTMLElement;

    /** The position of the divider as a percentage. */
    @property({ type: Number, reflect: true }) position = 50;

    private handleDrag(event: PointerEvent) {
        const { width } = this.base.getBoundingClientRect();
        const isRTL = this.localize.dir() === "rtl";

        event.preventDefault();

        drag(this.base, {
            onMove: (x) => {
                const desiredLeft = parseFloat(
                    clamp((x / width) * 100, 0, 100).toFixed(2),
                );

                if (isRTL) {
                    this.position = desiredLeft;
                } else {
                    this.position = parseFloat((100 - desiredLeft).toFixed(2));
                }
            },
            initialEvent: event,
        });
    }

    private handleKeyDown(event: KeyboardEvent) {
        const isRTL = this.localize.dir() === "rtl";

        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            const increment = event.shiftKey ? 10 : 1;

            event.preventDefault();

            let leftPercent = isRTL ? this.position : 100 - this.position;

            if (event.key === "ArrowLeft") {
                leftPercent -= increment;
            }

            if (event.key === "ArrowRight") {
                leftPercent += increment;
            }

            if (event.key === "Home") {
                leftPercent = 0;
            }

            if (event.key === "End") {
                leftPercent = 100;
            }

            leftPercent = clamp(leftPercent, 0, 100);

            if (isRTL) {
                this.position = parseFloat(leftPercent.toFixed(2));
            } else {
                this.position = parseFloat((100 - leftPercent).toFixed(2));
            }
        }
    }

    /** @internal This is an internal method. */
    @watch("position", { waitUntilFirstUpdate: true })
    handlePositionChange() {
        emit(this, "pc-change");
    }

    render() {
        const isRTL = this.localize.dir() === "rtl";

        return html`
            <div
                part="base"
                class=${classMap({
                    "comparer": true,
                    "is-rtl": isRTL,
                })}
                id="comparer"
                @keydown=${this.handleKeyDown}
            >
                <div class="content">
                    <div part="before" class="before-content">
                        <slot name="before"></slot>
                    </div>

                    <div
                        part="after"
                        class="after-content"
                        style=${styleMap({
                            clipPath: isRTL
                                ? `inset(0 ${100 - this.position}% 0 0)`
                                : `inset(0 0 0 ${100 - this.position}%)`,
                        })}
                    >
                        <slot name="after"></slot>
                    </div>
                </div>

                <div
                    part="divider"
                    class="divider"
                    style=${styleMap({
                        left: isRTL
                            ? `${this.position}%`
                            : `${100 - this.position}%`,
                    })}
                    @mousedown=${this.handleDrag}
                    @touchstart=${this.handleDrag}
                >
                    <div
                        part="handle"
                        class="handle"
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

declare global {
    interface HTMLElementTagNameMap {
        "pc-comparer": PcComparer;
    }
}
