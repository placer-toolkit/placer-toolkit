import { html } from "lit";
import {
    customElement,
    eventOptions,
    property,
    query,
    state,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { PlacerElement } from "../../internal/placer-element.js";
import type { PlacerFormControl } from "../../internal/placer-form-control.js";
import { FormControlController } from "../../internal/form.js";
import { HasSlotController } from "../../internal/slot.js";
import { LocalizeController } from "../../utilities/localize.js";
import { animateTo } from "../../internal/animate.js";
import {
    getAnimation,
    setDefaultAnimation,
} from "../../utilities/animation-registry.js";
import { TinyColor } from "@ctrl/tinycolor";
import { clamp } from "../../internal/math.js";
import { defaultValue } from "../../internal/default-value.js";
import { drag } from "../../internal/drag.js";
import { waitForEvent } from "../../internal/event.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import type { PcChangeEvent } from "../../events/pc-change.js";
import type { PcInputEvent } from "../../events/pc-input.js";
import { PcButton } from "../button/button.js";
import { PcButtonGroup } from "../button-group/button-group.js";
import { PcIcon } from "../icon/icon.js";
import { PcInput } from "../input/input.js";
import { PcPopup } from "../popup/popup.js";
import formControlStyles from "../../styles/component-styles/form-control.css";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./color-picker.css";

const hasEyeDropper = "EyeDropper" in window;

interface EyeDropperConstructor {
    new (): EyeDropperInterface;
}

interface EyeDropperInterface {
    open: () => Promise<{ sRGBHex: string }>;
}

declare const EyeDropper: EyeDropperConstructor;

setDefaultAnimation("colorPicker.show", {
    keyframes: [
        {
            offset: 0,
            opacity: 0,
            transform:
                "scaleY(0.35) scaleX(0.95) translateY(-10px) rotate(1deg)",
        },
        {
            offset: 0.25,
            opacity: 1,
            transform:
                "scaleY(1.03) scaleX(1.005) translateY(2px) rotate(-0.5deg)",
        },
        {
            offset: 0.5,
            transform:
                "scaleY(0.995) scaleX(0.999) translateY(-0.5px) rotate(0.1deg)",
        },
        {
            offset: 0.75,
            transform:
                "scaleY(1.002) scaleX(1.0005) translateY(0.2px) rotate(-0.05deg)",
        },
        {
            offset: 1,
            opacity: 1,
            transform: "scaleY(1) scaleX(1) translateY(0) rotate(0deg)",
        },
    ],
    options: {
        duration: 1000,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        fill: "forwards",
    },
});

setDefaultAnimation("colorPicker.hide", {
    keyframes: [
        {
            offset: 0,
            opacity: 1,
            transform: "scaleY(1) scaleX(1) translateY(0) rotate(0deg)",
        },
        {
            offset: 0.15,
            transform:
                "scaleY(1.005) scaleX(1.001) translateY(0.5px) rotate(-0.002deg)",
        },
        {
            offset: 0.4,
            transform:
                "scaleY(0.99) scaleX(0.998) translateY(-1px) rotate(0.008deg)",
        },
        {
            offset: 0.75,
            transform:
                "scaleY(0.6) scaleX(0.9) translateY(10px) rotate(0.007deg)",
        },
        {
            offset: 1,
            opacity: 0,
            transform:
                "scaleY(0.3) scaleX(0.8) translateY(25px) rotate(0.01deg)",
        },
    ],
    options: {
        duration: 400,
        easing: "cubic-bezier(0.6, 0.05, 0.8, 0.2)",
        fill: "forwards",
    },
});

/**
 * @summary Colour pickers allow the user to pick a colour.
 * @status experimental
 * @since 1.0.0-alpha.2
 *
 * @dependency pc-button
 * @dependency pc-button-group
 * @dependency pc-icon
 * @dependency pc-input
 * @dependency pc-popup
 *
 * @slot label - The colour picker’s label. Alternatively, you can use the `label` attribute.
 * @slot hint - The colour picker’s hint. Alternatively, you can use the `hint` attribute.
 *
 * @event pc-change - Emitted when the colour picker’s value changes.
 * @event pc-input - Emitted when the colour picker receives input.
 * @event pc-focus - Emitted when the colour picker receives focus.
 * @event pc-blur - Emitted when the colour picker loses focus (i.e., is blurred).
 * @event pc-invalid - Emitted when the form control has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart base - The component’s base wrapper.
 * @csspart popup - The colour picker’s popup popup.
 * @csspart trigger - The colour picker’s popup trigger.
 * @csspart swatches - The container that holds the swatches.
 * @csspart swatch - The individual swatches in the colour picker.
 * @csspart grid - The colour grid.
 * @csspart grid-handle - The colour grid’s handle.
 * @csspart slider - The hue and opacity sliders.
 * @csspart slider-thumb - The hue and opacity slider thumbs.
 * @csspart hue-slider - The hue slider.
 * @csspart hue-slider-thumb - The hue slider’s thumb.
 * @csspart opacity-slider - The opacity slider.
 * @csspart opacity-slider-thumb - The opacity slider’s thumb.
 * @csspart preview - The preview colour.
 * @csspart input - The text input.
 * @csspart copy-button - The text input’s copy button.
 * @csspart copy-button-button - The `button` part of the text input’s copy button.
 * @csspart eyedropper-button - The eyedropper button.
 * @csspart eyedropper-button-base - The eyedropper button’s `button` part.
 * @csspart eyedropper-button-prefix - The eyedropper button’s `prefix` part.
 * @csspart eyedropper-button-label - The eyedropper button’s `label` part.
 * @csspart eyedropper-button-suffix - The eyedropper button’s `suffix` part.
 * @csspart format-button - The format switch button.
 * @csspart format-button-base - The format switch button’s `button` part.
 * @csspart format-button-prefix - The format switch button’s `prefix` part.
 * @csspart format-button-label - The format switch button’s `label` part.
 * @csspart format-button-suffix - The format switch button’s `suffix` part.
 *
 * @cssproperty --grid-width: 17em - The width of the colour grid.
 * @cssproperty --grid-height: 12em - The height of the colour grid.
 * @cssproperty --grid-handle-size: 1.25em - The size of the colour grid’s handle.
 * @cssproperty --slider-height: 1em - The height of the hue and alpha sliders.
 * @cssproperty --slider-thumb-size: calc(var(--slider-height) + 0.25em) - The size of both slider thumbs.
 * @cssproperty --swatch-size 1.5em - The size of each predefined colour swatch.
 *
 * @animation colorPicker.show - The animation to use when showing the colour picker popup.
 * @animation colorPicker.hide - The animation to use when hiding the colour picker popup.
 */
@customElement("pc-color-picker")
export class PcColorPicker extends PlacerElement implements PlacerFormControl {
    /** @internal This is an internal static property. */
    static css = [formControlStyles, sizeStyles, styles];
    /** @internal This is an internal static property. */
    static dependencies = {
        "pc-button": PcButton,
        "pc-button-group": PcButtonGroup,
        "pc-icon": PcIcon,
        "pc-input": PcInput,
        "pc-popup": PcPopup,
    };

    private readonly formControlController = new FormControlController(this);

    private readonly hasSlotController = new HasSlotController(
        this,
        "label",
        "hint",
    );
    private readonly localize = new LocalizeController(this);

    private isSafeValue = false;

    /** @internal This is an internal class property. */
    @query('[part~="base"]') base!: HTMLElement;
    /** @internal This is an internal class property. */
    @query('[part~="input"]') input!: PcInput;
    /** @internal This is an internal class property. */
    @query('[part~="popup"]') popup!: PcPopup;
    /** @internal This is an internal class property. */
    @query('[part~="preview"]') previewButton!: HTMLButtonElement;
    /** @internal This is an internal class property. */
    @query('[part~="trigger"]') trigger!: HTMLButtonElement;

    @state() private hasFocus = false;
    @state() private isDraggingGridHandle = false;
    @state() private isEmpty = false;
    @state() private inputValue = "";
    @state() private hue = 0;
    @state() private saturation = 100;
    @state() private brightness = 100;
    @state() private alpha = 100;

    /** The current value of the colour picker. The value’s format will vary based on the `format` attribute. To get the value in a specific format, use the `getFormattedValue()` method. The value is submitted as a name/value pair with form data. */
    @property() value = "";

    /** The default value of the colour picker. Primarily used for resetting the colour picker. */
    @defaultValue() defaultValue = "";

    /** The colour picker’s label. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";

    /** The colour picker’s hint. If you need to display HTML, use the `hint` slot instead. */
    @property() hint = "";

    /** The format to use. The colour picker will accept user input in any format (including CSS colour names) and convert it to the desired format. */
    @property() format: "hex" | "rgb" | "hsl" | "hsv" = "hex";

    /** Renders the color picker inline rather than in a dropdown. */
    @property({ type: Boolean, reflect: true }) inline = false;

    /** Determines the size of the colour picker’s trigger. This has no effect on inline colour pickers. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Removes the button that lets users toggle between formats. */
    @property({ attribute: "no-format-toggle", type: Boolean }) noFormatToggle =
        false;

    /** The name of the colour picker, submitted as a name/value pair with form data. */
    @property() name = "";

    /** Disables the colour picker. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Indicates whether or not the popup is open. You can  toggle this attribute to show and hide the popup, or you can use the `show()` and `hide()` methods and this attribute will reflect the popup’s open state. */
    @property({ type: Boolean, reflect: true }) open = false;

    /** Shows the opacity slider. */
    @property({ type: Boolean }) opacity = false;

    /** By default, values are lowercase. With this attribute, values will be uppercase instead. */
    @property({ type: Boolean }) uppercase = false;

    /** One or more predefined colour swatches to display as presets in the colour picker. Can include any format the colour picker can parse, including hex, rgb, hsl, hsv and CSS colour names. Each colour must be separated by a semicolon (`;`). Alternatively, you can pass an array of colour values to this property using JavaScript. */
    @property() swatches: string | string[] = "";

    /** By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. */
    @property({ reflect: true }) form = "";

    /** Indicates if the colour picker must be filled in or not. */
    @property({ type: Boolean, reflect: true }) required = false;

    constructor() {
        super();

        this.addEventListener("focusin", this.handleFocusIn);
        this.addEventListener("focusout", this.handleFocusOut);
    }

    firstUpdated() {
        this.input.updateComplete.then(() => {
            this.formControlController.updateValidity();
        });
    }

    private handleFocusIn = () => {
        this.hasFocus = true;
        emit(this, "pc-focus");
    };

    private handleFocusOut = () => {
        this.hasFocus = false;
        emit(this, "pc-blur");
    };

    private handleFormatToggle() {
        const formats = ["hex", "rgb", "hsl", "hsv"];
        const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;

        this.format = formats[nextIndex] as "hex" | "rgb" | "hsl" | "hsv";
        this.setColor(this.value);

        emit(this, "pc-change");
        emit(this, "pc-input");
    }

    private handleAlphaDrag(event: PointerEvent) {
        const container =
            this.shadowRoot!.querySelector<HTMLElement>(".alpha-slider")!;
        const thumb = container.querySelector<HTMLElement>(".slider-thumb")!;

        const { width } = container.getBoundingClientRect();

        let initialValue = this.value;
        let currentValue = this.value;

        thumb.focus();
        event.preventDefault();

        drag(container, {
            onMove: (x: number) => {
                this.alpha = clamp((x / width) * 100, 0, 100);
                this.syncValues();

                if (this.value !== currentValue) {
                    currentValue = this.value;
                    emit(this, "pc-input");
                }
            },
            onStop: () => {
                if (this.value !== initialValue) {
                    initialValue = this.value;
                    emit(this, "pc-change");
                }
            },
            initialEvent: event,
        });
    }

    private handleHueDrag(event: PointerEvent) {
        const container =
            this.shadowRoot!.querySelector<HTMLElement>(".hue-slider")!;
        const handle = container.querySelector<HTMLElement>(".slider-thumb")!;
        const { width } = container.getBoundingClientRect();

        let initialValue = this.value;
        let currentValue = this.value;

        handle.focus();
        event.preventDefault();

        drag(container, {
            onMove: (x: number) => {
                this.hue = clamp((x / width) * 360, 0, 360);
                this.syncValues();

                if (this.value !== currentValue) {
                    currentValue = this.value;
                    emit(this, "pc-input");
                }
            },
            onStop: () => {
                if (this.value !== initialValue) {
                    initialValue = this.value;
                    emit(this, "pc-change");
                }
            },
            initialEvent: event,
        });
    }

    private handleGridDrag(event: PointerEvent) {
        const grid = this.shadowRoot!.querySelector<HTMLElement>(".grid")!;
        const handle = grid.querySelector<HTMLElement>(".grid-handle")!;
        const { width, height } = grid.getBoundingClientRect();

        let initialValue = this.value;
        let currentValue = this.value;

        handle.focus();
        event.preventDefault();

        this.isDraggingGridHandle = true;

        drag(grid, {
            onMove: (x, y) => {
                this.saturation = clamp((x / width) * 100, 0, 100);
                this.brightness = clamp(100 - (y / height) * 100, 0, 100);
                this.syncValues();

                if (this.value !== currentValue) {
                    currentValue = this.value;
                    emit(this, "pc-input");
                }
            },
            onStop: () => {
                this.isDraggingGridHandle = false;
                if (this.value !== initialValue) {
                    initialValue = this.value;
                    emit(this, "pc-change");
                }
            },
            initialEvent: event,
        });
    }

    private handleAlphaKeyDown(event: KeyboardEvent) {
        const increment = event.shiftKey ? 10 : 1;
        const oldValue = this.value;

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            this.alpha = clamp(this.alpha - increment, 0, 100);
            this.syncValues();
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            this.alpha = clamp(this.alpha + increment, 0, 100);
            this.syncValues();
        }

        if (event.key === "Home") {
            event.preventDefault();
            this.alpha = 0;
            this.syncValues();
        }

        if (event.key === "End") {
            event.preventDefault();
            this.alpha = 100;
            this.syncValues();
        }

        if (this.value !== oldValue) {
            emit(this, "pc-change");
            emit(this, "pc-input");
        }
    }

    private handleHueKeyDown(event: KeyboardEvent) {
        const increment = event.shiftKey ? 10 : 1;
        const oldValue = this.value;

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            this.hue = clamp(this.hue - increment, 0, 360);
            this.syncValues();
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            this.hue = clamp(this.hue + increment, 0, 360);
            this.syncValues();
        }

        if (event.key === "Home") {
            event.preventDefault();
            this.hue = 0;
            this.syncValues();
        }

        if (event.key === "End") {
            event.preventDefault();
            this.hue = 360;
            this.syncValues();
        }

        if (this.value !== oldValue) {
            emit(this, "pc-change");
            emit(this, "pc-input");
        }
    }

    private handleGridKeyDown(event: KeyboardEvent) {
        const increment = event.shiftKey ? 10 : 1;
        const oldValue = this.value;

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            this.saturation = clamp(this.saturation - increment, 0, 100);
            this.syncValues();
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            this.saturation = clamp(this.saturation + increment, 0, 100);
            this.syncValues();
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            this.brightness = clamp(this.brightness + increment, 0, 100);
            this.syncValues();
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            this.brightness = clamp(this.brightness - increment, 0, 100);
            this.syncValues();
        }

        if (this.value !== oldValue) {
            emit(this, "pc-change");
            emit(this, "pc-input");
        }
    }

    private handleInputChange(event: PcChangeEvent) {
        const target = event.target as HTMLInputElement;
        const oldValue = this.value;

        event.stopPropagation();

        if (this.input.value) {
            this.setColor(target.value);
            target.value = this.value;
        } else {
            this.value = "";
        }

        if (this.value !== oldValue) {
            emit(this, "pc-change");
            emit(this, "pc-input");
        }
    }

    private handleInputInput(event: PcInputEvent) {
        this.formControlController.updateValidity();

        event.stopPropagation();
    }

    private handleInputKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            const oldValue = this.value;

            if (this.input.value) {
                this.setColor(this.input.value);
                this.input.value = this.value;

                if (this.value !== oldValue) {
                    emit(this, "pc-change");
                    emit(this, "pc-input");
                }

                setTimeout(() => this.input.select());
            } else {
                this.hue = 0;
            }
        }
    }

    private handleInputInvalid(event: Event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
    }

    @eventOptions({ passive: false })
    private handleTouchMove(event: TouchEvent) {
        event.preventDefault();
    }

    private parseColor(colorString: string) {
        const color = new TinyColor(colorString);

        if (!color.isValid) {
            return null;
        }

        const hslColor = color.toHsl();
        const hsl = {
            h: hslColor.h,
            s: hslColor.s * 100,
            l: hslColor.l * 100,
            a: hslColor.a,
        };

        const rgb = color.toRgb();

        const hex = color.toHexString();
        const hexa = color.toHex8String();

        const hsvColor = color.toHsv();
        const hsv = {
            h: hsvColor.h,
            s: hsvColor.s * 100,
            v: hsvColor.v * 100,
            a: hsvColor.a,
        };

        return {
            hsl: {
                h: hsl.h,
                s: hsl.s,
                l: hsl.l,
                string: this.setLetterCase(
                    `hsl(${Math.round(hsl.h)} ${Math.round(hsl.s)}% ${Math.round(hsl.l)}%)`,
                ),
            },
            hsla: {
                h: hsl.h,
                s: hsl.s,
                l: hsl.l,
                a: hsl.a,
                string: this.setLetterCase(
                    `hsl(${Math.round(hsl.h)} ${Math.round(hsl.s)}% ${Math.round(hsl.l)}% / ${Math.round(hsl.a * 100)}%)`,
                ),
            },
            hsv: {
                h: hsv.h,
                s: hsv.s,
                v: hsv.v,
                string: this.setLetterCase(
                    `hsv(${Math.round(hsv.h)} ${Math.round(hsv.s)}% ${Math.round(hsv.v)}%)`,
                ),
            },
            hsva: {
                h: hsv.h,
                s: hsv.s,
                v: hsv.v,
                a: hsv.a,
                string: this.setLetterCase(
                    `hsv(${Math.round(hsv.h)} ${Math.round(hsv.s)}% ${Math.round(hsv.v)}% / ${Math.round(hsv.a * 100)}%)`,
                ),
            },
            rgb: {
                r: rgb.r,
                g: rgb.g,
                b: rgb.b,
                string: this.setLetterCase(
                    `rgb(${Math.round(rgb.r)} ${Math.round(rgb.g)} ${Math.round(rgb.b)})`,
                ),
            },
            rgba: {
                r: rgb.r,
                g: rgb.g,
                b: rgb.b,
                a: rgb.a,
                string: this.setLetterCase(
                    `rgb(${Math.round(rgb.r)} ${Math.round(rgb.g)} ${Math.round(rgb.b)} / ${Math.round(rgb.a * 100)}%)`,
                ),
            },
            hex: this.setLetterCase(hex),
            hexa: this.setLetterCase(hexa),
        };
    }

    private setColor(colorString: string) {
        const newColor = this.parseColor(colorString);

        if (newColor === null) {
            return false;
        }

        this.hue = newColor.hsva.h;
        this.saturation = newColor.hsva.s;
        this.brightness = newColor.hsva.v;
        this.alpha = this.opacity ? newColor.hsva.a * 100 : 100;

        this.syncValues();

        return true;
    }

    private setLetterCase(string: string) {
        if (typeof string !== "string") {
            return "";
        }

        return this.uppercase ? string.toUpperCase() : string.toLowerCase();
    }

    private async syncValues() {
        const currentColor = this.parseColor(
            `hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha / 100})`,
        );

        if (currentColor === null) {
            return;
        }

        if (this.format === "hsl") {
            this.inputValue =
                this.alpha < 100
                    ? currentColor.hsla.string
                    : currentColor.hsl.string;
        } else if (this.format === "rgb") {
            this.inputValue =
                this.alpha < 100
                    ? currentColor.rgba.string
                    : currentColor.rgb.string;
        } else if (this.format === "hsv") {
            this.inputValue =
                this.alpha < 100
                    ? currentColor.hsva.string
                    : currentColor.hsv.string;
        } else {
            this.inputValue =
                this.alpha < 100 ? currentColor.hexa : currentColor.hex;
        }

        this.isSafeValue = true;
        this.value = this.inputValue;

        await this.updateComplete;

        this.isSafeValue = false;
    }

    private handleEyeDropper() {
        if (!hasEyeDropper) {
            return;
        }

        const eyeDropper = new EyeDropper();

        eyeDropper
            .open()
            .then((colorSelectionResult) => {
                const oldValue = this.value;

                this.setColor(colorSelectionResult.sRGBHex);

                if (this.value !== oldValue) {
                    emit(this, "pc-change");
                    emit(this, "pc-input");
                }
            })
            .catch();
    }

    private selectSwatch(color: string) {
        const oldValue = this.value;

        if (!this.disabled) {
            this.setColor(color);

            if (this.value !== oldValue) {
                emit(this, "pc-change");
                emit(this, "pc-input");
            }
        }
    }

    private getHexString(
        hue: number,
        saturation: number,
        brightness: number,
        alpha = 100,
    ) {
        const color = new TinyColor(
            `hsva(${hue}, ${saturation}%, ${brightness}%, ${alpha / 100})`,
        );

        if (!color.isValid) {
            return "";
        }

        return color.toHex8String();
    }

    private stopNestedEventPropagation(event: CustomEvent) {
        event.stopImmediatePropagation();
    }

    /** @internal This is an internal method. */
    @watch("format", { waitUntilFirstUpdate: true })
    handleFormatChange() {
        this.syncValues();
    }

    /** @internal This is an internal method. */
    @watch("opacity", { waitUntilFirstUpdate: true })
    handleOpacityChange() {
        this.alpha = 100;
    }

    /** @internal This is an internal method. */
    @watch("value")
    handleValueChange(oldValue: string | undefined, newValue: string) {
        this.isEmpty = !newValue;

        if (!newValue) {
            this.hue = 0;
            this.saturation = 0;
            this.brightness = 100;
            this.alpha = 100;
        }

        if (!this.isSafeValue) {
            const newColor = this.parseColor(newValue);

            if (newColor !== null) {
                this.inputValue = this.value;
                this.hue = newColor.hsva.h;
                this.saturation = newColor.hsva.s;
                this.brightness = newColor.hsva.v;
                this.alpha = newColor.hsva.a * 100;
                this.syncValues();
            } else {
                this.inputValue = oldValue ?? "";
            }
        }
    }

    /** Focuses the colour picker. */
    focus(options?: FocusOptions) {
        if (this.inline) {
            this.base.focus(options);
        } else {
            this.trigger.focus(options);
        }
    }

    /** Unfocuses the colour picker (i.e., blurs it). */
    blur() {
        const elementToBlur = this.inline ? this.base : this.trigger;

        if (this.hasFocus) {
            elementToBlur.focus({ preventScroll: true });
            elementToBlur.blur();
        }

        if (this.popup?.active) {
            this.hide();
        }
    }

    /** Returns the current value as a string in the specified format. */
    getFormattedValue(
        format:
            | "hex"
            | "hexa"
            | "rgb"
            | "rgba"
            | "hsl"
            | "hsla"
            | "hsv"
            | "hsva" = "hex",
    ) {
        const currentColor = this.parseColor(
            `hsv(${this.hue} ${this.saturation}% ${this.brightness}% / ${this.alpha}%)`,
        );

        if (currentColor === null) {
            return "";
        }

        switch (format) {
            case "hex":
                return currentColor.hex;
            case "hexa":
                return currentColor.hexa;
            case "rgb":
                return currentColor.rgb.string;
            case "rgba":
                return currentColor.rgba.string;
            case "hsl":
                return currentColor.hsl.string;
            case "hsla":
                return currentColor.hsla.string;
            case "hsv":
                return currentColor.hsv.string;
            case "hsva":
                return currentColor.hsva.string;
            default:
                return "";
        }
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        if (this.open && event.key === "Escape") {
            event.stopPropagation();
            this.hide();
            this.focus();
        }
    };

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && this.open) {
            event.stopPropagation();
            this.focus();
            this.hide();
            return;
        }

        if (event.key === "Tab") {
            setTimeout(() => {
                const activeElement =
                    this.getRootNode() instanceof ShadowRoot
                        ? document.activeElement?.shadowRoot?.activeElement
                        : document.activeElement;

                if (
                    !this ||
                    activeElement?.closest(this.tagName.toLowerCase()) !== this
                ) {
                    this.hide();
                }
            });
        }
    };

    private handleDocumentMouseDown = (event: MouseEvent) => {
        const path = event.composedPath();

        const isInsideRelevantArea = path.some(
            (element) =>
                element instanceof Element &&
                (element.closest(".color-picker") || element === this.trigger),
        );

        if (this && !isInsideRelevantArea) {
            this.hide();
        }
    };

    /** @internal This is an internal method. */
    handleTriggerClick() {
        if (this.open) {
            this.hide();
        } else {
            this.show();
            this.focus();
        }
    }

    /** @internal This is an internal method. */
    async handleTriggerKeyDown(event: KeyboardEvent) {
        if ([" ", "Enter"].includes(event.key)) {
            event.preventDefault();
            this.handleTriggerClick();
            return;
        }
    }

    /** @internal This is an internal method. */
    handleTriggerKeyUp(event: KeyboardEvent) {
        if (event.key === " ") {
            event.preventDefault();
        }
    }

    /** @internal This is an internal method. */
    updateAccessibleTrigger() {
        const accessibleTrigger = this.trigger;

        if (accessibleTrigger) {
            accessibleTrigger.setAttribute("aria-haspopup", "true");
            accessibleTrigger.setAttribute(
                "aria-expanded",
                this.open ? "true" : "false",
            );
        }
    }

    /** Shows the colour picker popup. */
    async show() {
        if (this.open) {
            return undefined;
        }

        this.open = true;
        return waitForEvent(this, "pc-after-show");
    }

    /** Hides the colour picker popup. */
    async hide() {
        if (!this.open) {
            return undefined;
        }

        this.open = false;
        return waitForEvent(this, "pc-after-hide");
    }

    /** @internal This is an internal method. */
    addOpenListeners() {
        this.base.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keydown", this.handleDocumentKeyDown);
        document.addEventListener("mousedown", this.handleDocumentMouseDown);
    }

    /** @internal This is an internal method. */
    removeOpenListeners() {
        if (this.base) {
            this.base.removeEventListener("keydown", this.handleKeyDown);
        }
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
        document.removeEventListener("mousedown", this.handleDocumentMouseDown);
    }

    /** @internal This is an internal method. */
    @watch("open", { waitUntilFirstUpdate: true })
    async handleOpenChange() {
        if (this.disabled) {
            this.open = false;
            return;
        }

        this.updateAccessibleTrigger();

        if (this.open) {
            emit(this, "pc-show");

            this.addOpenListeners();

            await this.updateComplete;

            this.base.hidden = false;
            this.popup.active = true;

            const animation = getAnimation(this, "colorPicker.show", {
                dir: this.localize.dir(),
            });

            animateTo(this.popup.popup, animation.keyframes, animation.options);

            waitForEvent(this, "pc-after-show");
        } else {
            emit(this, "pc-hide");

            this.removeOpenListeners();

            const animation = getAnimation(this, "colorPicker.hide", {
                dir: this.localize.dir(),
            });

            await animateTo(
                this.popup.popup,
                animation.keyframes,
                animation.options,
            );

            this.base.hidden = true;
            this.popup.active = false;

            waitForEvent(this, "pc-after-hide");
        }
    }

    /** Gets the validity state object. */
    get validity() {
        return this.input.validity;
    }

    /** Gets the validation message. */
    get validationMessage() {
        return this.input.validationMessage;
    }

    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
        return this.input.checkValidity();
    }

    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    /** Checks for validity and shows the browser’s validation message if the control is invalid. */
    reportValidity() {
        if (!this.inline && !this.validity.valid && !this.open) {
            this.show();

            this.addEventListener(
                "pc-after-show",
                () => this.input.reportValidity(),
                { once: true },
            );

            if (!this.disabled) {
                this.formControlController.emitInvalidEvent();
            }

            return false;
        }

        return this.input.reportValidity();
    }

    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string) {
        this.input.setCustomValidity(message);
        this.formControlController.updateValidity();
    }

    render() {
        const hasLabelSlot = this.hasSlotController.test("label");
        const hasHintSlot = this.hasSlotController.test("hint");
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHint = this.hint ? true : !!hasHintSlot;
        const gridHandleX = this.saturation;
        const gridHandleY = 100 - this.brightness;
        const swatches = Array.isArray(this.swatches)
            ? this.swatches
            : this.swatches.split(";").filter((color) => color.trim() !== "");

        const colorPicker = html`
            <div
                part="base"
                class=${classMap({
                    "color-picker": true,
                    "inline": this.inline,
                    "disabled": this.disabled,
                    "focused": this.hasFocus,
                })}
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-labelledby="label"
                tabindex=${this.inline ? "0" : "-1"}
            >
                ${this.inline
                    ? html`
                          <slot class="label" name="label">
                              ${this.label}
                          </slot>
                      `
                    : null}

                <div
                    part="grid"
                    class="grid"
                    style=${styleMap({
                        backgroundColor: this.getHexString(this.hue, 100, 100),
                    })}
                    @pointerdown=${this.handleGridDrag}
                    @touchmove=${this.handleTouchMove}
                >
                    <span
                        part="grid-handle"
                        class=${classMap({
                            "grid-handle": true,
                            "dragging": this.isDraggingGridHandle,
                        })}
                        style=${styleMap({
                            top: `${gridHandleY}%`,
                            left: `${gridHandleX}%`,
                            backgroundColor: this.getHexString(
                                this.hue,
                                this.saturation,
                                this.brightness,
                                this.alpha,
                            ),
                        })}
                        role="application"
                        aria-label="HSV"
                        tabindex=${ifDefined(this.disabled ? undefined : "0")}
                        @keydown=${this.handleGridKeyDown}
                    ></span>
                </div>

                <div class="controls">
                    <div class="sliders">
                        <div
                            part="slider hue-slider"
                            class="slider hue-slider"
                            @pointerdown=${this.handleHueDrag}
                            @touchmove=${this.handleTouchMove}
                        >
                            <span
                                part="slider-thumb hue-slider-thumb"
                                class="slider-thumb"
                                style=${styleMap({
                                    left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`,
                                })}
                                role="slider"
                                aria-label=${this.localize.term("hue")}
                                aria-orientation="horizontal"
                                aria-valuemin="0"
                                aria-valuemax="360"
                                aria-valuenow=${`${Math.round(this.hue)}`}
                                tabindex=${ifDefined(
                                    this.disabled ? undefined : "0",
                                )}
                                @keydown=${this.handleHueKeyDown}
                            ></span>
                        </div>

                        ${this.opacity
                            ? html`
                                  <div
                                      part="slider opacity-slider"
                                      class="slider alpha-slider pixel-background"
                                      @pointerdown=${this.handleAlphaDrag}
                                      @touchmove=${this.handleTouchMove}
                                  >
                                      <div
                                          class="alpha-gradient"
                                          style=${styleMap({
                                              backgroundImage: `
                                                  linear-gradient(
                                                      to right,
                                                      ${this.getHexString(this.hue, this.saturation, this.brightness, 0)} 0%,
                                                      ${this.getHexString(this.hue, this.saturation, this.brightness, 100)} 100%
                                                  )
                                              `,
                                          })}
                                      ></div>
                                      <span
                                          part="slider-thumb opacity-slider-thumb"
                                          class="slider-thumb"
                                          style=${styleMap({
                                              left: `${this.alpha}%`,
                                          })}
                                          role="slider"
                                          aria-label=${this.localize.term(
                                              "opacity",
                                          )}
                                          aria-orientation="horizontal"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                          aria-valuenow=${Math.round(
                                              this.alpha,
                                          )}
                                          tabindex=${ifDefined(
                                              this.disabled ? undefined : "0",
                                          )}
                                          @keydown=${this.handleAlphaKeyDown}
                                      ></span>
                                  </div>
                              `
                            : ""}
                    </div>
                    <div
                        part="preview"
                        class="preview pixel-background"
                        style=${styleMap({
                            "--preview-color": this.getHexString(
                                this.hue,
                                this.saturation,
                                this.brightness,
                                this.alpha,
                            ),
                        })}
                    ></div>
                </div>

                <div class="user-input" aria-live="polite">
                    <pc-input
                        part="input"
                        class=${classMap({
                            empty: this.isEmpty,
                        })}
                        type="text"
                        id="color-input"
                        name=${this.name}
                        size="small"
                        autocomplete="off"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        value=${this.isEmpty ? "" : this.inputValue}
                        ?required=${this.required}
                        ?disabled=${this.disabled}
                        aria-label=${this.localize.term("currentValue")}
                        @keydown=${this.handleInputKeyDown}
                        @pc-change=${this.handleInputChange}
                        @pc-input=${this.handleInputInput}
                        @pc-focus=${this.stopNestedEventPropagation}
                        @pc-blur=${this.stopNestedEventPropagation}
                        @pc-invalid=${this.handleInputInvalid}
                    >
                        ${!this.isEmpty
                            ? html`
                                  <pc-copy-button
                                      part="copy-button"
                                      class="copy-button"
                                      from="color-input.value"
                                      slot="suffix"
                                      exportparts="button:copy-button-button"
                                  ></pc-copy-button>
                              `
                            : null}
                    </pc-input>

                    <pc-button-group>
                        ${!this.noFormatToggle
                            ? html`
                                  <pc-button
                                      part="format-button"
                                      size="small"
                                      variant="outlined"
                                      aria-label=${this.localize.term(
                                          "toggleColorFormat",
                                      )}
                                      exportparts="
                                          base:format-button-base,
                                          prefix:format-button-prefix,
                                          label:format-button-label,
                                          suffix:format-button-suffix
                                      "
                                      @click=${this.handleFormatToggle}
                                      @pc-focus=${this
                                          .stopNestedEventPropagation}
                                      @pc-blur=${this
                                          .stopNestedEventPropagation}
                                  >
                                      ${this.setLetterCase(this.format)}
                                  </pc-button>
                              `
                            : ""}
                        ${hasEyeDropper
                            ? html`
                                  <pc-button
                                      part="eyedropper-button"
                                      size="small"
                                      variant="outlined"
                                      exportparts="
                                          base:eyedropper-button-base,
                                          prefix:eyedropper-button-prefix,
                                          label:eyedropper-button-label,
                                          suffix:eyedropper-button-suffix,
                                      "
                                      @click=${this.handleEyeDropper}
                                      @pc-focus=${this
                                          .stopNestedEventPropagation}
                                      @pc-blur=${this
                                          .stopNestedEventPropagation}
                                  >
                                      <pc-icon
                                          library="system"
                                          icon-style="solid"
                                          name="eye-dropper"
                                          label=${this.localize.term(
                                              "pickAColorFromTheScreen",
                                          )}
                                      ></pc-icon>
                                  </pc-button>
                              `
                            : ""}
                    </pc-button-group>
                </div>

                ${swatches.length > 0
                    ? html`
                          <div part="swatches" class="swatches">
                              ${swatches.map((swatch) => {
                                  const parsedColor = this.parseColor(swatch);

                                  if (!parsedColor) {
                                      console.error(
                                          `Unable to parse this swatch colour: ${swatch}`,
                                          this,
                                      );
                                      return "";
                                  }

                                  return html`
                                      <div
                                          part="swatch"
                                          class="swatch pixel-background"
                                          tabindex=${ifDefined(
                                              this.disabled ? undefined : "0",
                                          )}
                                          role="button"
                                          aria-label=${swatch}
                                          @click=${() =>
                                              this.selectSwatch(swatch)}
                                          @keydown=${(event: KeyboardEvent) =>
                                              !this.disabled &&
                                              event.key === "Enter" &&
                                              this.setColor(parsedColor.hexa)}
                                      >
                                          <div
                                              class="swatch-color"
                                              style=${styleMap({
                                                  backgroundColor:
                                                      parsedColor.hexa,
                                              })}
                                          ></div>
                                      </div>
                                  `;
                              })}
                          </div>
                      `
                    : ""}
                ${this.inline
                    ? html`
                          <slot class="pc-visually-hidden" name="hint">
                              ${this.hint}
                          </slot>
                      `
                    : ""}
            </div>
        `;

        if (this.inline) {
            return colorPicker;
        }

        return html`
            <label
                part="label"
                class="label"
                id="label"
                aria-hidden=${hasLabel ? "false" : "true"}
            >
                <slot name="label">${this.label}</slot>
            </label>
            <pc-popup
                class="color-popup"
                part="popup"
                placement="bottom-start"
                distance="0"
                skidding="0"
                sync="width"
                flip
                flip-fallback-strategy="best-fit"
                shift
                shift-padding="10"
                aria-disabled=${this.disabled ? "true" : "false"}
            >
                <button
                    type="button"
                    part="trigger"
                    slot="anchor"
                    class=${classMap({
                        "popup-trigger": true,
                        "empty": this.isEmpty,
                        "focused": this.hasFocus,
                        "pixel-background": true,
                    })}
                    style=${styleMap({
                        color: this.getHexString(
                            this.hue,
                            this.saturation,
                            this.brightness,
                            this.alpha,
                        ),
                    })}
                    .disabled=${this.disabled}
                    aria-labelledby="label"
                    @click=${this.handleTriggerClick}
                    @keydown=${this.handleTriggerKeyDown}
                    @keyup=${this.handleTriggerKeyUp}
                ></button>

                ${colorPicker}
            </pc-popup>

            <slot
                class=${classMap({ "has-hint": hasHint })}
                part="hint"
                id="hint"
                name="hint"
                aria-hidden=${hasHint ? "false" : "true"}
            >
                ${this.hint}
            </slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-color-picker": PcColorPicker;
    }
}
