import { html } from "lit";
import {
    customElement,
    eventOptions,
    property,
    query,
    state,
} from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { LocalizeController } from "../../utilities/localize.js";
import { PcHoverEvent } from "../../events/pc-hover.js";
import { clamp } from "../../internal/math.js";
import { watch } from "../../internal/watch.js";
import "../icon/icon.js";
import styles from "./rating.css";

/**
 * @summary Ratings give users a way to quickly view and provide feedback.
 * @status experimental
 * @since 0.1.0
 *
 * @dependency pc-icon
 *
 * @event change - Emitted when the rating’s value changes.
 * @event {{ phase: "start" | "move" | "end", value: number }} pc-hover - Emitted when the user hovers over a value. The `phase` property indicates when hovering starts, moves to a new value or ends. The `value` property tells what the rating’s value would be if the user were to commit to the hovered value.
 *
 * @csspart base - The component’s base wrapper.
 *
 * @cssproperty --icon-color: var(--pc-color-neutral-border-loud) - The inactive colour for icons.
 * @cssproperty --icon-color-active: var(--pc-color-warning-fill-loud) - The active colour for icons.
 * @cssproperty --icon-size: 1.2rem - The icons’ size.
 */
@customElement("pc-rating")
export class PcRating extends PlacerElement {
    static css = styles;

    private readonly localize = new LocalizeController(this);

    @query(".rating") rating!: HTMLElement;

    @state() private hoverValue = 0;
    @state() private isHovering = false;

    /** A label that describes the rating to assistive devices. */
    @property() label = "";

    /** The default rating set for the rating. */
    @property({ type: Number }) value = 0;

    /** The maximum amount able to be set for the rating. */
    @property({ type: Number }) max = 5;

    /** The precision at which the rating will increase and decrease (e.g., to allow half stars, set the `precision` attribute/property to `0.5`). */
    @property({ type: Number }) precision = 1;

    /** Makes the rating readonly. */
    @property({ type: Boolean, reflect: true }) readonly = false;

    /** Disables the rating. */
    @property({ type: Boolean }) disabled = false;

    /** A property that customises the icon to be rendered. The first and only argument is the rating’s current value. The property should return a string containing trusted HTML of the icon to render at the specified value. This works well with `<pc-icon>` elements. */
    @property() getIcon: (value: number, isSelected: boolean) => string = (
        _value,
        isSelected,
    ) => {
        return isSelected
            ? `
                <pc-icon library="system" icon-style="solid" name="star"></pc-icon>
            `
            : `
                <pc-icon library="system" icon-style="regular" name="star"></pc-icon>
            `;
    };

    private getValueFromMousePosition(event: MouseEvent) {
        return this.getValueFromXCoordinate(event.clientX);
    }

    private getValueFromTouchPosition(event: TouchEvent) {
        return this.getValueFromXCoordinate(event.touches[0].clientX);
    }

    private getValueFromXCoordinate(coordinate: number) {
        const isRTL = this.localize.dir() === "rtl";
        const { left, right, width } = this.rating.getBoundingClientRect();
        const value = isRTL
            ? this.roundToPrecision(
                  ((right - coordinate) / width) * this.max,
                  this.precision,
              )
            : this.roundToPrecision(
                  ((coordinate - left) / width) * this.max,
                  this.precision,
              );

        return clamp(value, 0, this.max);
    }

    private handleClick(event: MouseEvent) {
        if (this.disabled) {
            return;
        }

        this.setValue(this.getValueFromMousePosition(event));
        this.updateComplete.then(() => {
            this.dispatchEvent(
                new Event("change", { bubbles: true, composed: true }),
            );
        });
    }

    private setValue(newValue: number) {
        if (this.disabled || this.readonly) {
            return;
        }

        this.value = newValue === this.value ? 0 : newValue;
        this.isHovering = false;
    }

    private handleKeyDown(event: KeyboardEvent) {
        const isLTR = this.localize.dir() === "ltr";
        const isRTL = this.localize.dir() === "rtl";
        const oldValue = this.value;

        if (this.disabled || this.readonly) {
            return;
        }

        if (
            event.key === "ArrowDown" ||
            (isLTR && event.key === "ArrowLeft") ||
            (isRTL && event.key === "ArrowRight")
        ) {
            const decrement = event.shiftKey ? 1 : this.precision;

            this.value = Math.max(0, this.value - decrement);

            event.preventDefault();
        }

        if (
            event.key === "ArrowUp" ||
            (isLTR && event.key === "ArrowRight") ||
            (isRTL && event.key === "ArrowLeft")
        ) {
            const increment = event.shiftKey ? 1 : this.precision;

            this.value = Math.min(this.max, this.value + increment);

            event.preventDefault();
        }

        if (event.key === "Home") {
            this.value = 0;
            event.preventDefault();
        }

        if (event.key === "End") {
            this.value = this.max;
            event.preventDefault();
        }

        if (this.value !== oldValue) {
            this.updateComplete.then(() => {
                this.dispatchEvent(
                    new Event("change", { bubbles: true, composed: true }),
                );
            });
        }
    }

