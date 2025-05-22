import type { ReactiveController, ReactiveControllerHost } from "lit";

export const formCollections: WeakMap<
    HTMLFormElement,
    Set<HTMLInputElement>
> = new WeakMap();

const reportValidityOverloads: WeakMap<HTMLFormElement, () => boolean> =
    new WeakMap();
const checkValidityOverloads: WeakMap<HTMLFormElement, () => boolean> =
    new WeakMap();

const userInteractedControls: WeakSet<HTMLInputElement> = new WeakSet();
const interactions = new WeakMap<HTMLInputElement, string[]>();

export interface FormControlControllerOptions {
    form: (input: HTMLInputElement) => HTMLFormElement | null;
    name: (input: HTMLInputElement) => string;
    value: (input: HTMLInputElement) => unknown | unknown[];
    defaultValue: (input: HTMLInputElement) => unknown | unknown[];
    disabled: (input: HTMLInputElement) => boolean;
    reportValidity: (input: HTMLInputElement) => boolean;
    checkValidity: (input: HTMLInputElement) => boolean;
    setValue: (input: HTMLInputElement, value: unknown) => void;
    assumeInteractionOn: string[];
}

export class FormControlController implements ReactiveController {
    host: HTMLInputElement & ReactiveControllerHost;
    form?: HTMLFormElement | null;
    options: FormControlControllerOptions;

    constructor(
        host: ReactiveControllerHost & HTMLInputElement,
        options?: Partial<FormControlControllerOptions>,
    ) {
        (this.host = host).addController(this);
        this.options = {
            form: (input) => input.closest("form"),
            name: (input) => input.name,
            value: (input) => input.value,
            defaultValue: (input) => input.defaultValue,
            disabled: (input) => input.disabled,
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
            assumeInteractionOn: ["input"],
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

        if ("hasUpdated" in this.host && this.host.hasUpdated) {
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
                    new Set<HTMLInputElement>([this.host]),
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

        if (
            this.host.isConnected &&
            !disabled &&
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

            for (const element of Array.from(elements)) {
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

            for (const element of Array.from(elements)) {
                if (typeof element.reportValidity === "function") {
                    if (!element.reportValidity()) {
                        return false;
                    }
                }
            }
        }

        return true;
    };

    private setUserInteracted(el: HTMLInputElement, hasInteracted: boolean) {
        if (hasInteracted) {
            userInteractedControls.add(el);
        } else {
            userInteractedControls.delete(el);
        }

        el.dispatchEvent(new Event("update"));
    }

    private doAction(type: "submit" | "reset", submitter?: HTMLInputElement) {
        if (this.form) {
            const button = document.createElement("button");
            button.type = type;
            button.style.position = "absolute";
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
                ].forEach((attr) => {
                    if (submitter.hasAttribute(attr)) {
                        button.setAttribute(
                            attr,
                            submitter.getAttribute(attr)!,
                        );
                    }
                });
            }

            this.form.append(button);
            button.click();
            button.remove();
        }
    }

    getForm() {
        return this.form ?? null;
    }

    reset(submitter?: HTMLInputElement) {
        this.doAction("reset", submitter);
    }

    submit(submitter?: HTMLInputElement) {
        this.doAction("submit", submitter);
    }

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

    updateValidity() {
        const host = this.host;
        this.setValidity(host.validity.valid);
    }

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
