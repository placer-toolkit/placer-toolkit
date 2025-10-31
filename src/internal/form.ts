import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { PlacerFormControl } from "./placer-form-control.js";
import type { PcButton } from "../components/button/button.js";

export const formCollections: WeakMap<
    HTMLFormElement,
    Set<PlacerFormControl>
> = new WeakMap();

const reportValidityOverloads: WeakMap<HTMLFormElement, () => boolean> =
    new WeakMap();
const checkValidityOverloads: WeakMap<HTMLFormElement, () => boolean> =
    new WeakMap();

const userInteractedControls: WeakSet<PlacerFormControl> = new WeakSet();
const interactions = new WeakMap<PlacerFormControl, string[]>();

export interface FormControlControllerOptions {
    /** A function that returns the form containing the form control. */
    form: (input: PlacerFormControl) => HTMLFormElement | null;
    /** A function that returns the form control’s name, which will be submitted with the form data. */
    name: (input: PlacerFormControl) => string;
    /** A function that returns the form control’s current value. */
    value: (input: PlacerFormControl) => unknown | unknown[];
    /** A function that returns the form control’s default value. */
    defaultValue: (input: PlacerFormControl) => unknown | unknown[];
    /** A function that returns the form control’s current disabled state. If disabled, the value won’t be submitted. */
    disabled: (input: PlacerFormControl) => boolean;

    /** A function that maps to the form control’s `reportValidity()` function. When the form control is invalid, this will prevent submission and trigger the browser’s constraint validation warning. */
    reportValidity: (input: PlacerFormControl) => boolean;
    /** A function that maps to the form control’s `checkValidity()` function. When the form control is invalid, this will return `false`. This is helpful if you want to check validation without triggering the browser’s constraint validation warning. */
    checkValidity: (input: PlacerFormControl) => boolean;
    /** A function that sets the form control’s value. */
    setValue: (input: PlacerFormControl, value: unknown) => void;
    /** An array of event names to listen to. When all events in the list are emitted, the form control will receive validity states such as valid and invalid user‐interacted validity states. */
    assumeInteractionOn: string[];
}

/** A reactive controller to allow form controls to participate in form submission, validation, etc. */
export class FormControlController implements ReactiveController {
    host: PlacerFormControl & ReactiveControllerHost;
    form?: HTMLFormElement | null;
    options: FormControlControllerOptions;

    constructor(
        host: ReactiveControllerHost & PlacerFormControl,
        options?: Partial<FormControlControllerOptions>,
    ) {
        (this.host = host).addController(this);
        this.options = {
            form: (input) => {
                const formID = input.form;

                if (formID) {
                    const root = input.getRootNode() as
                        | Document
                        | ShadowRoot
                        | HTMLElement;
                    const form = root.querySelector(`#${formID}`);

                    if (form) {
                        return form as HTMLFormElement;
                    }
                }

                return input.closest("form");
            },
            name: (input) => input.name,
            value: (input) => input.value,
            defaultValue: (input) => input.defaultValue,
            disabled: (input) => input.disabled ?? false,
            reportValidity: (input) =>
                typeof input.reportValidity === "function"
                    ? input.reportValidity()
                    : true,
            checkValidity: (input) =>
                typeof input.checkValidity === "function"
                    ? input.checkValidity()
                    : true,
            setValue: (input, value: unknown) =>
                (input.value = value as string),
            assumeInteractionOn: ["pc-input"],
            ...options,
        };
    }

    hostConnected() {
        const form = this.options.form(this.host);

        if (form) {
            this.attachForm(form);
        }

        interactions.set(this.host, []);
        this.options.assumeInteractionOn.forEach((event) => {
            this.host.addEventListener(event, this.handleInteraction);
        });
    }

    hostDisconnected() {
        this.detachForm();

        interactions.delete(this.host);
        this.options.assumeInteractionOn.forEach((event) => {
            this.host.removeEventListener(event, this.handleInteraction);
        });
    }

