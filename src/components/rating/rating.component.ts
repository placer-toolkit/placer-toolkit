import { CSSResultGroup, LitElement, html } from "lit";
import {
    customElement,
    eventOptions,
    property,
    query,
    state,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { clamp } from "../../internal/math.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcIcon } from "../icon/icon.js";
import { styles } from "./rating.styles.js";

@customElement("pc-rating")
export class PcRating extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = { "pc-icon": PcIcon };

    @query(".rating") rating!: HTMLElement;

    @state() private hoverValue = 0;
    @state() private isHovering = false;

    @property({ type: Boolean, reflect: true }) disabled = false;

    @property() label = "";

    @property({ type: Number }) max = 5;

    @property({ type: Number }) precision = 1;

    @property({ type: Boolean, reflect: true }) readonly = false;

    @property({ type: Number }) value = 0;

    @property() getIcon: (value: number) => string = () =>
        `
            <pc-icon library="default" iconStyle="solid" name="star"></pc-icon>
        `;

    private getValueFromMousePosition(event: MouseEvent) {
        return this.getValueFromXCoordinate(event.clientX);
    }

    private getValueFromTouchPosition(event: TouchEvent) {
        return this.getValueFromXCoordinate(event.touches[0].clientX);
    }

    private getValueFromXCoordinate(coordinate: number) {
        const isRTL = document.documentElement.dir === "rtl";
        const { left, right, width } = this.rating.getBoundingClientRect();
        const value = isRTL
            ? this.roundToPrecision(
                  ((right - coordinate) / width) * this.max,
                  this.precision
              )
            : this.roundToPrecision(
                  ((coordinate - left) / width) * this.max,
                  this.precision
              );

        return clamp(value, 0, this.max);
    }

    private handleClick(event: MouseEvent) {
        if (this.disabled) {
            return;
        }

        this.setValue(this.getValueFromMousePosition(event));
        emit(this, "pc-change");
    }

    private setValue(newValue: number) {
        if (this.disabled || this.readonly) {
            return;
        }

        this.value = newValue === this.value ? 0 : newValue;
        this.isHovering = false;
    }

    private handleKeyDown(event: KeyboardEvent) {
        const isLTR =
            !document.documentElement.hasAttribute("dir") ||
            document.documentElement.dir === "ltr";
        const isRTL = document.documentElement.dir === "rtl";
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
            emit(this, "pc-change");
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
        emit(this, "pc-change");

        event.preventDefault();
    }

    private roundToPrecision(numberToRound: number, precision = 0.5) {
        const multiplier = 1 / precision;
        return Math.ceil(numberToRound * multiplier) / multiplier;
    }

    @watch("hoverValue")
    handleHoverValueChange() {
        emit(this, "pc-hover", {
            detail: {
                phase: "move",
                value: this.hoverValue,
            },
        });
    }

    @watch("isHovering")
    handleIsHoveringChange() {
        emit(this, "pc-hover", {
            detail: {
                phase: this.isHovering ? "start" : "end",
                value: this.hoverValue,
            },
        });
    }

    focus(options?: FocusOptions) {
        this.rating.focus(options);
    }

    blur() {
        this.rating.blur();
    }

    render() {
        const isRTL = document.documentElement.dir === "rtl";
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
                    "rating-readonly": this.readonly === true,
                    "rating-disabled": this.disabled === true,
                    "rating-rtl": isRTL === true,
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
                                        ${unsafeHTML(this.getIcon(index + 1))}
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
                                        ${unsafeHTML(this.getIcon(index + 1))}
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
                                ${unsafeHTML(this.getIcon(index + 1))}
                            </span>
                        `;
                    })}
                </span>
            </div>
        `;
    }
}
