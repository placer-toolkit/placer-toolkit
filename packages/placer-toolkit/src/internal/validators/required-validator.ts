import type { Validator } from "../placer-form-associated-element.js";

export interface RequiredValidatorOptions {
    /** This gets translation strings without needing proper translations. */
    validationElement?: HTMLSelectElement | HTMLInputElement;
    /** The property to check if its not nullish. For most elements this will be `value`. For `checkbox`, it will be `checked`. */
    validationProperty?: string;
}

export const RequiredValidator = (
    options: RequiredValidatorOptions = {},
): Validator => {
    let { validationElement, validationProperty } = options;

    if (!validationElement) {
        validationElement = Object.assign(document.createElement("input"), {
            required: true,
        });
    }

    if (!validationProperty) {
        validationProperty = "value";
    }

    const object: Validator = {
        observedAttributes: ["required"],
        message: validationElement.validationMessage,
        checkValidity(element) {
            const validity: ReturnType<Validator["checkValidity"]> = {
                message: "",
                isValid: true,
                invalidKeys: [],
            };

            const isRequired =
                element.required ?? element.hasAttribute("required");

            if (!isRequired) {
                return validity;
            }

            const value = element[validationProperty as keyof typeof element];

            const isEmpty = !value;

            if (isEmpty) {
                validity.message =
                    typeof object.message === "function"
                        ? object.message(element)
                        : object.message || "";
                validity.isValid = false;
                validity.invalidKeys.push("valueMissing");
            }

            return validity;
        },
    };

    return object;
};