    private handleMouseEnter(event: MouseEvent) {
        this.isHovering = true;
        this.hoverValue = this.getValueFromMousePosition(event);
    }

    private handleMouseMove(event: MouseEvent) {
        this.hoverValue = this.getValueFromMousePosition(event);
    }

    private handleMouseLeave() {
        this.isHovering = false;
    }

    private handleTouchStart(event: TouchEvent) {
        this.isHovering = true;
        this.hoverValue = this.getValueFromTouchPosition(event);

        event.preventDefault();
    }

    @eventOptions({ passive: true })
    private handleTouchMove(event: TouchEvent) {
        this.hoverValue = this.getValueFromTouchPosition(event);
    }

    private handleTouchEnd(event: TouchEvent) {
        this.isHovering = false;
        this.setValue(this.hoverValue);
        this.dispatchEvent(
            new Event("change", { bubbles: true, composed: true }),
        );

        event.preventDefault();
    }

    private roundToPrecision(numberToRound: number, precision = 0.5) {
        const multiplier = 1 / precision;
        return Math.ceil(numberToRound * multiplier) / multiplier;
    }

    @watch("hoverValue")
    handleHoverValueChange() {
        this.dispatchEvent(
            new PcHoverEvent({ phase: "move", value: this.hoverValue }),
        );
    }

    @watch("isHovering")
    handleIsHoveringChange() {
        this.dispatchEvent(
            new PcHoverEvent({
                phase: this.isHovering ? "start" : "end",
                value: this.hoverValue,
            }),
        );
    }

    /** Focuses the rating. */
    focus(options?: FocusOptions) {
        this.rating.focus(options);
    }

    /** Unfocuses the rating (i.e., blurs it). */
    blur() {
        this.rating.blur();
    }

    render() {
        const isRTL = this.localize.dir() === "rtl";
        const counter = Array.from(Array(this.max).keys());
        let displayValue = 0;

        if (this.disabled || this.readonly) {
            displayValue = this.value;
        } else {
            displayValue = this.isHovering ? this.hoverValue : this.value;
        }

        return html`
            <div
                part="base"
                class=${classMap({
                    "rating": true,
                    "readonly": this.readonly,
                    "disabled": this.disabled,
                    "is-rtl": isRTL,
                })}
                role="slider"
                aria-label=${this.label}
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-readonly=${this.readonly ? "true" : "false"}
                aria-valuenow=${this.value}
                aria-valuemin=${0}
                aria-valuemax=${this.max}
                tabindex=${this.disabled || this.readonly ? "-1" : "0"}
                @click=${this.handleClick}
                @keydown=${this.handleKeyDown}
                @mouseenter=${this.handleMouseEnter}
                @touchstart=${this.handleTouchStart}
                @mouseleave=${this.handleMouseLeave}
                @touchend=${this.handleTouchEnd}
                @mousemove=${this.handleMouseMove}
                @touchmove=${this.handleTouchMove}
            >
                <span class="rating-icons">
                    ${counter.map((index) => {
                        const isSelected = displayValue >= index + 1;

                        if (displayValue > index && displayValue < index + 1) {
                            return html`
                                <span
                                    class=${classMap({
                                        "rating-icon": true,
                                        "rating-partial-icon-container": true,
                                        "rating-icon-hover":
                                            this.isHovering &&
                                            Math.ceil(displayValue) ===
                                                index + 1,
                                    })}
                                    role="presentation"
                                >
                                    <div
                                        style=${styleMap({
                                            clipPath: isRTL
                                                ? `inset(0 ${
                                                      (displayValue - index) *
                                                      100
                                                  }% 0 0)`
                                                : `inset(0 0 0 ${
                                                      (displayValue - index) *
                                                      100
                                                  }%)`,
                                        })}
                                    >
                                        ${unsafeHTML(
                                            this.getIcon(index + 1, false),
                                        )}
                                    </div>
                                    <div
                                        class="rating-partial-filled"
                                        style=${styleMap({
                                            clipPath: isRTL
                                                ? `inset(0 0 0 ${
                                                      100 -
                                                      (displayValue - index) *
                                                          100
                                                  }%)`
                                                : `inset(0 ${
                                                      100 -
                                                      (displayValue - index) *
                                                          100
                                                  }% 0 0)`,
                                        })}
                                    >
                                        ${unsafeHTML(
                                            this.getIcon(index + 1, true),
                                        )}
                                    </div>
                                </span>
                            `;
                        }

                        return html`
                            <span
                                class=${classMap({
                                    "rating-icon": true,
                                    "rating-icon-hover":
                                        this.isHovering &&
                                        Math.ceil(displayValue) === index + 1,
                                    "rating-icon-active":
                                        displayValue >= index + 1,
                                })}
                                role="presentation"
                            >
                                ${unsafeHTML(
                                    this.getIcon(index + 1, isSelected),
                                )}
                            </span>
                        `;
                    })}
                </span>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-rating": PcRating;
    }
}
