import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import type { PlacerFormControl } from "../../internal/placer-form-control.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { defaultValue } from "../../internal/default-value.js";
import { FormControlController } from "../../internal/form.js";
import { HasSlotController } from "../../internal/slot.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import formControlStyles from "../../styles/component-styles/form-control.css";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./textarea.css";

/**
 * @summary Textareas collect data from the user and allow multiple lines of text.
 * @status experimental
 * @since 1.0.0-alpha.1
 *
 * @slot label - The textarea’s label. Alternatively, you can use the `label` attribute.
 * @slot hint - Text that describes how to use the textarea. Alternatively, you can use the `hint` attribute.
 *
 * @event pc-input - Emitted when the textarea receives input.
 * @event pc-change - Emitted when an alteration to the textarea’s value is committed by the user.
 * @event pc-focus - Emitted when the textarea gains focus.
 * @event pc-blur - Emitted when the textarea loses focus.
 * @event pc-invalid - Emitted when the textarea has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart form-control - The form control that wraps the label, textarea and hint.
 * @csspart base - The internal textarea element’s wrapper.
 * @csspart label - The textarea’s label.
 * @csspart hint - The textarea’s hint.
 * @csspart textarea - The internal `<textarea>` element.
 */
@customElement("pc-textarea")
export class PcTextarea extends PlacerElement implements PlacerFormControl {
    /** @internal This is an internal static property. */
    static css = [formControlStyles, sizeStyles, styles];

    private readonly formControlController = new FormControlController(this, {
        assumeInteractionOn: ["pc-blur", "pc-input"],
    });
    private readonly hasSlotController = new HasSlotController(
        this,
        "label",
        "hint",
    );
    private resizeObserver: ResizeObserver | undefined;

    /** @internal This is an internal class property. */
    @query(".control") input!: HTMLTextAreaElement;
    /** @internal This is an internal class property. */
    @query(".size-adjuster") sizeAdjuster!: HTMLDivElement;

    @state() private hasFocus = false;

    /** @internal This is an internal property. */
    @property() title = "";

    /** The name of the textarea, submitted as a name/value pair with form data. */
    @property() name = "";

    /** The current value of the textarea, submitted as a name/value pair with form data. */
    @property() value = "";

    /** The textarea’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Draws a filled textarea control. */
    @property({ type: Boolean, reflect: true }) filled = false;

    /** The textarea’s label. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";

    /** The textarea’s hint. If you need to display HTML, use the `hint` slot instead. */
    @property() hint = "";

    /** Placeholder text to show as a hint when the textarea is empty. */
    @property() placeholder = "";

    /** The number of rows to display by default. */
    @property({ type: Number }) rows = 4;

    /** Controls how the textarea can be resized. */
    @property() resize: "none" | "vertical" | "horizontal" | "both" | "auto" =
        "vertical";

    /** Disables the textarea. */
    @property({ type: Boolean }) disabled = false;

    /** Makes the textarea readonly. */
    @property({ type: Boolean, reflect: true }) readonly = false;

    /** By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. */
    @property({ reflect: true }) form = "";

    /** Indicates if the textarea must be filled in or not. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** The minimum length of text in the textarea that will be considered valid. */
    @property({ type: Number }) minlength?: number;

    /** The maximum length of text in the textarea that will be considered valid. */
    @property({ type: Number }) maxlength?: number;

    /** Controls whether and how text is automatically capitalised as it is entered by the user. */
    @property() autocapitalize:
        | "off"
        | "none"
        | "on"
        | "sentences"
        | "words"
        | "characters" = "sentences";

    /** Indicates whether the browser’s autocorrect feature is on or off. */
    @property({
        type: Boolean,
        converter: {
            fromAttribute: (value) =>
                !value || value === "off" ? false : true,
            toAttribute: (value) => (value ? "on" : "off"),
        },
    })
    autocorrect = false;

    /** Specifies what permission the browser has to provide assistance in filling in form fields. Refer to [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for valid values. */
    @property() autocomplete?: string;

    /** Indicates that the textarea should receive focus on page load. */
    @property({ type: Boolean }) autofocus = false;

    /** Used to customise the label or icon of the Enter key on virtual keyboards. */
    @property() enterkeyhint:
        | "enter"
        | "done"
        | "go"
        | "next"
        | "previous"
        | "search"
        | "send" = "enter";

    /** Enable spellcheck on the textarea. */
    @property({
        type: Boolean,
        converter: {
            fromAttribute: (value) =>
                !value || value === "off" ? false : true,
            toAttribute: (value) => (value ? "on" : "off"),
        },
    })
    spellcheck = true;

    /** Tells the browser what type of data will be entered by the user, allowing virtual keyboards to display the correct keyboard type to the user. */
    @property() inputmode?:
        | "none"
        | "text"
        | "decimal"
        | "numeric"
        | "tel"
        | "search"
        | "email"
        | "url";

    /** The default value of the textarea. Primarily used for resetting the textarea. */
    @defaultValue() defaultValue = "";

    /** Gets the validity state object. */
    get validity() {
        return this.input.validity;
    }

    /** Gets the validation message. */
    get validationMessage() {
        return this.input.validationMessage;
    }

    connectedCallback() {
        super.connectedCallback();
        this.updateComplete.then(() => {
            if (this.resize === "auto") {
                this.setTextareaHeight();
            }
        });
    }

