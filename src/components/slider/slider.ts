import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerFormAssociatedElement } from "../../internal/placer-form-associated-element.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { SliderValidator } from "../../internal/validators/slider-validator.js";
import { HasSlotController } from "../../internal/slot.js";
import { LocalizeController } from "../../utilities/localize.js";
import { DraggableElement } from "../../internal/drag.js";
import { submitOnEnter } from "../../internal/submit-on-enter.js";
import { clamp } from "../../internal/math.js";
import "../tooltip/tooltip.js";
import type { PcTooltip } from "../tooltip/tooltip.js";
import formControlStyles from "../../styles/component-styles/form-control.css";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./slider.css";

/**
 * @summary Sliders allow the user to select a single value within a given range.
 * @status experimental
 * @since 1.0.0-alpha.4
 *
 * @dependency pc-tooltip
 *
 * @slot label - The slider label. Alternatively, you can use the `label` attribute.
 * @slot hint - Text that describes how to use the input. Alternatively, you can use the `hint` attribute.
 * @slot reference - One or more reference labels to show visually below the slider.
 *
 * @event change - Emitted when an alteration to the control’s value is committed by the user.
 * @event input - Emitted when the control receives input.
 * @event focus - Emitted when the control gains focus.
 * @event blur - Emitted when the control loses focus.
 * @event pc-invalid - Emitted when the slider has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart label - The element that contains the slider’s label.
 * @csspart hint - The element that contains the slider’s hint.
 * @csspart slider - The focusable element with `role="slider"`. Contains the `track` and `reference` slot.
 * @csspart track - The slider’s track.
 * @csspart indicator - The colored indicator that shows from the start of the slider to the current value.
 * @csspart markers - The container that holds all the markers when `with-markers` is used.
 * @csspart marker - The individual markers that are shown when `with-markers` is used.
 * @csspart references - The container that holds references that get slotted in.
 * @csspart thumb - The slider’s thumb.
 * @csspart thumb-min - The thumb representing the minimum value in a range slider.
 * @csspart thumb-max - The thumb representing the maximum value in a range slider.
 * @csspart tooltip - The tooltip, a `<pc-tooltip>` element.
 * @csspart tooltip-tooltip - The tooltip’s `tooltip` part.
 * @csspart tooltip-content - The tooltip’s `content` part.
 * @csspart tooltip-arrow - The tooltip’s `arrow` part.
 *
 * @cssproperty --track-size: 0.75em - The height or width of the slider's track.
 * @cssproperty --marker-width: 0.1875em - The width of each individual marker.
 * @cssproperty --marker-height: 0.1875em - The height of each individual marker.
 * @cssproperty --thumb-width: 1.25em - The width of the thumb.
 * @cssproperty --thumb-height: 1.25em - The height of the thumb.
 */
@customElement("pc-slider")
export class PcSlider extends PlacerFormAssociatedElement {
    static formAssociated = true;
    static observeSlots = true;
    static css = [sizeStyles, formControlStyles, styles];

    static get validators() {
        return [...super.validators, SliderValidator()] as any;
    }

    private draggableTrack!: DraggableElement;
    private draggableThumbMin: DraggableElement | null = null;
    private draggableThumbMax: DraggableElement | null = null;

    private readonly hasSlotController = new HasSlotController(
        this,
        "hint",
        "label",
    );
    private readonly localize = new LocalizeController(this);

    private trackBoundingClientRect!: DOMRect;
    private valueWhenDraggingStarted: number | undefined | null;
    private activeThumb: "min" | "max" | null = null;
    private lastTrackPosition: number | null = null;

    protected get focusableAnchor() {
        return this.isRange ? this.thumbMin || this.slider : this.slider;
    }

    /** Overrides the validation target to point to the focusable element. */
    get validationTarget() {
        return this.focusableAnchor;
    }

