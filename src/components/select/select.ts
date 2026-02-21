import { html } from "lit";
import type { PropertyValues, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerFormAssociatedElement } from "../../internal/placer-form-associated-element.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import {
    getAnimation,
    setDefaultAnimation,
} from "../../utilities/animation-registry.js";
import { animateTo, stopAnimations } from "../../internal/animate.js";
import { RequiredValidator } from "../../internal/validators/required-validator.js";
import { HasSlotController } from "../../internal/slot.js";
import { LocalizeController } from "../../utilities/localize.js";
import { PcAfterHideEvent } from "../../events/pc-after-hide.js";
import { PcAfterShowEvent } from "../../events/pc-after-show.js";
import { PcClearEvent } from "../../events/pc-clear.js";
import { PcHideEvent } from "../../events/pc-hide.js";
import { PcRemoveEvent } from "../../events/pc-remove.js";
import { PcShowEvent } from "../../events/pc-show.js";
import { scrollIntoView } from "../../internal/scroll.js";
import { waitForEvent } from "../../internal/event.js";
import { watch } from "../../internal/watch.js";
import "../icon/icon.js";
import type { PcOption } from "../option/option.js";
import "../popup/popup.js";
import type { PcPopup } from "../popup/popup.js";
import "../tag/tag.js";
import formControlStyles from "../../styles/component-styles/form-control.css";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./select.css";

