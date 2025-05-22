import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "./input.js";
import "../icon/icon.js";

const meta: Meta = {
    title: "Components/Input",
    component: "pc-input",
    argTypes: {
        autocapitalize: {
            control: "select",
            options: ["off", "none", "on", "sentences", "words", "characters"],
            description: "Sets where to auto‐capitalise the string.",
        },
        autocomplete: {
            control: "text",
            description: "Enables auto‐complete on the input.",
        },
        autocorrect: {
            control: "select",
            options: ["off", "on"],
            description: "Enables auto‐correct on the input.",
        },
        autofocus: {
            control: "boolean",
            description:
                "Sets if the input will be automatically focused on page load.",
        },
        clearable: {
            control: "boolean",
            description: "Adds a clear button to the input.",
        },
        disabled: {
            control: "boolean",
            description: "Disables the input.",
        },
        defaultValue: {
            control: "text",
            description: "Sets the default value. Useful for resetting forms.",
        },
        enterkeyhint: {
            control: "select",
            options: [
                "enter",
                "done",
                "go",
                "next",
                "previous",
                "search",
                "send",
            ],
            description:
                "Gives a visual cue on the Enter key on virtual keyboards.",
        },
        filled: {
            control: "boolean",
            description: "Enables the filled style.",
        },
        form: {
            control: "text",
            description: "Connects the input to a form element with an id.",
        },
        hint: {
            control: "text",
            description: "Adds supplementary text under the input.",
        },
        inputmode: {
            control: "select",
            options: [
                "none",
                "text",
                "decimal",
                "numeric",
                "tel",
                "search",
                "email",
                "url",
            ],
            description:
                "Specifies which type of keyboard to display on mobile devices.",
        },
        label: {
            control: "text",
            description: "Adds a label above the input.",
        },
        min: {
            control: "number",
            description: "Sets the minimum number allowed for number inputs.",
        },
        minlength: {
            control: "number",
            description: "Sets the minimum length allowed for the input.",
        },
        max: {
            control: "number",
            description: "Sets the maximum number allowed for number inputs.",
        },
        maxlength: {
            control: "number",
            description: "Sets the maximum length allowed for the input.",
        },
        name: {
            control: "text",
            description: "Adds a name to refer to in forms.",
        },
        noSpinButtons: {
            control: "boolean",
            description: "Removes the spin buttons for number inputs.",
        },
        passwordToggle: {
            control: "boolean",
            description: "Enables the password toggle for password inputs.",
        },
        pattern: {
            control: "text",
            description:
                "Restricts the input to allow characters only from the provided RegEx expression.",
        },
        passwordVisible: {
            control: "boolean",
            description: "Shows the password by default for password inputs.",
        },
        pill: {
            control: "boolean",
            description: "Sets the shape of the input to a pill.",
        },
        placeholder: {
            control: "text",
            description: "Adds a placeholder to the input.",
        },
        readonly: {
            control: "boolean",
            description: "Sets the input to read‐only.",
        },
        required: {
            control: "boolean",
            description:
                "If enabled, you must fill out the input with valid data.",
        },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
            description: "Sets the size of the input.",
        },
        spellcheck: {
            control: "boolean",
            description: "Enables spellcheck on the input.",
        },
        step: {
            control: "number",
            description:
                "Sets how many numbers to skip when increasing or decreasing the number with the provided spin buttons on number inputs.",
        },
        title: {
            control: "text",
            description:
                "Sets the title attribute on the input. We recommend using Tooltip instead.",
        },
        type: {
            control: "select",
            options: [
                "date",
                "datetime-local",
                "email",
                "number",
                "password",
                "search",
                "tel",
                "text",
                "time",
                "url",
            ],
            description: "Sets the input type.",
        },
        value: {
            control: "text",
            description: "Sets the default value inside the input.",
        },
        prefix: {
            control: "text",
            description: "Content to display in the prefix slot.",
        },
        suffix: {
            control: "text",
            description: "Content to display in the suffix slot.",
        },
    },
    args: {
        autocapitalize: "none",
        autocomplete: undefined,
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "",
        inputmode: "text",
        label: "",
        min: undefined,
        minlength: undefined,
        max: undefined,
        maxlength: undefined,
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: false,
        placeholder: "",
        readonly: false,
        required: false,
        size: "medium",
        spellcheck: true,
        step: undefined,
        title: "",
        type: "text",
        value: "",
        prefix: "",
        suffix: "",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const Label: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "",
        inputmode: "text",
        label: "What’s your name?",
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: false,
        placeholder: "",
        readonly: false,
        required: false,
        size: "medium",
        spellcheck: true,
        title: "",
        type: "text",
        value: "",
        prefix: "",
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const Hint: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "What would you like people to call you?",
        inputmode: "text",
        label: "Nickname",
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: false,
        placeholder: "",
        readonly: false,
        required: false,
        size: "medium",
        spellcheck: true,
        title: "",
        type: "text",
        value: "",
        prefix: "",
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const Placeholder: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "",
        inputmode: "text",
        label: "",
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: false,
        placeholder: "Search the web…",
        readonly: false,
        required: false,
        size: "medium",
        spellcheck: true,
        title: "",
        type: "text",
        value: "",
        prefix: "",
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const Clearable: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: true,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "",
        inputmode: "text",
        label: "",
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: false,
        placeholder: "Search the web…",
        readonly: false,
        required: false,
        size: "medium",
        spellcheck: true,
        title: "",
        type: "text",
        value: "",
        prefix: "",
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const PasswordToggle: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "",
        inputmode: "text",
        label: "Create your password",
        name: "",
        noSpinButtons: false,
        passwordToggle: true,
        pattern: "",
        passwordVisible: false,
        pill: false,
        placeholder: "Make it as secure as possible!",
        readonly: false,
        required: false,
        size: "medium",
        spellcheck: true,
        title: "",
        type: "password",
        value: "",
        prefix: "",
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const Filled: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: true,
        form: "",
        hint: "",
        inputmode: "text",
        label: "",
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: false,
        placeholder: "Search the web…",
        readonly: false,
        required: false,
        size: "medium",
        spellcheck: true,
        title: "",
        type: "text",
        value: "",
        prefix: "",
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const Disabled: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: true,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "",
        inputmode: "text",
        label: "",
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: false,
        placeholder: "Disabled",
        readonly: false,
        required: false,
        size: "medium",
        spellcheck: true,
        title: "",
        type: "text",
        value: "",
        prefix: "",
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const Large: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "",
        inputmode: "text",
        label: "",
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: false,
        placeholder: "Large",
        readonly: false,
        required: false,
        size: "large",
        spellcheck: true,
        title: "",
        type: "text",
        value: "",
        prefix: "",
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const Small: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "",
        inputmode: "text",
        label: "",
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: false,
        placeholder: "Small",
        readonly: false,
        required: false,
        size: "small",
        spellcheck: true,
        title: "",
        type: "text",
        value: "",
        prefix: "",
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const Pill: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "",
        inputmode: "text",
        label: "",
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: true,
        placeholder: "Pill",
        readonly: false,
        required: false,
        size: "medium",
        spellcheck: true,
        title: "",
        type: "text",
        value: "",
        prefix: "",
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const InputTypes: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "",
        inputmode: "text",
        label: "E‐mail",
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: false,
        placeholder: "",
        readonly: false,
        required: false,
        size: "medium",
        spellcheck: true,
        title: "",
        type: "email",
        value: "",
        prefix: "",
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};