    @query('[part~="slider"]') slider!: HTMLElement;
    @query('[part~="thumb"]') thumb!: HTMLElement;
    @query('[part~="thumb-min"]') thumbMin!: HTMLElement;
    @query('[part~="thumb-max"]') thumbMax!: HTMLElement;
    @query('[part~="track"]') track!: HTMLElement;
    @query('[part~="tooltip-min"]') tooltipMin!: PcTooltip;
    @query('[part~="tooltip-max"]') tooltipMax!: PcTooltip;
    @query('[part~="tooltip"]') tooltip!: PcTooltip;

    /** The slider’s label. If you need to provide HTML in the label, use the `label` slot instead. */
    @property() label: string = "";

    /** The slider’s hint. If you need to display HTML, use the `hint` slot instead. */
    @property({ attribute: "hint" }) hint = "";

    /** The name of the slider, submitted as a name/value pair with form data. */
    @property({ reflect: true }) name!: string;

    /** The minimum value of a range selection. This is only used when the `range` attribute is set. */
    @property({ type: Number, attribute: "min-value" }) minValue = 0;

    /** The maximum value of a range selection. This is only used when the `range` attribute is set. */
    @property({ type: Number, attribute: "max-value" }) maxValue = 50;

    /** The default value of the slider. Primarily used for resetting the slider. */
    @property({ attribute: "value", reflect: true, type: Number })
    defaultValue: number =
        this.getAttribute("value") == null
            ? this.minValue
            : Number(this.getAttribute("value"));

    private _value: number = this.defaultValue;

    /** The current value of the slider, submitted as a name/value pair with form data. */
    get value(): number {
        if (this.valueHasChanged) {
            return this._value;
        }

        return this._value ?? this.defaultValue;
    }

    @state()
    set value(value: number | null) {
        value = Number(value) ?? this.minValue;

        if (this._value === value) {
            return;
        }

        this.valueHasChanged = true;
        this._value = value;
    }

    /** Converts the slider to a range slider with two thumbs. */
    @property({ type: Boolean, reflect: true }) range = false;

    /** Get if this is a range slider. */
    get isRange(): boolean {
        return this.range;
    }

    /** Disables the slider. */
    @property({ type: Boolean }) disabled = false;

    /** Makes the slider a read‐only field. */
    @property({ type: Boolean, reflect: true }) readonly = false;

    /** The orientation of the slider. */
    @property({ reflect: true }) orientation: "horizontal" | "vertical" =
        "horizontal";

    /** The slider’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** The starting value from which to draw the slider’s fill, which is based on its current value. */
    @property({ attribute: "indicator-offset", type: Number })
    indicatorOffset?: number;

    /** The minimum value allowed. */
    @property({ type: Number }) min: number = 0;

    /** The maximum value allowed. */
    @property({ type: Number }) max: number = 100;

    /** The granularity the value must adhere to when incrementing and decrementing the value. */
    @property({ type: Number }) step: number = 1;

    /** Indicates if the slider must be interacted with or not. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** Tells the browser to focus the slider when the page loads or a dialog is shown. */
    @property({ type: Boolean }) autofocus!: boolean;

    /** The distance of the tooltip from the slider’s thumb. */
    @property({ attribute: "tooltip-distance", type: Number }) tooltipDistance =
        8;

    /** The placement of the tooltip in reference to the slider’s thumb. */
    @property({ attribute: "tooltip-placement", reflect: true })
    tooltipPlacement: "top" | "right" | "bottom" | "left" = "top";

    /** Adds markers at each step along the slider. */
    @property({ attribute: "with-markers", type: Boolean }) withMarkers = false;

    /** Adds a tooltip above the thumb when the control has focus or is dragged. */
    @property({ attribute: "has-tooltip", type: Boolean }) hasTooltip = false;

    /** A custom formatting function to apply to the value. This will be shown in the tooltip and announced by screen readers and is property only. */
    @property({ attribute: false }) valueFormatter?: (value: number) => string;