    hostUpdated() {
        const form = this.options.form(this.host);

        if (!form) {
            this.detachForm();
        }

        if (form && this.form !== form) {
            this.detachForm();
            this.attachForm(form);
        }

        if (this.host.hasUpdated) {
            this.setValidity(this.host.validity.valid);
        }
    }

    private attachForm(form?: HTMLFormElement) {
        if (form) {
            this.form = form;

            if (formCollections.has(this.form)) {
                formCollections.get(this.form)!.add(this.host);
            } else {
                formCollections.set(
                    this.form,
                    new Set<PlacerFormControl>([this.host]),
                );
            }

            this.form.addEventListener("formdata", this.handleFormData);
            this.form.addEventListener("submit", this.handleFormSubmit);
            this.form.addEventListener("reset", this.handleFormReset);

            if (!reportValidityOverloads.has(this.form)) {
                reportValidityOverloads.set(
                    this.form,
                    this.form.reportValidity,
                );
                this.form.reportValidity = () => this.reportFormValidity();
            }

            if (!checkValidityOverloads.has(this.form)) {
                checkValidityOverloads.set(this.form, this.form.checkValidity);
                this.form.checkValidity = () => this.checkFormValidity();
            }
        } else {
            this.form = undefined;
        }
    }

    private detachForm() {
        if (!this.form) {
            return;
        }

        const formCollection = formCollections.get(this.form);

        if (!formCollection) {
            return;
        }

        formCollection.delete(this.host);

        if (formCollection.size <= 0) {
            this.form.removeEventListener("formdata", this.handleFormData);
            this.form.removeEventListener("submit", this.handleFormSubmit);
            this.form.removeEventListener("reset", this.handleFormReset);

            if (reportValidityOverloads.has(this.form)) {
                this.form.reportValidity = reportValidityOverloads.get(
                    this.form,
                )!;
                reportValidityOverloads.delete(this.form);
            }

            if (checkValidityOverloads.has(this.form)) {
                this.form.checkValidity = checkValidityOverloads.get(
                    this.form,
                )!;
                checkValidityOverloads.delete(this.form);
            }

            this.form = undefined;
        }
    }

    private handleFormData = (event: FormDataEvent) => {
        const disabled = this.options.disabled(this.host);
        const name = this.options.name(this.host);
        const value = this.options.value(this.host);

        const isButton = this.host.tagName.toLowerCase() === "pc-button";

        if (
            this.host.isConnected &&
            !disabled &&
            !isButton &&
            typeof name === "string" &&
            name.length > 0 &&
            typeof value !== "undefined"
        ) {
            if (Array.isArray(value)) {
                (value as unknown[]).forEach((val) => {
                    event.formData.append(
                        name,
                        (val as string | number | boolean).toString(),
                    );
                });
            } else {
                event.formData.append(
                    name,
                    (value as string | number | boolean).toString(),
                );
            }
        }
    };

    private handleFormSubmit = (event: Event) => {
        const disabled = this.options.disabled(this.host);
        const reportValidity = this.options.reportValidity;

        if (this.form && !this.form.noValidate) {
            formCollections.get(this.form)?.forEach((control) => {
                this.setUserInteracted(control, true);
            });
        }

        if (
            this.form &&
            !this.form.noValidate &&
            !disabled &&
            !reportValidity(this.host)
        ) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };

    private handleFormReset = () => {
        this.options.setValue(this.host, this.options.defaultValue(this.host));
        this.setUserInteracted(this.host, false);
        interactions.set(this.host, []);
    };

    private handleInteraction = (event: Event) => {
        const emittedEvents = interactions.get(this.host)!;

        if (!emittedEvents.includes(event.type)) {
            emittedEvents.push(event.type);
        }

        if (emittedEvents.length === this.options.assumeInteractionOn.length) {
            this.setUserInteracted(this.host, true);
        }
    };

    private checkFormValidity = () => {
        if (this.form && !this.form.noValidate) {
            const elements = this.form.querySelectorAll<HTMLInputElement>("*");

            for (const element of elements) {
                if (typeof element.checkValidity === "function") {
                    if (!element.checkValidity()) {
                        return false;
                    }
                }
            }
        }

        return true;
    };