export const Prefix: Story = {
    args: {
        autocapitalize: "none",
        autocorrect: "off",
        autofocus: false,
        clearable: false,
        disabled: false,
        defaultValue: "",
        enterkeyhint: "enter",
        filled: false,
        form: "",
        hint: "",
        inputmode: "text",
        label: "",
        name: "",
        noSpinButtons: false,
        passwordToggle: false,
        pattern: "",
        passwordVisible: false,
        pill: true,
        placeholder: "Search the web…",
        readonly: false,
        required: false,
        size: "medium",
        spellcheck: true,
        title: "",
        type: "text",
        value: "",
        prefix: '<pc-icon library="default" icon-style="solid" name="magnifying-glass"></pc-icon>',
        suffix: "",
    },

    render: ({
        autocapitalize,
        autocomplete,
        autocorrect,
        autofocus,
        clearable,
        disabled,
        defaultValue,
        enterkeyhint,
        filled,
        form,
        hint,
        inputmode,
        label,
        min,
        minlength,
        max,
        maxlength,
        name,
        noSpinButtons,
        passwordToggle,
        pattern,
        passwordVisible,
        pill,
        placeholder,
        readonly,
        required,
        size,
        spellcheck,
        step,
        title,
        type,
        value,
        prefix,
        suffix,
    }) => html`
        <pc-input
            autocapitalize=${autocapitalize}
            autocomplete=${autocomplete}
            autocorrect=${autocorrect}
            ?autofocus=${autofocus}
            ?clearable=${clearable}
            ?disabled=${disabled}
            defaultValue=${defaultValue}
            enterkeyhint=${enterkeyhint}
            ?filled=${filled}
            form=${form}
            hint=${hint}
            inputmode=${inputmode}
            label=${label}
            min=${min}
            minlength=${minlength}
            max=${max}
            maxlength=${maxlength}
            name=${name}
            ?no-spin-buttons=${noSpinButtons}
            ?password-toggle=${passwordToggle}
            pattern=${pattern}
            ?password-visible=${passwordVisible}
            ?pill=${pill}
            placeholder=${placeholder}
            ?readonly=${readonly}
            ?required=${required}
            size=${size}
            ?spellcheck=${spellcheck}
            step=${step}
            title=${title}
            type=${type}
            value=${value}
        >
            ${prefix
                ? html`<span slot="prefix">${unsafeHTML(prefix)}</span>`
                : ""}
            ${suffix
                ? html`<span slot="suffix">${unsafeHTML(suffix)}</span>`
                : ""}
        </pc-input>
    `,
};