    firstUpdated() {
        if (this.isRange) {
            this.draggableThumbMin = new DraggableElement(this.thumbMin, {
                start: () => {
                    this.activeThumb = "min";
                    this.trackBoundingClientRect =
                        this.track.getBoundingClientRect();
                    this.valueWhenDraggingStarted = this.minValue;
                    this.customStates.set("dragging", true);
                    this.showRangeTooltips();
                },
                move: (x, y) => {
                    this.setThumbValueFromCoordinates(x, y, "min");
                },
                stop: () => {
                    if (this.minValue !== this.valueWhenDraggingStarted) {
                        this.updateComplete.then(() => {
                            this.dispatchEvent(
                                new Event("change", {
                                    bubbles: true,
                                    composed: true,
                                }),
                            );
                        });

                        this.hasInteracted = true;
                    }

                    this.hideRangeTooltips();

                    this.customStates.set("dragging", false);
                    this.valueWhenDraggingStarted = undefined;
                    this.activeThumb = null;
                },
            });

            this.draggableThumbMax = new DraggableElement(this.thumbMax, {
                start: () => {
                    this.activeThumb = "max";
                    this.trackBoundingClientRect =
                        this.track.getBoundingClientRect();
                    this.valueWhenDraggingStarted = this.maxValue;

                    this.customStates.set("dragging", true);

                    this.showRangeTooltips();
                },
                move: (x, y) => {
                    this.setThumbValueFromCoordinates(x, y, "max");
                },
                stop: () => {
                    if (this.maxValue !== this.valueWhenDraggingStarted) {
                        this.updateComplete.then(() => {
                            this.dispatchEvent(
                                new Event("change", {
                                    bubbles: true,
                                    composed: true,
                                }),
                            );
                        });

                        this.hasInteracted = true;
                    }
                    this.hideRangeTooltips();

                    this.customStates.set("dragging", false);

                    this.valueWhenDraggingStarted = undefined;
                    this.activeThumb = null;
                },
            });

            this.draggableTrack = new DraggableElement(this.track, {
                start: (x, y) => {
                    this.trackBoundingClientRect =
                        this.track.getBoundingClientRect();

                    if (this.activeThumb) {
                        this.valueWhenDraggingStarted =
                            this.activeThumb === "min"
                                ? this.minValue
                                : this.maxValue;
                    } else {
                        const value = this.getValueFromCoordinates(x, y);
                        const minDistance = Math.abs(value - this.minValue);
                        const maxDistance = Math.abs(value - this.maxValue);

                        if (minDistance === maxDistance) {
                            if (value > this.maxValue) {
                                this.activeThumb = "max";
                            } else if (value < this.minValue) {
                                this.activeThumb = "min";
                            } else {
                                const isRTL = this.localize.dir() === "rtl";
                                const isVertical =
                                    this.orientation === "vertical";
                                const position = isVertical ? y : x;
                                const previousPosition =
                                    this.lastTrackPosition || position;

                                this.lastTrackPosition = position;

                                const movingForward =
                                    (position > previousPosition !== isRTL &&
                                        !isVertical) ||
                                    (position < previousPosition && isVertical);

                                this.activeThumb = movingForward
                                    ? "max"
                                    : "min";
                            }
                        } else {
                            this.activeThumb =
                                minDistance <= maxDistance ? "min" : "max";
                        }

                        this.valueWhenDraggingStarted =
                            this.activeThumb === "min"
                                ? this.minValue
                                : this.maxValue;
                    }

                    this.customStates.set("dragging", true);

                    this.setThumbValueFromCoordinates(x, y, this.activeThumb);
                    this.showRangeTooltips();
                },
                stop: () => {
                    if (this.activeThumb) {
                        const currentValue =
                            this.activeThumb === "min"
                                ? this.minValue
                                : this.maxValue;

                        if (currentValue !== this.valueWhenDraggingStarted) {
                            this.updateComplete.then(() => {
                                this.dispatchEvent(
                                    new Event("change", {
                                        bubbles: true,
                                        composed: true,
                                    }),
                                );
                            });

                            this.hasInteracted = true;
                        }
                    }

                    this.hideRangeTooltips();

                    this.customStates.set("dragging", false);

                    this.valueWhenDraggingStarted = undefined;
                    this.activeThumb = null;
                },
            });
        } else {
            this.draggableTrack = new DraggableElement(this.slider, {
                start: (x, y) => {
                    this.trackBoundingClientRect =
                        this.track.getBoundingClientRect();
                    this.valueWhenDraggingStarted = this.value;

                    this.customStates.set("dragging", true);

                    this.setValueFromCoordinates(x, y);
                    this.showTooltip();
                },
                move: (x, y) => {
                    this.setValueFromCoordinates(x, y);
                },
                stop: () => {
                    if (this.value !== this.valueWhenDraggingStarted) {
                        this.updateComplete.then(() => {
                            this.dispatchEvent(
                                new Event("change", {
                                    bubbles: true,
                                    composed: true,
                                }),
                            );
                        });

                        this.hasInteracted = true;
                    }

                    this.hideTooltip();

                    this.customStates.set("dragging", false);

                    this.valueWhenDraggingStarted = undefined;
                },
            });
        }
    }

