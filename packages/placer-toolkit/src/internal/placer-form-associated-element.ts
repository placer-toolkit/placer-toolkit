import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { PcInvalidEvent } from "../events/pc-invalid.js";
import { CustomErrorValidator } from "./validators/custom-error-validator.js";
import { PlacerElement } from "./placer-element.js";

export interface Validator<
    T extends PlacerFormAssociatedElement = PlacerFormAssociatedElement,
> {
    observedAttributes?: string[];
    checkValidity: (element: T) => {
        message: string;
        isValid: boolean;
        invalidKeys: Exclude<keyof ValidityState, "valid">[];
    };
    message?: string | ((element: T) => string);
}

export interface PlacerFormControl extends PlacerElement {
    name: null | string;
    disabled?: boolean;
    defaultValue?: unknown;
    defaultChecked?: boolean;
    checked?: boolean;
    defaultSelected?: boolean;
    selected?: boolean;

    get form(): HTMLFormElement | null;
    set form(value: string);

    value?: unknown;

    pattern?: string;
    min?: number | string | Date;
    max?: number | string | Date;
    step?: number | "any";
    required?: boolean;
    minlength?: number;
    maxlength?: number;

    readonly validity: ValidityState;
    readonly validationMessage: string;

    checkValidity: () => boolean;
    getForm: () => HTMLFormElement | null;
    reportValidity: () => boolean;
    setCustomValidity: (message: string) => void;

    hasInteracted: boolean;
    valueHasChanged?: boolean;

    customError: null | string;
}

