import { customElement, property } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { LocalizeController } from "../../utilities/localize.js";

/**
 * @summary Formats a number using the specified locale and options.
 * @status experimental
 * @since 1.0.0-alpha.1
 */
@customElement("pc-format-number")
export class PcFormatNumber extends PlacerElement {
    static get styles() {
        return [];
    }

    private readonly localize = new LocalizeController(this);

    /** The number to format. */
    @property({ type: Number }) value = 0;

    /** The formatting style to use. */
    @property() type: "currency" | "decimal" | "percent" = "decimal";

    /** Turns off grouping separators. */
    @property({ attribute: "without-grouping", type: Boolean })
    withoutGrouping = false;

    /** The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code to use when formatting. */
    @property() currency = "USD";

    /** Specifies how to display the currency. */
    @property({ attribute: "currency-display" }) currencyDisplay:
        | "symbol"
        | "narrowSymbol"
        | "code"
        | "name" = "symbol";

    /** The minimum number of integer digits to use. Possible values are 1–21. */
    @property({ attribute: "minimum-integer-digits", type: Number })
    minimumIntegerDigits?: number;
    /** The minimum number of fraction digits to use. Possible values are 0–100. */
    @property({ attribute: "minimum-fraction-digits", type: Number })
    minimumFractionDigits?: number;

    /** The maximum number of fraction digits to use. Possible values are 0–100. */
    @property({ attribute: "maximum-fraction-digits", type: Number })
    maximumFractionDigits?: number;

    /** The minimum number of significant digits to use. Possible values are 1–21. */
    @property({ attribute: "minimum-significant-digits", type: Number })
    minimumSignificantDigits?: number;

    /** The maximum number of significant digits to use,. Possible values are 1–21. */
    @property({ attribute: "maximum-significant-digits", type: Number })
    maximumSignificantDigits?: number;

    /** Forces the component to use the SI standard for formatting. This overrides locale‐specific rules. */
    @property({ attribute: "use-si", type: Boolean }) useSI = false;

    private formatSINumber(value: number): string {
        let numberString = this.localize.number(value, {
            style: "decimal",
            useGrouping: false,
            minimumIntegerDigits: this.minimumIntegerDigits,
            minimumFractionDigits: this.minimumFractionDigits,
            maximumFractionDigits: this.maximumFractionDigits,
            minimumSignificantDigits: this.minimumSignificantDigits,
            maximumSignificantDigits: this.maximumSignificantDigits,
        });

        const parts = numberString.split(".");
        const integerPart = parts[0];
        const fractionalPart = parts[1];

        const formattedInteger = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            " ",
        );

        if (fractionalPart) {
            return `${formattedInteger},${fractionalPart}`;
        } else {
            return formattedInteger;
        }
    }

    render() {
        if (isNaN(this.value)) {
            return "";
        }

        if (this.useSI) {
            switch (this.type) {
                case "decimal":
                    return this.formatSINumber(this.value);
                case "percent":
                    const percentageValue = this.value * 100;
                    const formattedNumber =
                        this.formatSINumber(percentageValue);
                    return `${formattedNumber} %`;
                case "currency":
                    return this.localize.number(this.value, {
                        style: "currency",
                        currency: this.currency,
                        currencyDisplay: this.currencyDisplay,
                        useGrouping: !this.withoutGrouping,
                    });
                default:
                    return "";
            }
        }

        return this.localize.number(this.value, {
            style: this.type,
            currency: this.currency,
            currencyDisplay: this.currencyDisplay,
            useGrouping: !this.withoutGrouping,
            minimumIntegerDigits: this.minimumIntegerDigits,
            minimumFractionDigits: this.minimumFractionDigits,
            maximumFractionDigits: this.maximumFractionDigits,
            minimumSignificantDigits: this.minimumSignificantDigits,
            maximumSignificantDigits: this.maximumSignificantDigits,
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-format-number": PcFormatNumber;
    }
}