    updated(changedProperties: PropertyValues<this>) {
        if (changedProperties.has("range")) {
            this.requestUpdate();
        }

        if (this.isRange) {
            if (
                changedProperties.has("minValue") ||
                changedProperties.has("maxValue")
            ) {
                this.minValue = clamp(this.minValue, this.min, this.maxValue);
                this.maxValue = clamp(this.maxValue, this.minValue, this.max);

                this.updateFormValue();
            }
        } else {
            if (changedProperties.has("value")) {
                this.value = clamp(this.value, this.min, this.max);
                this.setValue(String(this.value));
            }
        }

        if (changedProperties.has("min") || changedProperties.has("max")) {
            if (this.isRange) {
                this.minValue = clamp(this.minValue, this.min, this.max);
                this.maxValue = clamp(this.maxValue, this.min, this.max);
            } else {
                this.value = clamp(this.value, this.min, this.max);
            }
        }

        if (changedProperties.has("disabled")) {
            this.customStates.set("disabled", this.disabled);
        }

        if (
            changedProperties.has("disabled") ||
            changedProperties.has("readonly")
        ) {
            const enabled = !(this.disabled || this.readonly);

            if (this.isRange) {
                if (this.draggableThumbMin) {
                    this.draggableThumbMin.toggle(enabled);
                }

                if (this.draggableThumbMax) {
                    this.draggableThumbMax.toggle(enabled);
                }
            }

            if (this.draggableTrack) {
                this.draggableTrack.toggle(enabled);
            }
        }

        super.updated(changedProperties);
    }