export class PlacerFormAssociatedElement
    extends PlacerElement
    implements
        Omit<ElementInternals, "form" | "setFormValue">,
        PlacerFormControl
{
    static formAssociated = true;

    /** Validators are static because they have `observedAttributes`, essentially attributes to “watch” for changes. Whenever these attributes change, we want to be notified and update the validator. */
    static get validators(): Validator[] {
        return [CustomErrorValidator()];
    }

    static get observedAttributes() {
        const parentAttributes = new Set(super.observedAttributes || []);

        for (const validator of this.validators) {
            if (!validator.observedAttributes) {
                continue;
            }

            for (const attr of validator.observedAttributes) {
                parentAttributes.add(attr);
            }
        }

        return [...parentAttributes];
    }

    /** The name of the input, submitted as a name/value pair with form data. */
    @property({ reflect: true }) name: string | null = null;

    /** Disables the form control. */
    @property({ type: Boolean }) disabled = false;

    required: boolean = false;

    assumeInteractionOn: string[] = ["input"];

    input?:
        | (HTMLElement & { value: unknown })
        | HTMLInputElement
        | HTMLTextAreaElement;

    validators: Validator[] = [];

    @property({ state: true, attribute: false }) valueHasChanged: boolean =
        false;
    @property({ state: true, attribute: false }) hasInteracted: boolean = false;

    @property({ attribute: "custom-error", reflect: true }) customError:
        | string
        | null = null;

    private emittedEvents: string[] = [];

    constructor() {
        super();

        this.addEventListener("invalid", this.emitInvalid);
    }

    states!: CustomStateSet;

    connectedCallback() {
        super.connectedCallback();
        this.updateValidity();

        this.assumeInteractionOn.forEach((event) => {
            this.addEventListener(event, this.handleInteraction);
        });
    }

    firstUpdated(...args: Parameters<LitElement["firstUpdated"]>) {
        super.firstUpdated(...args);
        this.updateValidity();
    }

    emitInvalid = (event: Event) => {
        if (event.target !== this) {
            return;
        }

        this.hasInteracted = true;
        this.dispatchEvent(new PcInvalidEvent());
    };

    protected willUpdate(
        changedProperties: Parameters<LitElement["willUpdate"]>[0],
    ) {
        if (changedProperties.has("customError")) {
            if (!this.customError) {
                this.customError = null;
            }

            this.setCustomValidity(this.customError || "");
        }

        if (
            changedProperties.has("value") ||
            changedProperties.has("disabled")
        ) {
            // @ts-expect-error — Some components will use an accessors, other use a property, so we don’t want to limit them.
            const value = this.value as unknown;

            if (Array.isArray(value)) {
                if (this.name) {
                    const formData = new FormData();

                    for (const val of value) {
                        formData.append(this.name, val as string);
                    }

                    this.setValue(formData, formData);
                }
            } else {
                this.setValue(
                    value as FormData | string | File | null,
                    value as FormData | string | File | null,
                );
            }
        }

        if (changedProperties.has("disabled")) {
            this.customStates.set("disabled", this.disabled);

            if (this.hasAttribute("disabled") || !this.matches(":disabled")) {
                this.toggleAttribute("disabled", this.disabled);
            }
        }

        this.updateValidity();

        super.willUpdate(changedProperties);
    }

    private handleInteraction = (event: Event) => {
        const emittedEvents = this.emittedEvents;

        if (!emittedEvents.includes(event.type)) {
            emittedEvents.push(event.type);
        }

        if (emittedEvents.length === this.assumeInteractionOn?.length) {
            this.hasInteracted = true;
        }
    };

    get labels() {
        return this.internals.labels;
    }

    getForm() {
        return this.internals.form;
    }

    /** By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. */
    set form(value: string) {
        if (value) {
            this.setAttribute("form", value);
        } else {
            this.removeAttribute("form");
        }
    }

    get form(): HTMLFormElement | null {
        return this.internals.form;
    }

    @property({ attribute: false, state: true, type: Object })
    get validity() {
        return this.internals.validity;
    }

    get willValidate() {
        return this.internals.willValidate;
    }

    get validationMessage() {
        return this.internals.validationMessage;
    }

    checkValidity() {
        this.updateValidity();
        return this.internals.checkValidity();
    }

    reportValidity() {
        this.updateValidity();
        this.hasInteracted = true;
        return this.internals.reportValidity();
    }

    get validationTarget(): undefined | HTMLElement {
        return (this.input || undefined) as undefined | HTMLElement;
    }

    setValidity(...args: Parameters<typeof this.internals.setValidity>) {
        const flags = args[0];
        const message = args[1];
        let anchor = args[2];

        if (!anchor) {
            anchor = this.validationTarget;
        }

        this.internals.setValidity(flags, message, anchor || undefined);
        this.requestUpdate("validity");
        this.setCustomStates();
    }

    setCustomStates() {
        const required = Boolean(this.required);
        const isValid = this.internals.validity.valid;
        const hasInteracted = this.hasInteracted;

        this.customStates.set("required", required);
        this.customStates.set("optional", !required);
        this.customStates.set("invalid", !isValid);
        this.customStates.set("valid", isValid);
        this.customStates.set("user-invalid", !isValid && hasInteracted);
        this.customStates.set("user-valid", isValid && hasInteracted);
    }

    setCustomValidity(message: string) {
        if (!message) {
            this.customError = null;
            this.setValidity({});

            return;
        }

        this.customError = message;
        this.setValidity({ customError: true }, message, this.validationTarget);
    }

    formResetCallback() {
        this.resetValidity();
        this.hasInteracted = false;
        this.valueHasChanged = false;
        this.emittedEvents = [];
        this.updateValidity();
    }

    formDisabledCallback(isDisabled: boolean) {
        this.disabled = isDisabled;

        this.updateValidity();
    }

    /** Called when the browser is trying to restore element’s state to `state` in which case reason is `restore`, or when the browser is trying to fulfil autofill on behalf of user in which case reason is `autocomplete`. In the case of `restore`, `state` is a `string`, `File` or `FormData` object previously set as the second argument to `setFormValue`. */
    formStateRestoreCallback(
        state: string | File | FormData | null,
        reason: "autocomplete" | "restore",
    ) {
        // @ts-expect-error — We purposely do not have a value property. It makes things hard to extend.
        this.value = state;

        if (reason === "restore") {
            this.resetValidity();
        }

        this.updateValidity();
    }

    setValue(...args: Parameters<typeof this.internals.setFormValue>) {
        const [value, state] = args;

        this.internals.setFormValue(value, state);
    }

    get allValidators() {
        const staticValidators =
            (this.constructor as typeof PlacerFormAssociatedElement)
                .validators || [];
        const validators = this.validators || [];

        return [...staticValidators, ...validators];
    }

    /** Resetting validity is a way of removing manual custom errors and native validation. */
    resetValidity() {
        this.setCustomValidity("");
        this.setValidity({});
    }

    updateValidity() {
        if (
            this.disabled ||
            this.hasAttribute("disabled") ||
            !this.willValidate
        ) {
            this.resetValidity();

            return;
        }

        const validators = this.allValidators;

        if (!validators?.length) {
            return;
        }

        type ValidityKey = {
            -readonly [P in keyof ValidityState]: ValidityState[P];
        };

        const flags: Partial<ValidityKey> = {
            customError: Boolean(this.customError),
        };

        const formControl = this.validationTarget || this.input || undefined;

        let finalMessage = "";

        for (const validator of validators) {
            const { isValid, message, invalidKeys } =
                validator.checkValidity(this);

            if (isValid) {
                continue;
            }

            if (!finalMessage) {
                finalMessage = message;
            }

            if (invalidKeys?.length >= 0) {
                (invalidKeys as (keyof ValidityState)[]).forEach(
                    (str) => (flags[str] = true),
                );
            }
        }

        if (!finalMessage) {
            finalMessage = this.validationMessage;
        }

        this.setValidity(flags, finalMessage, formControl);
    }
}
