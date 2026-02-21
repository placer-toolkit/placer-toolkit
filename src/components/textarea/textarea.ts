import { html } from "lit";
import type { PropertyPart, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerFormAssociatedElement } from "../../internal/placer-form-associated-element.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { MirrorValidator } from "../../internal/validators/mirror-validator.js";
import { HasSlotController } from "../../internal/slot.js";
import { watch } from "../../internal/watch.js";
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
 * @event change - Emitted when an alteration to the textarea’s value is committed by the user.
 * @event input - Emitted when the textarea receives input.
 * @event focus - Emitted when the textarea gains focus.
 * @event blur - Emitted when the textarea loses focus.
 * @event pc-invalid - Emitted when the textarea has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart form-control - The form control that wraps the label, textarea and hint.
 * @csspart base - The internal textarea element’s wrapper.
 * @csspart label - The textarea’s label.
 * @csspart hint - The textarea’s hint.
 * @csspart textarea - The internal `<textarea>` element.
 */
@customElement("pc-textarea")
export class PcTextarea extends PlacerFormAssociatedElement {
    static css = [formControlStyles, sizeStyles, styles];

    static get validators() {
        return [...super.validators, MirrorValidator()];
    }

    assumeInteractionOn = ["input", "blur"];

    private readonly hasSlotController = new HasSlotController(
        this,
        "label",
        "hint",
    );
    private resizeObserver: ResizeObserver | undefined;

    @query(".control") input!: HTMLTextAreaElement;
    @query('[part~="base"]') base!: HTMLDivElement;
    @query(".size-adjuster") sizeAdjuster!: HTMLDivElement;

    @property() title = "";

    /** The name of the textarea, submitted as a name/value pair with form data. */
    @property() name = "";

    private _value: string | null = null;

    /** The current value of the textarea, submitted as a name/value pair with form data. */
    get value() {
        if (this.valueHasChanged) {
            return this._value;
        }

        return this._value ?? this.defaultValue;
    }

    @state()
    set value(value: string | null) {
        if (this._value === value) {
            return;
        }

        this.valueHasChanged = true;
        this._value = value;
    }

    /** The default value of the textarea. Primarily used for resetting the textarea. */
    @property({ attribute: "value", reflect: true }) defaultValue: string =
        this.getAttribute("value") ?? "";

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

    connectedCallback() {
        super.connectedCallback();

        this.resizeObserver = new ResizeObserver(() =>
            this.setTextareaDimensions(),
        );

        this.updateComplete.then(() => {
            this.setTextareaDimensions();
            this.resizeObserver?.observe(this.input);

            if (this.input && this.value !== this.input.value) {
                const value = this.input.value;

                this.value = value;
            }
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        if (this.input) {
            this.resizeObserver?.unobserve(this.input);
        }
    }

    private handleChange(event: Event) {
        this.valueHasChanged = true;
        this.value = this.input.value;

        this.setTextareaDimensions();
        this.checkValidity();
        this.relayNativeEvent(event, { bubbles: true, composed: true });
    }

    private handleInput(event: InputEvent) {
        this.valueHasChanged = true;
        this.value = this.input.value;

        this.relayNativeEvent(event, { bubbles: true, composed: true });
    }

    private handleBlur() {
        this.checkValidity();
    }

    private setTextareaDimensions() {
        if (this.resize === "none") {
            this.base.style.inlineSize = "";
            this.base.style.blockSize = "";
        }

        if (this.resize === "auto") {
            // Reset the height to auto to ensure scrollHeight reflects the content size
            // Once field-sizing: content has better support, we’ll likely switch to it.
            // https://caniuse.com/mdn-css_properties_field-sizing
            this.sizeAdjuster.style.blockSize = `${this.input.clientHeight}px`;
            this.input.style.blockSize = "auto";
            this.input.style.blockSize = `${this.input.scrollHeight}px`;

            this.base.style.inlineSize = "";
            this.base.style.blockSize = "";

            return;
        }

        if (this.input.style.inlineSize) {
            const inlineSize =
                Number(this.input.style.inlineSize.split(/px/)[0]) + 2;

            this.base.style.inlineSize = `${inlineSize}px`;
        }

        if (this.input.style.width) {
            const width = Number(this.input.style.width.split(/px/)[0]) + 2;

            this.base.style.width = `${width}px`;
        }

        if (this.input.style.blockSize) {
            const blockSize =
                Number(this.input.style.blockSize.split(/px/)[0]) + 2;

            this.base.style.height = `${blockSize}px`;
        }

        if (this.input.style.height) {
            const height = Number(this.input.style.height.split(/px/)[0]) + 2;

            this.base.style.height = `${height}px`;
        }
    }

    @watch("rows", { waitUntilFirstUpdate: true })
    handleRowsChange() {
        this.setTextareaDimensions();
    }

    @watch("value", { waitUntilFirstUpdate: true })
    async handleValueChange() {
        await this.updateComplete;

        this.checkValidity();
        this.setTextareaDimensions();
    }

    updated(changedProperties: PropertyValues<this>) {
        if (changedProperties.has("resize")) {
            this.setTextareaDimensions();
        }

        super.updated(changedProperties);

        if (changedProperties.has("value")) {
            this.customStates.set("blank", !this.value);
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

    /** Gets or sets the textarea’s scroll position. */
    scrollPosition(position?: {
        top?: number;
        left?: number;
    }): { top: number; left: number } | undefined {
        if (position) {
            if (typeof position.top === "number") {
                this.input.scrollTop = position.top;
            }
            if (typeof position.left === "number") {
                this.input.scrollLeft = position.left;
            }
            return undefined;
        }

        return {
            top: this.input.scrollTop,
            left: this.input.scrollTop,
        };
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

        if (this.value !== this.input.value) {
            this.value = this.input.value;
            this.setTextareaDimensions();
        }
    }

    formResetCallback() {
        this.value = this.defaultValue;

        super.formResetCallback();
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
                    @change=${this.handleChange}
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
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