setDefaultAnimation("select.show", {
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

setDefaultAnimation("select.hide", {
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
 * @summary Selects allow you to choose items from a menu of predefined options.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-icon
 * @dependency pc-popup
 * @dependency pc-tag
 *
 * @slot - The listbox options. Only `<pc-option>` and `<pc-divider>` elements can be slotted here. You can use `<pc-divider>` to group items visually.
 * @slot label - The select’s label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the combobox.
 * @slot suffix - Used to append a presentational icon or similar element to the combobox.
 * @slot clear-icon - An icon to use in place of the default clear icon.
 * @slot expand-icon - The icon to show when the select is expanded and collapsed. Rotates on open and close.
 * @slot hint - Text that describes how to use the select. Alternatively, you can use the `hint` attribute.
 *
 * @event change - Emitted when the select’s value changes.
 * @event input - Emitted when the select receives input.
 * @event focus - Emitted when the select gains focus.
 * @event blur - Emitted when the select loses focus.
 * @event pc-clear - Emitted when the select’s value is cleared.
 * @event pc-show - Emitted when the select’s menu opens.
 * @event pc-after-show - Emitted after the select’s menu opens and all animations are complete.
 * @event pc-hide - Emitted when the select’s menu closes.
 * @event pc-after-hide - Emitted after the select’s menu closes and all animations are complete.
 * @event pc-invalid - Emitted when the select has been checked for validity and its constraints aren’t satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input and hint.
 * @csspart label - The select’s label.
 * @csspart input - The select’s input.
 * @csspart hint - The select’s hint.
 * @csspart combobox - The container the wraps the prefix, suffix, combobox, clear icon and expand button.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart suffix - The container that wraps the suffix slot.
 * @csspart display-input - The element that displays the selected option’s label, an `<input>` element.
 * @csspart listbox - The listbox container where options are slotted.
 * @csspart tags - The container that houses option tags when `multiselect` is used.
 * @csspart tag - The individual tags that represent each multi‐select option.
 * @csspart tag-base - The tag’s base part.
 * @csspart tag-content - The tag’s content part.
 * @csspart tag-remove-button - The tag’s remove button.
 * @csspart tag-remove-button-base - The tag’s remove button base part.
 * @csspart clear-button - The clear button.
 * @csspart expand-icon - The container that wraps the expand icon.
 *
 * @cssproperty --tag-max-size: 10ch - The maximum size of the tags in multi‐select mode until their content is truncated.
 */
@customElement("pc-select")
export class PcSelect extends PlacerFormAssociatedElement {
    static css = [formControlStyles, sizeStyles, styles];

    static get validators() {
        const validators = [
            RequiredValidator({
                validationElement: Object.assign(
                    document.createElement("select"),
                    { required: true },
                ),
            }),
        ];

        return [...super.validators, ...validators];
    }

    assumeInteractionOn = ["input", "blur"];

    private readonly hasSlotController = new HasSlotController(
        this,
        "label",
        "hint",
    );
    private readonly localize = new LocalizeController(this);

    private selectionOrder: Map<string, number> = new Map();
    private typeToSelectString = "";
    private typeToSelectTimeout!: number;

    @query(".select") popup!: PcPopup;
    @query(".combobox") combobox!: HTMLSlotElement;
    @query(".display-input") displayInput!: HTMLInputElement;
    @query(".value-input") valueInput!: HTMLInputElement;
    @query(".listbox") listbox!: HTMLSlotElement;

    /** Where to anchor native constraint validation. */
    get validationTarget() {
        return this.valueInput;
    }

    @state() displayLabel = "";
    @state() currentOption!: PcOption;
    @state() selectedOptions: PcOption[] = [];
    @state() optionValues: Set<string | null> | undefined;

    /** The name of the select, submitted as a name/value pair with form data. */
    @property() name = "";

    private _defaultValue: null | string | string[] = null;

    /** The default value of the select. Primarily used for resetting the select. */
    @property({ attribute: false })
    set defaultValue(value: null | string | string[]) {
        this._defaultValue = this.convertDefaultValue(value) || "";
    }

    get defaultValue() {
        return this.convertDefaultValue(this._defaultValue);
    }

    /** @private A converter for `defaultValue` to convert it from an array to a string if it’s a multi‐select. */
    private convertDefaultValue(value: typeof this.defaultValue) {
        const isMultiple = this.multiple || this.hasAttribute("multiple");

        if (!isMultiple && Array.isArray(value)) {
            value = value[0];
        }

        return value;
    }

    /** The select’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Placeholder text to show as a hint when the select is empty. */
    @property() placeholder = "";

    /** Allows more than one option to be selected. */
    @property({ type: Boolean, reflect: true }) multiple = false;

    /** The maximum number of selected options to show when the `multiple` attribute is true. After the maximum limit, “+number” will be shown to indicate the number of additional items that are selected. Set the value to 0 to remove the limit. */
    @property({ attribute: "max-options-visible", type: Number })
    maxOptionsVisible = 3;

    /** Disables the select. */
    @property({ type: Boolean }) disabled = false;

    /** Adds a clear button when the select is not empty. */
    @property({ type: Boolean }) clearable = false;

    /** Indicates whether or not the select is open. You can toggle this attribute to show and hide the menu, or you can use the `show()` and `hide()` methods and this attribute will reflect the select’s open state. */
    @property({ type: Boolean, reflect: true }) open = false;

    /** Draws a filled select combobox. */
    @property({ type: Boolean, reflect: true }) filled = false;

    /** Draws a pill‐style select. */
    @property({ type: Boolean, reflect: true }) pill = false;

    /** The select’s label. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";

    /** The preferred placement of the select’s listbox. Note that the actual placement may vary to keep the listbox inside of the viewport. */
    @property({ reflect: true }) placement: "top" | "bottom" = "bottom";

    /** The select’s hint. If you need to display HTML, use the `hint` slot instead. */
    @property() hint = "";

    /** Indicates if the select must be filled in or not. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** A function that customises the tags to be rendered when the `multiple` attribute is true. The first parameter is the option, the second parameter is the current tag’s index. The function should either return either a Lit `TemplateResult` or a string containing trusted HTML of the symbol to render at the specified value. */
    @property() getTag: (
        option: PcOption,
        index: number,
    ) => TemplateResult | string | HTMLElement = (option) => {
        return html`
            <pc-tag
                part="tag"
                size=${this.size}
                ?pill=${this.pill}
                removable
                @pc-remove=${(event: PcRemoveEvent) =>
                    this.handleTagRemove(event, option)}
                exportparts="
                    base:tag-base,
                    content:tag-content,
                    remove-button:tag-remove-button,
                    remove-button-base:tag-remove-button-base
                "
            >
                ${option.label}
            </pc-tag>
        `;
    };

    private _value: string[] | undefined | null;

    /** The value of the select, submitted as a name/value pair with form data. This will be a string for single select or an array for multi‐select. */
    @property({ attribute: "value", reflect: false })
    set value(value: string | string[] | null) {
        let oldValue = this.value;

        if ((value as any) instanceof FormData) {
            value = (value as unknown as FormData).getAll(
                this.name,
            ) as string[];
        }

        if (value != null && !Array.isArray(value)) {
            value = [value];
        }

        this._value = value ?? null;

        let newValue = this.value;

        if (newValue !== oldValue) {
            this.valueHasChanged = true;
            this.requestUpdate("value", oldValue);
        }
    }

    get value() {
        let value = this._value ?? this.defaultValue ?? null;

        if (value != null) {
            value = Array.isArray(value) ? value : [value];
        }

        if (value == null) {
            this.optionValues = new Set(null);
        } else {
            this.optionValues = new Set(
                this.getAllOptions()
                    .filter((option) => !option.disabled)
                    .map((option) => option.value),
            );
        }

        let finalValue: null | string | string[] = value;

        if (value != null) {
            finalValue = value.filter((val) => this.optionValues!.has(val));
            finalValue = this.multiple ? finalValue : finalValue[0];
            finalValue = finalValue ?? null;
        }

        return finalValue;
    }

    connectedCallback() {
        super.connectedCallback();

        this.handleDefaultSlotChange();

        this.open = false;
    }

    private updateDefaultValue() {
        const allOptions = this.getAllOptions();
        const defaultSelectedOptions = allOptions.filter(
            (element) =>
                element.hasAttribute("selected") || element.defaultSelected,
        );

        if (defaultSelectedOptions.length > 0) {
            const selectedValues = defaultSelectedOptions.map(
                (element) => element.value,
            );

            this._defaultValue = this.multiple
                ? selectedValues
                : selectedValues[0];
        }

        if (this.hasAttribute("value")) {
            this._defaultValue = this.getAttribute("value") || null;
        }
    }

    private addOpenListeners() {
        document.addEventListener("focusin", this.handleDocumentFocusIn);
        document.addEventListener("keydown", this.handleDocumentKeyDown);
        document.addEventListener("mousedown", this.handleDocumentMouseDown);

        if (this.getRootNode() !== document) {
            this.getRootNode().addEventListener(
                "focusin",
                this.handleDocumentFocusIn,
            );
        }
    }

    private removeOpenListeners() {
        document.removeEventListener("focusin", this.handleDocumentFocusIn);
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
        document.removeEventListener("mousedown", this.handleDocumentMouseDown);

        if (this.getRootNode() !== document) {
            this.getRootNode().removeEventListener(
                "focusin",
                this.handleDocumentFocusIn,
            );
        }
    }

    private handleFocus() {
        this.displayInput.setSelectionRange(0, 0);
    }

    private handleDocumentFocusIn = (event: Event) => {
        const path = (event as FocusEvent).composedPath();

        if (this && !path.includes(this)) {
            this.hide();
        }
    };

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement;
        const isClearButton = target.closest('[part~="clear-button"]') !== null;
        const isIconButton = target.closest("pc-button") !== null;

        if (isClearButton || isIconButton) {
            return;
        }

        if (event.key === "Escape" && this.open) {
            event.preventDefault();
            event.stopPropagation();

            this.hide();
            this.displayInput.focus({ preventScroll: true });
        }

        if (
            event.key === "Enter" ||
            (event.key === " " && this.typeToSelectString === "")
        ) {
            event.preventDefault();
            event.stopImmediatePropagation();

            if (!this.open) {
                this.show();

                return;
            }

            if (this.currentOption && !this.currentOption.disabled) {
                this.valueHasChanged = true;
                this.hasInteracted = true;

                if (this.multiple) {
                    this.toggleOptionSelection(this.currentOption);
                } else {
                    this.setSelectedOptions(this.currentOption);
                }

                this.updateComplete.then(() => {
                    this.dispatchEvent(
                        new Event("change", { bubbles: true, composed: true }),
                    );
                    this.dispatchEvent(
                        new InputEvent("input", {
                            bubbles: true,
                            composed: true,
                        }),
                    );
                });

                if (!this.multiple) {
                    this.hide();
                    this.displayInput.focus({ preventScroll: true });
                }
            }

            return;
        }

        if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
            const allOptions = this.getAllOptions();
            const currentIndex = allOptions.indexOf(this.currentOption);

            let newIndex = Math.max(0, currentIndex);

            event.preventDefault();

            if (!this.open) {
                this.show();

                if (this.currentOption) {
                    return;
                }
            }

            if (event.key === "ArrowDown") {
                newIndex = currentIndex + 1;
                if (newIndex > allOptions.length - 1) newIndex = 0;
            } else if (event.key === "ArrowUp") {
                newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = allOptions.length - 1;
            } else if (event.key === "Home") {
                newIndex = 0;
            } else if (event.key === "End") {
                newIndex = allOptions.length - 1;
            }

            this.setCurrentOption(allOptions[newIndex]);
        }

        if (
            (event.key && event.key.length === 1) ||
            event.key === "Backspace"
        ) {
            const allOptions = this.getAllOptions();

            // Don’t block modifier keys
            if (event.metaKey || event.ctrlKey || event.altKey) {
                return;
            }

            if (!this.open) {
                if (event.key === "Backspace") {
                    return;
                }

                this.show();
            }

            event.stopPropagation();
            event.preventDefault();

            clearTimeout(this.typeToSelectTimeout);

            this.typeToSelectTimeout = window.setTimeout(() => {
                this.typeToSelectString = "";
            }, 1000);

            if (event.key === "Backspace") {
                this.typeToSelectString = this.typeToSelectString.slice(0, -1);
            } else {
                this.typeToSelectString += event.key.toLowerCase();
            }

            for (const option of allOptions) {
                const label = option.label.toLowerCase();

                if (label.startsWith(this.typeToSelectString)) {
                    this.setCurrentOption(option);

                    break;
                }
            }
        }
    };

    private handleDocumentMouseDown = (event: MouseEvent) => {
        const path = event.composedPath();

        if (this && !path.includes(this)) {
            this.hide();
        }
    };

    private handleLabelClick() {
        this.displayInput.focus();
    }

    private handleComboboxClick(event: MouseEvent) {
        event.preventDefault();
    }

    private handleComboboxMouseDown(event: MouseEvent) {
        const path = event.composedPath();
        const isButton = path.some(
            (element) =>
                element instanceof Element &&
                element.tagName.toLowerCase() === "pc-button",
        );

        if (this.disabled || isButton) {
            return;
        }

        event.preventDefault();
        this.displayInput.focus({ preventScroll: true });
        this.open = !this.open;
    }

    private handleComboboxKeyDown(event: KeyboardEvent) {
        event.stopPropagation();
        this.handleDocumentKeyDown(event);
    }

    private handleClearClick(event: MouseEvent) {
        event.stopPropagation();

        if (this.value !== "") {
            this.selectionOrder.clear();
            this.setSelectedOptions([]);
            this.displayInput.focus({ preventScroll: true });

            this.updateComplete.then(() => {
                this.dispatchEvent(new PcClearEvent());
                this.dispatchEvent(
                    new Event("change", { bubbles: true, composed: true }),
                );
                this.dispatchEvent(
                    new InputEvent("input", { bubbles: true, composed: true }),
                );
            });
        }
    }

    private handleClearMouseDown(event: MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
    }

    private handleOptionClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const option = target.closest("pc-option") as PcOption | null;

        if (option && !option.disabled) {
            this.hasInteracted = true;
            this.valueHasChanged = true;

            if (this.multiple) {
                this.toggleOptionSelection(option);
            } else {
                this.setSelectedOptions(option);
            }

            this.updateComplete.then(() =>
                this.displayInput.focus({ preventScroll: true }),
            );

            this.requestUpdate("value");

            this.updateComplete.then(() => {
                this.dispatchEvent(
                    new Event("change", { bubbles: true, composed: true }),
                );
                this.dispatchEvent(
                    new InputEvent("input", { bubbles: true, composed: true }),
                );
            });

            if (!this.multiple) {
                this.hide();
                this.displayInput.focus({ preventScroll: true });
            }
        }
    }

    /** @internal This is used by the Option component to update labels. */
    public handleDefaultSlotChange() {
        if (!customElements.get("pc-option")) {
            customElements
                .whenDefined("pc-option")
                .then(() => this.handleDefaultSlotChange());
        }

        const allOptions = this.getAllOptions();

        this.optionValues = undefined;

        this.updateDefaultValue();

        let value = this.value;

        if (value == null || (!this.valueHasChanged && !this.hasInteracted)) {
            this.selectionChanged();

            return;
        }

        if (!Array.isArray(value)) {
            value = [value];
        }

        const selectedOptions = allOptions.filter((element) =>
            value.includes(element.value),
        );

        this.setSelectedOptions(selectedOptions);
    }

    private handleTagRemove(event: PcRemoveEvent, directOption?: PcOption) {
        event.stopPropagation();

        if (this.disabled) {
            return;
        }

        this.hasInteracted = true;
        this.valueHasChanged = true;

        let option = directOption;

        if (!option) {
            const tagElement = (event.target as Element).closest(
                "pc-tag[data-value]",
            ) as HTMLElement | null;

            if (tagElement) {
                const value = tagElement.dataset.value;

                option = this.selectedOptions.find(
                    (option) => option.value === value,
                );
            }
        }

        if (option) {
            this.toggleOptionSelection(option, false);

            this.updateComplete.then(() => {
                this.dispatchEvent(
                    new Event("change", { bubbles: true, composed: true }),
                );
                this.dispatchEvent(
                    new InputEvent("input", { bubbles: true, composed: true }),
                );
            });
        }
    }

    private getAllOptions() {
        if (!this?.querySelectorAll) {
            return [];
        }

        return [...this.querySelectorAll<PcOption>("pc-option")];
    }

    private getFirstOption() {
        return this.querySelector<PcOption>("pc-option");
    }

    private setCurrentOption(option: PcOption | null) {
        const allOptions = this.getAllOptions();

        allOptions.forEach((element) => {
            element.current = false;
            element.tabIndex = -1;
        });

        if (option) {
            this.currentOption = option;
            option.current = true;
            option.tabIndex = 0;
            option.focus();
        }
    }

    private setSelectedOptions(option: PcOption | PcOption[]) {
        const allOptions = this.getAllOptions();
        const newSelectedOptions = Array.isArray(option) ? option : [option];

        allOptions.forEach((element) => {
            if (newSelectedOptions.includes(element)) {
                return;
            }

            element.selected = false;
        });

        if (newSelectedOptions.length) {
            newSelectedOptions.forEach((element) => (element.selected = true));
        }

        this.selectionChanged();
    }

    private toggleOptionSelection(option: PcOption, force?: boolean) {
        if (force === true || force === false) {
            option.selected = force;
        } else {
            option.selected = !option.selected;
        }

        this.selectionChanged();
    }

    /** @internal This method must be called whenever the selection changes. It will update the selected options’ cache, the current value and the display value. The Option component uses it internally to update labels as they change. */
    public selectionChanged() {
        const options = this.getAllOptions();

        // Update selected options cache
        const newSelectedOptions = options.filter((element) => {
            if (!this.hasInteracted && !this.valueHasChanged) {
                const defaultValue = this.defaultValue;
                const defaultValues = Array.isArray(defaultValue)
                    ? defaultValue
                    : [defaultValue];
                return (
                    element.hasAttribute("selected") ||
                    element.defaultSelected ||
                    element.selected ||
                    defaultValues?.includes(element.value)
                );
            }

            return element.selected;
        });

        const newSelectedValues = new Set(
            newSelectedOptions.map((el) => el.value),
        );

        for (const value of this.selectionOrder.keys()) {
            if (!newSelectedValues.has(value)) {
                this.selectionOrder.delete(value);
            }
        }

        const maxOrder =
            this.selectionOrder.size > 0
                ? Math.max(...this.selectionOrder.values())
                : -1;

        let nextOrder = maxOrder + 1;

        for (const option of newSelectedOptions) {
            if (!this.selectionOrder.has(option.value)) {
                this.selectionOrder.set(option.value, nextOrder++);
            }
        }

        this.selectedOptions = newSelectedOptions.sort((a, b) => {
            const orderA = this.selectionOrder.get(a.value) ?? 0;
            const orderB = this.selectionOrder.get(b.value) ?? 0;

            return orderA - orderB;
        });

        let selectedValues = new Set(
            this.selectedOptions.map((el) => el.value),
        );

        if (selectedValues.size > 0 || this._value) {
            const oldValue = this._value;

            if (this._value == null) {
                let value = this.defaultValue ?? [];

                this._value = Array.isArray(value) ? value : [value];
            }

            this._value =
                this._value?.filter(
                    (value) => !this.optionValues?.has(value),
                ) ?? null;
            this._value?.unshift(...selectedValues);
            this.requestUpdate("value", oldValue);
        }

        if (this.multiple) {
            if (this.placeholder && !this.value?.length) {
                this.displayLabel = "";
            } else {
                this.displayLabel = this.localize.term(
                    "numOptionsSelected",
                    this.selectedOptions.length,
                );
            }
        } else {
            const selectedOption = this.selectedOptions[0];

            this.displayLabel = selectedOption?.label ?? "";
        }

        this.updateComplete.then(() => {
            this.updateValidity();
        });
    }

    protected get tags() {
        return this.selectedOptions.map((option, index) => {
            if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
                const tag = this.getTag(option, index);

                if (!tag) {
                    return null;
                }

                return typeof tag === "string" ? unsafeHTML(tag) : tag;
            } else if (index === this.maxOptionsVisible) {
                return html`
                    <pc-tag
                        part="tag"
                        exportparts="
                            base:tag-base,
                            content:tag-content,
                            remove-button:tag-remove-button,
                            remove-button-base:tag-remove-button-base
                        "
                    >
                        +${this.selectedOptions.length - index}
                    </pc-tag>
                `;
            }

            return null;
        });
    }

    updated(changedProperties: PropertyValues<this>) {
        super.updated(changedProperties);

        if (changedProperties.has("value")) {
            this.customStates.set("blank", !this.value);
        }
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        if (this.disabled) {
            this.open = false;
        }
    }

    @watch("value", { waitUntilFirstUpdate: true })
    handleValueChange() {
        const allOptions = this.getAllOptions();
        const value = Array.isArray(this.value) ? this.value : [this.value];

        const selectedOptions = allOptions.filter((element) =>
            value.includes(element.value),
        );

        this.setSelectedOptions(selectedOptions);
        this.updateValidity();
    }

    @watch("open", { waitUntilFirstUpdate: true })
    async handleOpenChange() {
        if (this.open && !this.disabled) {
            this.setCurrentOption(
                this.selectedOptions[0] || this.getFirstOption(),
            );

            const pcShow = new PcShowEvent();

            this.dispatchEvent(pcShow);

            if (pcShow.defaultPrevented) {
                this.open = false;

                return;
            }

            this.addOpenListeners();

            await stopAnimations(this);

            this.listbox.hidden = false;
            this.popup.active = true;

            requestAnimationFrame(() => {
                this.setCurrentOption(this.currentOption);
            });

            const { keyframes, options } = getAnimation(this, "select.show", {
                dir: this.localize.dir(),
            });

            await animateTo(this.popup.popup, keyframes, options);

            if (this.currentOption) {
                scrollIntoView(
                    this.currentOption,
                    this.listbox,
                    "vertical",
                    "auto",
                );
            }

            this.dispatchEvent(new PcAfterShowEvent());
        } else {
            const pcHide = new PcHideEvent();

            this.dispatchEvent(pcHide);

            if (pcHide.defaultPrevented) {
                this.open = false;

                return;
            }

            this.removeOpenListeners();

            await stopAnimations(this);

            const { keyframes, options } = getAnimation(this, "select.hide", {
                dir: this.localize.dir(),
            });

            await animateTo(this.popup.popup, keyframes, options);

            this.listbox.hidden = true;
            this.popup.active = false;

            this.dispatchEvent(new PcAfterHideEvent());
        }
    }

    /** Shows the listbox. */
    async show() {
        if (this.open || this.disabled) {
            this.open = false;

            return undefined;
        }

        this.open = true;

        return waitForEvent(this, "pc-after-show");
    }

    /** Hides the listbox. */
    async hide() {
        if (!this.open || this.disabled) {
            this.open = false;

            return undefined;
        }

        this.open = false;

        return waitForEvent(this, "pc-after-hide");
    }

    /** Focuses the select. */
    focus(options?: FocusOptions) {
        this.displayInput.focus(options);
    }

    /** Unfocuses the select (i.e., blurs it). */
    blur() {
        this.displayInput.blur();
    }

    formResetCallback() {
        this.selectionOrder.clear();
        this.value = this.defaultValue;

        super.formResetCallback();
        this.handleValueChange();

        this.updateComplete.then(() => {
            this.dispatchEvent(
                new Event("change", { bubbles: true, composed: true }),
            );
            this.dispatchEvent(
                new InputEvent("input", { bubbles: true, composed: true }),
            );
        });
    }

    render() {
        const hasLabelSlot = this.hasSlotController.test("label");
        const hasHintSlot = this.hasSlotController.test("hint");
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHint = this.hint ? true : !!hasHintSlot;
        const hasClearIcon =
            this.clearable &&
            !this.disabled &&
            this.value &&
            this.value.length > 0;
        const isPlaceholderVisible = Boolean(
            this.placeholder && (!this.value || this.value.length === 0),
        );

        return html`
            <div
                part="form-control"
                class=${classMap({
                    "form-control": true,
                    "form-control-has-label": hasLabel,
                })}
            >
                <label
                    part="label"
                    class="label"
                    id="label"
                    aria-hidden=${hasLabel ? "false" : "true"}
                    @click=${this.handleLabelClick}
                >
                    <slot name="label">${this.label}</slot>
                </label>

                <div part="input" class="form-control-input">
                    <pc-popup
                        class=${classMap({
                            "select": true,
                            "open": this.open,
                            "disabled": this.disabled,
                            "enabled": !this.disabled,
                            "multiple": this.multiple,
                            "placeholder-visible": isPlaceholderVisible,
                        })}
                        placement=${this.placement}
                        sync="width"
                        auto-size="vertical"
                        auto-size-padding="10"
                        shift
                        flip
                    >
                        <div
                            part="combobox"
                            class="combobox"
                            slot="anchor"
                            @keydown=${this.handleComboboxKeyDown}
                            @mousedown=${this.handleComboboxMouseDown}
                        >
                            <slot
                                class="prefix"
                                part="prefix"
                                name="prefix"
                            ></slot>

                            <input
                                part="display-input"
                                class="display-input"
                                type="text"
                                role="combobox"
                                placeholder=${this.placeholder}
                                .disabled=${this.disabled}
                                .value=${this.displayLabel}
                                autocomplete="off"
                                spellcheck="false"
                                autocapitalize="off"
                                aria-controls="listbox"
                                aria-expanded=${this.open ? "true" : "false"}
                                aria-haspopup="listbox"
                                aria-labelledby="label"
                                aria-disabled=${this.disabled
                                    ? "true"
                                    : "false"}
                                aria-describedby="hint"
                                tabindex="0"
                                readonly
                                @focus=${this.handleFocus}
                            />

                            ${this.multiple
                                ? html`
                                      <div
                                          part="tags"
                                          class="tags"
                                          @pc-remove=${this.handleTagRemove}
                                      >
                                          ${this.tags}
                                      </div>
                                  `
                                : ""}

                            <input
                                class="value-input"
                                type="text"
                                ?disabled=${this.disabled}
                                ?required=${this.required}
                                .value=${Array.isArray(this.value)
                                    ? this.value.join(", ")
                                    : this.value}
                                tabindex="-1"
                                aria-hidden="true"
                                @focus=${() => this.focus()}
                            />

                            ${hasClearIcon
                                ? html`
                                      <button
                                          part="clear-button"
                                          type="button"
                                          aria-label=${this.localize.term(
                                              "clearEntry",
                                          )}
                                          @click=${this.handleClearClick}
                                          @mousedown=${this
                                              .handleClearMouseDown}
                                          tabindex="-1"
                                      >
                                          <slot name="clear-icon">
                                              <pc-icon
                                                  library="system"
                                                  icon-style="regular"
                                                  name="circle-xmark"
                                              ></pc-icon>
                                          </slot>
                                      </button>
                                  `
                                : ""}

                            <slot
                                class="suffix"
                                part="suffix"
                                name="suffix"
                            ></slot>

                            <slot
                                class="expand-icon"
                                part="expand-icon"
                                name="expand-icon"
                            >
                                <pc-icon
                                    library="system"
                                    icon-style="solid"
                                    name="chevron-down"
                                ></pc-icon>
                            </slot>
                        </div>

                        <div
                            part="listbox"
                            class="listbox"
                            id="listbox"
                            role="listbox"
                            aria-expanded=${this.open ? "true" : "false"}
                            aria-multiselectable=${this.multiple
                                ? "true"
                                : "false"}
                            aria-labelledby="label"
                            tabindex="-1"
                            @mouseup=${this.handleOptionClick}
                        >
                            <slot
                                @slotchange=${this.handleDefaultSlotChange}
                            ></slot>
                        </div>
                    </pc-popup>

                    <slot
                        part="hint"
                        class=${classMap({ "has-hint": hasHint })}
                        name="hint"
                        id="hint"
                        aria-hidden=${hasHint ? "false" : "true"}
                    >
                        ${this.hint}
                    </slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-select": PcSelect;
    }
}
