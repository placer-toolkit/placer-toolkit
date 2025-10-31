import { PlacerElement } from "./placer-element.js";

/** An interface designed for Placer form controls. */
export interface PlacerFormControl extends PlacerElement {
    name: string;
    value: unknown;
    disabled?: boolean;
    defaultValue?: unknown;
    defaultChecked?: boolean;
    form?: string;

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
}