    /** @internal Called when a containing fieldset is disabled. */
    formDisabledCallback(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    /** @internal Called when the form is reset. */
    formResetCallback() {
        if (this.isRange) {
            this.minValue = parseFloat(
                this.getAttribute("min-value") ?? String(this.min),
            );
            this.maxValue = parseFloat(
                this.getAttribute("max-value") ?? String(this.max),
            );
        } else {
            this.value = parseFloat(
                this.getAttribute("value") ?? String(this.min),
            );
        }

        this.hasInteracted = false;

        super.formResetCallback();
    }

    /** Clamps a number to the minimum and maximum value while ensuring it’s a valid step interval. */
    private clampAndRoundToStep(value: number) {
        const stepPrecision = (String(this.step).split(".")[1] || "").replace(
            /0+$/g,
            "",
        ).length;

        const step = Number(this.step);
        const min = Number(this.min);
        const max = Number(this.max);

        value = Math.round(value / step) * step;
        value = clamp(value, min, max);

        return parseFloat(value.toFixed(stepPrecision));
    }

    /** Given a value, returns its percentage within a range of the minimum and maximum value. */
    private getPercentageFromValue(value: number) {
        return ((value - this.min) / (this.max - this.min)) * 100;
    }

    /** Converts coordinates to the slider value. */
    private getValueFromCoordinates(x: number, y: number) {
        const isRTL = this.localize.dir() === "rtl";
        const isVertical = this.orientation === "vertical";

        const { top, right, bottom, left, height, width } =
            this.trackBoundingClientRect;
        const pointerPosition = isVertical ? y : x;
        const sliderCoords = isVertical
            ? { start: top, end: bottom, size: height }
            : { start: left, end: right, size: width };
        const relativePosition = isVertical
            ? sliderCoords.end - pointerPosition
            : isRTL
              ? sliderCoords.end - pointerPosition
              : pointerPosition - sliderCoords.start;
        const percentage = relativePosition / sliderCoords.size;

        return this.clampAndRoundToStep(
            this.min + (this.max - this.min) * percentage,
        );
    }

    private handleFocus(event: FocusEvent) {
        const target = event.target as HTMLElement;

        if (this.isRange) {
            if (target === this.thumbMin) {
                this.activeThumb = "min";
            } else if (target === this.thumbMax) {
                this.activeThumb = "max";
            }

            this.showRangeTooltips();
        } else {
            this.showTooltip();
        }

        this.customStates.set("focused", true);

        this.dispatchEvent(
            new FocusEvent("focus", { bubbles: true, composed: true }),
        );
    }

    private handleBlur() {
        if (this.isRange) {
            requestAnimationFrame(() => {
                const focusedElement = this.shadowRoot?.activeElement;
                const thumbHasFocus =
                    focusedElement === this.thumbMin ||
                    focusedElement === this.thumbMax;

                if (!thumbHasFocus) {
                    this.hideRangeTooltips();
                }
            });
        } else {
            this.hideTooltip();
        }

        this.customStates.set("focused", false);

        this.dispatchEvent(
            new FocusEvent("blur", { bubbles: true, composed: true }),
        );
    }

    private handleKeyDown(event: KeyboardEvent) {
        const isRTL = this.localize.dir() === "rtl";
        const target = event.target as HTMLElement;

        if (this.disabled || this.readonly) {
            return;
        }

        if (this.isRange) {
            if (target === this.thumbMin) {
                this.activeThumb = "min";
            } else if (target === this.thumbMax) {
                this.activeThumb = "max";
            }

            if (!this.activeThumb) {
                return;
            }
        }

        const current = this.isRange
            ? this.activeThumb === "min"
                ? this.minValue
                : this.maxValue
            : this.value;

        let newValue = current;

        switch (event.key) {
            case "ArrowUp":
            case isRTL ? "ArrowLeft" : "ArrowRight":
                event.preventDefault();
                newValue = this.clampAndRoundToStep(current + this.step);
                break;

            case "ArrowDown":
            case isRTL ? "ArrowRight" : "ArrowLeft":
                event.preventDefault();
                newValue = this.clampAndRoundToStep(current - this.step);
                break;

            case "Home":
                event.preventDefault();
                newValue =
                    this.isRange && this.activeThumb === "min"
                        ? this.min
                        : this.isRange
                          ? this.minValue
                          : this.min;
                break;

            case "End":
                event.preventDefault();
                newValue =
                    this.isRange && this.activeThumb === "max"
                        ? this.max
                        : this.isRange
                          ? this.maxValue
                          : this.max;
                break;

            case "PageUp":
                event.preventDefault();
                const stepUp = Math.max(
                    current + (this.max - this.min) / 10,
                    current + this.step,
                );
                newValue = this.clampAndRoundToStep(stepUp);
                break;

            case "PageDown":
                event.preventDefault();
                const stepDown = Math.min(
                    current - (this.max - this.min) / 10,
                    current - this.step,
                );
                newValue = this.clampAndRoundToStep(stepDown);
                break;

            case "Enter":
                submitOnEnter(event, this);
                return;
        }

        if (newValue === current) {
            return;
        }

        if (this.isRange) {
            if (this.activeThumb === "min") {
                if (newValue > this.maxValue) {
                    this.maxValue = newValue;
                    this.minValue = newValue;
                } else {
                    this.minValue = Math.max(this.min, newValue);
                }
            } else {
                if (newValue < this.minValue) {
                    this.minValue = newValue;
                    this.maxValue = newValue;
                } else {
                    this.maxValue = Math.min(this.max, newValue);
                }
            }

            this.updateFormValue();
        } else {
            this.value = clamp(newValue, this.min, this.max);
        }

        this.updateComplete.then(() => {
            this.dispatchEvent(
                new Event("change", { bubbles: true, composed: true }),
            );
            this.dispatchEvent(
                new InputEvent("input", { bubbles: true, composed: true }),
            );
        });

        this.hasInteracted = true;
    }

    private handleLabelPointerDown(event: PointerEvent) {
        event.preventDefault();

        if (!this.disabled) {
            if (this.isRange) {
                this.thumbMin?.focus();
            } else {
                this.slider.focus();
            }
        }
    }

    private setValueFromCoordinates(x: number, y: number) {
        const oldValue = this.value;

        this.value = this.getValueFromCoordinates(x, y);

        if (this.value !== oldValue) {
            this.updateComplete.then(() => {
                this.dispatchEvent(
                    new InputEvent("input", { bubbles: true, composed: true }),
                );
            });
        }
    }

    private setThumbValueFromCoordinates(
        x: number,
        y: number,
        thumb: "min" | "max",
    ) {
        const value = this.getValueFromCoordinates(x, y);
        const oldValue = thumb === "min" ? this.minValue : this.maxValue;

        if (thumb === "min") {
            if (value > this.maxValue) {
                this.maxValue = value;
                this.minValue = value;
            } else {
                this.minValue = Math.max(this.min, value);
            }
        } else {
            if (value < this.minValue) {
                this.minValue = value;
                this.maxValue = value;
            } else {
                this.maxValue = Math.min(this.max, value);
            }
        }

        if (oldValue !== (thumb === "min" ? this.minValue : this.maxValue)) {
            this.updateFormValue();

            this.updateComplete.then(() => {
                this.dispatchEvent(
                    new InputEvent("input", { bubbles: true, composed: true }),
                );
            });
        }
    }

    private showTooltip() {
        if (this.hasTooltip && this.tooltip) {
            this.tooltip.open = true;
        }
    }

    private hideTooltip() {
        if (this.hasTooltip && this.tooltip) {
            this.tooltip.open = false;
        }
    }

    private showRangeTooltips() {
        if (!this.hasTooltip) {
            return;
        }

        if (this.activeThumb === "min") {
            if (this.tooltipMin) {
                this.tooltipMin.open = true;
            }

            if (this.tooltipMax) {
                this.tooltipMax.open = false;
            }
        } else if (this.activeThumb === "max") {
            if (this.tooltipMax) {
                this.tooltipMax.open = true;
            }

            if (this.tooltipMin) {
                this.tooltipMin.open = false;
            }
        }
    }

    private hideRangeTooltips() {
        if (!this.hasTooltip) {
            return;
        }

        if (this.tooltipMin) {
            this.tooltipMin.open = false;
        }

        if (this.tooltipMax) {
            this.tooltipMax.open = false;
        }
    }

    /** Updates the form value submission for range sliders. */
    private updateFormValue() {
        if (this.isRange) {
            const formData = new FormData();

            formData.append(this.name || "", String(this.minValue));
            formData.append(this.name || "", String(this.maxValue));

            this.setValue(formData);
        }
    }

    /** Focuses the slider. */
    focus() {
        if (this.isRange) {
            this.thumbMin?.focus();
        } else {
            this.slider.focus();
        }
    }

    /** Unfocuses the slider (i.e., blurs it). */
    blur() {
        if (this.isRange) {
            if (document.activeElement === this.thumbMin) {
                this.thumbMin.blur();
            } else if (document.activeElement === this.thumbMax) {
                this.thumbMax.blur();
            }
        } else {
            this.slider.blur();
        }
    }

    /** Decreases the slider’s value by `step`. This is a programmatic change, so `change` and `input` events will not be emitted when this is called. */
    stepDown() {
        if (this.isRange) {
            const newValue = this.clampAndRoundToStep(
                this.minValue - this.step,
            );

            this.minValue = clamp(newValue, this.min, this.maxValue);
            this.updateFormValue();
        } else {
            const newValue = this.clampAndRoundToStep(this.value - this.step);

            this.value = newValue;
        }
    }

    /** Increases the slider’s value by `step`. This is a programmatic change, so `change` and `input` events will not be emitted when this is called. */
    stepUp() {
        if (this.isRange) {
            const newValue = this.clampAndRoundToStep(
                this.maxValue + this.step,
            );

            this.maxValue = clamp(newValue, this.minValue, this.max);
            this.updateFormValue();
        } else {
            const newValue = this.clampAndRoundToStep(this.value + this.step);

            this.value = newValue;
        }
    }

    render() {
        const hasLabelSlot = this.hasSlotController.test("label");
        const hasHintSlot = this.hasSlotController.test("hint");
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHint = this.hint ? true : !!hasHintSlot;
        const hasReference = this.hasSlotController.test("reference");

        const sliderClasses = classMap({
            slider: true,
            small: this.size === "small",
            medium: this.size === "medium",
            large: this.size === "large",
            horizontal: this.orientation === "horizontal",
            vertical: this.orientation === "vertical",
            disabled: this.disabled,
        });

        const markers = [];

        if (this.withMarkers) {
            for (let i = this.min; i <= this.max; i += this.step) {
                markers.push(this.getPercentageFromValue(i));
            }
        }

        const label = html`
            <label
                part="label"
                class=${classMap({
                    "label": true,
                    "has-label": hasLabel,
                })}
                id="label"
                for=${this.isRange ? "thumb-min" : "text-box"}
                @pointerdown=${this.handleLabelPointerDown}
            >
                <slot name="label">${this.label}</slot>
            </label>
        `;

        const hint = html`
            <slot
                part="hint"
                class=${classMap({
                    "hint": true,
                    "has-hint": hasHint,
                })}
                id="hint"
                name="hint"
            >
                ${this.hint}
            </slot>
        `;

        const markersTemplate = this.withMarkers
            ? html`
                  <div part="markers" class="markers">
                      ${markers.map(
                          (marker) => html`
                              <span
                                  part="marker"
                                  class="marker"
                                  style=${styleMap({
                                      "--position": `${marker}%`,
                                  })}
                              ></span>
                          `,
                      )}
                  </div>
              `
            : "";

        const referencesTemplate = hasReference
            ? html`
                  <div part="references" class="references" aria-hidden="true">
                      <slot name="reference"></slot>
                  </div>
              `
            : "";

        if (this.isRange) {
            const minThumbPosition = clamp(
                this.getPercentageFromValue(this.minValue),
                0,
                100,
            );
            const maxThumbPosition = clamp(
                this.getPercentageFromValue(this.maxValue),
                0,
                100,
            );

            return html`
                ${label}

                <div part="slider" class="slider" class=${sliderClasses}>
                    <div part="track" class="track">
                        <div
                            part="indicator"
                            class="indicator"
                            style=${styleMap({
                                "--start": `${Math.min(minThumbPosition, maxThumbPosition)}%`,
                                "--end": `${Math.max(minThumbPosition, maxThumbPosition)}%`,
                            })}
                        ></div>

                        ${markersTemplate}

                        <pc-tooltip
                            part="tooltip tooltip-min"
                            content=${this.valueFormatter
                                ? this.valueFormatter(this.minValue)
                                : this.localize.number(this.minValue)}
                            trigger="manual"
                            distance=${this.tooltipDistance}
                            placement=${this.tooltipPlacement}
                            activation="manual"
                            dir=${this.localize.dir()}
                            exportparts="
                                base:tooltip-base,
                                body:tooltip-body,
                                arrow:tooltip-arrow
                            "
                        >
                            <span
                                part="thumb thumb-min"
                                class="thumb-min"
                                style=${styleMap({
                                    "--position": `${minThumbPosition}%`,
                                })}
                                role="slider"
                                tabindex=${this.disabled ? -1 : 0}
                                aria-valuemin=${this.min}
                                aria-valuemax=${this.max}
                                aria-valuenow=${this.minValue}
                                aria-valuetext=${this.valueFormatter
                                    ? this.valueFormatter(this.minValue)
                                    : this.localize.number(this.minValue)}
                                aria-label=${this.label
                                    ? this.localize.term(
                                          "minimumValueDescriptive",
                                          this.label,
                                      )
                                    : this.localize.term("minimumValue")}
                                aria-orientation=${this.orientation}
                                aria-disabled=${this.disabled}
                                aria-readonly=${this.readonly}
                                @focus=${this.handleFocus}
                                @blur=${this.handleBlur}
                                @keydown=${this.handleKeyDown}
                            ></span>
                        </pc-tooltip>

                        <pc-tooltip
                            part="tooltip tooltip-max"
                            trigger="manual"
                            content=${this.valueFormatter
                                ? this.valueFormatter(this.maxValue)
                                : this.localize.number(this.maxValue)}
                            distance=${this.tooltipDistance}
                            placement=${this.tooltipPlacement}
                            activation="manual"
                            dir=${this.localize.dir()}
                            exportparts="
                                base:tooltip-base,
                                body:tooltip-body,
                                arrow:tooltip-arrow
                            "
                        >
                            <span
                                part="thumb thumb-max"
                                class="thumb-max"
                                style=${styleMap({
                                    "--position": `${maxThumbPosition}%`,
                                })}
                                role="slider"
                                aria-valuemin=${this.min}
                                aria-valuenow=${this.maxValue}
                                aria-valuetext=${typeof this.valueFormatter ===
                                "function"
                                    ? this.valueFormatter(this.maxValue)
                                    : this.localize.number(this.maxValue)}
                                aria-valuemax=${this.max}
                                aria-label=${this.label
                                    ? this.localize.term(
                                          "maximumValueDescriptive",
                                          this.label,
                                      )
                                    : this.localize.term("maximumValue")}
                                aria-orientation=${this.orientation}
                                aria-disabled=${this.disabled
                                    ? "true"
                                    : "false"}
                                aria-readonly=${this.readonly
                                    ? "true"
                                    : "false"}
                                tabindex=${this.disabled ? -1 : 0}
                                @focus=${this.handleFocus}
                                @blur=${this.handleBlur}
                                @keydown=${this.handleKeyDown}
                            ></span>
                        </pc-tooltip>
                    </div>

                    ${referencesTemplate} ${hint}
                </div>
            `;
        } else {
            const thumbPosition = clamp(
                this.getPercentageFromValue(this.value),
                0,
                100,
            );
            const indicatorOffsetPosition = clamp(
                this.getPercentageFromValue(
                    typeof this.indicatorOffset === "number"
                        ? this.indicatorOffset
                        : this.min,
                ),
                0,
                100,
            );

            return html`
                ${label}

                <div
                    part="slider"
                    class=${sliderClasses}
                    role="slider"
                    tabindex=${this.disabled ? -1 : 0}
                    aria-disabled=${this.disabled ? "true" : "false"}
                    aria-readonly=${this.disabled ? "true" : "false"}
                    aria-orientation=${this.orientation}
                    aria-valuemin=${this.min}
                    aria-valuenow=${this.value}
                    aria-valuetext=${typeof this.valueFormatter === "function"
                        ? this.valueFormatter(this.value)
                        : this.localize.number(this.value)}
                    aria-valuemax=${this.max}
                    aria-labelledby="label"
                    aria-describedby="hint"
                    @focus=${this.handleFocus}
                    @blur=${this.handleBlur}
                    @keydown=${this.handleKeyDown}
                >
                    <div part="track" class="track">
                        <div
                            part="indicator"
                            class="indicator"
                            style=${styleMap({
                                "--start": `${indicatorOffsetPosition}%`,
                                "--end": `${thumbPosition}%`,
                            })}
                        ></div>

                        ${markersTemplate}

                        <pc-tooltip
                            part="tooltip"
                            class="tooltip"
                            content=${this.valueFormatter
                                ? this.valueFormatter(this.value)
                                : this.localize.number(this.value)}
                            trigger="manual"
                            distance=${this.tooltipDistance}
                            placement=${this.tooltipPlacement}
                            activation="manual"
                            dir=${this.localize.dir()}
                            exportparts="
                                base:tooltip__base,
                                body:tooltip__body,
                                arrow:tooltip__arrow
                            "
                        >
                            <span
                                part="thumb"
                                class="thumb"
                                style=${styleMap({
                                    "--position": `${thumbPosition}%`,
                                })}
                            ></span>
                        </pc-tooltip>
                    </div>

                    ${referencesTemplate} ${hint}
                </div>
            `;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-slider": PcSlider;
    }
}