    firstUpdated() {
        this.formControlController.updateValidity();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.resizeObserver) {
            this.resizeObserver.unobserve(this.input);
            this.resizeObserver.disconnect();
            this.resizeObserver = undefined;
        }
    }

    private handleInput() {
        this.value = this.input.value;
        emit(this, "pc-input");
    }

    private handleChange() {
        this.value = this.input.value;
        this.setTextareaHeight();
        emit(this, "pc-change");
    }

    private handleFocus() {
        this.hasFocus = true;
        emit(this, "pc-focus");
    }

    private handleBlur() {
        this.hasFocus = false;
        emit(this, "pc-blur");
    }

    private handleInvalid(event: Event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
    }

    private setTextareaHeight() {
        if (this.resize === "auto") {
            // Reset the height to auto to ensure scrollHeight reflects the content size
            this.input.style.blockSize = "auto";
            this.input.style.blockSize = `${this.input.scrollHeight}px`;
        } else {
            this.input.style.blockSize = "";
        }
    }

    /** @internal This is an internal method. */
    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.formControlController.updateValidity();
    }

    /** @internal This is an internal method. */
    @watch("rows", { waitUntilFirstUpdate: true })
    handleRowsChange() {
        this.setTextareaHeight();
    }

    /** @internal This is an internal method. */
    @watch("value", { waitUntilFirstUpdate: true })
    async handleValueChange() {
        await this.updateComplete;
        this.formControlController.updateValidity();
        this.setTextareaHeight();
    }

    /** @internal This is an internal method. */
    @watch("resize", { waitUntilFirstUpdate: true })
    handleResizeChange() {
        if (this.resize === "auto") {
            if (!this.resizeObserver) {
                this.resizeObserver = new ResizeObserver(() =>
                    this.setTextareaHeight(),
                );
            }
            this.setTextareaHeight();
            this.resizeObserver.observe(this.input);
        } else {
            if (this.resizeObserver) {
                this.resizeObserver.unobserve(this.input);
            }
            this.input.style.blockSize = "";
        }
    }

    /** Focuses the textarea. */
    focus(options?: FocusOptions) {
        this.input.focus(options);
    }

    /** Unfocuses the textarea (i.e., blurs it). */
    blur() {
        this.input.blur();
    }

    /** Selects all the text in the textarea. */
    select() {
        this.input.select();
    }

    /** Gets the textarea’s scroll position. */
    getScrollPosition(): { top: number; left: number } {
        return {
            top: this.input.scrollTop,
            left: this.input.scrollLeft,
        };
    }

    /** Sets the textarea’s scroll position. */
    setScrollPosition(position: { top?: number; left?: number }) {
        if (typeof position.top === "number") {
            this.input.scrollTop = position.top;
        }

        if (typeof position.left === "number") {
            this.input.scrollLeft = position.left;
        }
    }

    /** Sets the start and end positions of the text selection (0‐based). */
    setSelectionRange(
        selectionStart: number,
        selectionEnd: number,
        selectionDirection: "forward" | "backward" | "none" = "none",
    ) {
        this.input.setSelectionRange(
            selectionStart,
            selectionEnd,
            selectionDirection,
        );
    }

    /** Replaces a range of text with a new string. */
    setRangeText(
        replacement: string,
        start?: number,
        end?: number,
        selectMode: "select" | "start" | "end" | "preserve" = "preserve",
    ) {
        const selectionStart = start ?? this.input.selectionStart;
        const selectionEnd = end ?? this.input.selectionEnd;

        this.input.setRangeText(
            replacement,
            selectionStart,
            selectionEnd,
            selectMode,
        );
    }

    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
        return this.input.checkValidity();
    }

    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    /** Checks for validity and shows the browser’s validation message if the select is invalid. */
    reportValidity() {
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

        return html`
            <label
                part="label"
                class="label"
                for="input"
                aria-hidden=${hasLabel ? "false" : "true"}
            >
                <slot name="label">${this.label}</slot>
            </label>

            <div part="base" class="textarea">
                <textarea
                    part="textarea"
                    class="control"
                    id="input"
                    title=${this.title}
                    name=${ifDefined(this.name)}
                    .value=${live(this.value)}
                    ?disabled=${this.disabled}
                    ?readonly=${this.readonly}
                    ?required=${this.required}
                    placeholder=${ifDefined(this.placeholder)}
                    rows=${ifDefined(this.rows)}
                    minlength=${ifDefined(this.minlength)}
                    maxlength=${ifDefined(this.maxlength)}
                    autocapitalize=${ifDefined(this.autocapitalize)}
                    autocorrect=${ifDefined(this.autocorrect)}
                    ?autofocus=${this.autofocus}
                    spellcheck=${ifDefined(this.spellcheck)}
                    enterkeyhint=${ifDefined(this.enterkeyhint)}
                    inputmode=${ifDefined(this.inputmode)}
                    aria-describedby="hint"
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                    @focus=${this.handleFocus}
                    @blur=${this.handleBlur}
                    @invalid=${this.handleInvalid}
                ></textarea>

                <!-- This part is explicitly undocumented as it isn’t supposed to be accessed by users. -->
                <div
                    part="textarea-adjuster"
                    class="size-adjuster"
                    ?hidden=${this.resize !== "auto"}
                ></div>
            </div>

            <slot
                part="hint"
                class=${classMap({ "has-hint": hasHint })}
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
        "pc-textarea": PcTextarea;
    }
}