    private reportFormValidity = () => {
        if (this.form && !this.form.noValidate) {
            const elements = this.form.querySelectorAll<HTMLInputElement>("*");

            for (const element of elements) {
                if (typeof element.reportValidity === "function") {
                    if (!element.reportValidity()) {
                        return false;
                    }
                }
            }
        }

        return true;
    };

    private setUserInteracted(
        element: PlacerFormControl,
        hasInteracted: boolean,
    ) {
        if (hasInteracted) {
            userInteractedControls.add(element);
        } else {
            userInteractedControls.delete(element);
        }

        element.requestUpdate();
    }

    private doAction(
        type: "submit" | "reset",
        submitter?: HTMLInputElement | PcButton,
    ) {
        if (this.form) {
            const button = document.createElement("button");
            button.type = type;
            button.style.position = "absolute";
            button.style.inlineSize = "0";
            button.style.blockSize = "0";
            button.style.width = "0";
            button.style.height = "0";
            button.style.clipPath = "inset(50%)";
            button.style.overflow = "hidden";
            button.style.whiteSpace = "nowrap";

            if (submitter) {
                button.name = submitter.name;
                button.value = submitter.value;

                [
                    "formaction",
                    "formenctype",
                    "formmethod",
                    "formnovalidate",
                    "formtarget",
                ].forEach((attribute) => {
                    if (submitter.hasAttribute(attribute)) {
                        button.setAttribute(
                            attribute,
                            submitter.getAttribute(attribute)!,
                        );
                    }
                });
            }

            this.form.append(button);
            button.click();
            button.remove();
        }
    }

    /** Returns the associated `<form>` element, if one exists. */
    getForm() {
        return this.form ?? null;
    }

    /** Resets the form, restoring all form controls to their default value. */
    reset(submitter?: HTMLInputElement | PcButton) {
        this.doAction("reset", submitter);
    }

    /** Submits the form, triggering validation and form data injection. */
    submit(submitter?: HTMLInputElement | PcButton) {
        this.doAction("submit", submitter);
    }

    /** Synchronously sets the form control’s validity. Call this when you know the future validity state but need to update the host element immediately (i.e., before Lit updates the component in the next update). */
    setValidity(isValid: boolean) {
        const host = this.host;
        const hasInteracted = Boolean(userInteractedControls.has(host));
        const required = Boolean(host.required);

        host.toggleAttribute("data-required", required);
        host.toggleAttribute("data-optional", !required);
        host.toggleAttribute("data-invalid", !isValid);
        host.toggleAttribute("data-valid", isValid);
        host.toggleAttribute("data-user-invalid", !isValid && hasInteracted);
        host.toggleAttribute("data-user-valid", isValid && hasInteracted);
    }

    /** Updates the form control’s validity based on the current value of `host.validity.valid`. Call this when anything that affects constraint validation changes so the component receives the correct validity states. */
    updateValidity() {
        const host = this.host;
        this.setValidity(host.validity.valid);
    }

    /** Dispatches a non‐bubbling, cancellable custom event called `pc-invalid`. If the `pc-invalid` event will be cancelled, then the original `invalid` event (which may have been passed as an argument) will also be cancelled. If no original `invalid` event has been passed, then the `pc-invalid` event will be cancelled before being dispatched. */
    emitInvalidEvent(originalInvalidEvent?: Event) {
        const pcInvalidEvent = new CustomEvent<Record<PropertyKey, never>>(
            "pc-invalid",
            {
                bubbles: false,
                composed: false,
                cancelable: true,
                detail: {},
            },
        );

        if (!originalInvalidEvent) {
            pcInvalidEvent.preventDefault();
        }

        if (!this.host.dispatchEvent(pcInvalidEvent)) {
            originalInvalidEvent?.preventDefault();
        }
    }
}

export const validValidityState: ValidityState = Object.freeze({
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valid: true,
    valueMissing: false,
});

export const valueMissingValidityState: ValidityState = Object.freeze({
    ...validValidityState,
    valid: false,
    valueMissing: true,
});

export const customErrorValidityState: ValidityState = Object.freeze({
    ...validValidityState,
    valid: false,
    customError: true,
});
