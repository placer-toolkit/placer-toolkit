import { customElement, property } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { LocalizeController } from "../../utilities/localize.js";

/**
 * @summary Formats a number as a human‐readable byte value.
 * @status experimental
 * @since 1.0.0-alpha.1
 */
@customElement("pc-format-bytes")
export class PcFormatBytes extends PlacerElement {
    static get styles() {
        return [];
    }

    private readonly localize = new LocalizeController(this);

    /** The number to format in bytes. */
    @property({ type: Number }) value = 0;

    /** The type of unit to display. */
    @property() unit: "byte" | "bit" = "byte";

    /** Determines how to display the result. (Narrow: 100B, Short: 100 B, Long: 100 bytes) */
    @property() display: "long" | "short" | "narrow" = "short";

    /** Forces the component to use the SI standard for formatting. This overrides locale‐specific rules. */
    @property({ attribute: "use-si", type: Boolean }) useSI = false;

    render() {
        if (isNaN(this.value)) {
            return "";
        }

        // Note: Petabit (Pb) isn’t a supported unit
        const bitPrefixes = ["", "kilo", "mega", "giga", "tera"];
        const bytePrefixes = ["", "kilo", "mega", "giga", "tera", "peta"];
        const prefix = this.unit === "bit" ? bitPrefixes : bytePrefixes;
        const index = Math.max(
            0,
            Math.min(Math.floor(Math.log10(this.value) / 3), prefix.length - 1),
        );
        const valueToFormat = parseFloat(
            (this.value / Math.pow(1000, index)).toPrecision(3),
        );

        if (this.useSI) {
            const unitPrefixes = ["", "k", "M", "G", "T", "P"];
            const siUnit = unitPrefixes[index];

            const formattedNumber = this.localize.number(valueToFormat, {
                style: "decimal",
            });
            const correctedNumber = formattedNumber.replace(".", ",");

            switch (this.display) {
                case "narrow":
                    return `${correctedNumber}${siUnit}${this.unit === "byte" ? "B" : "b"}`;
                case "short":
                    return `${correctedNumber} ${siUnit}${this.unit === "byte" ? "B" : "b"}`;
                case "long":
                    const plural = valueToFormat === 1 ? "" : "s";
                    return `${correctedNumber} ${prefix[index]}${this.unit}${plural}`;
                default:
                    return "";
            }
        }

        const unit = prefix[index] + this.unit;

        return this.localize.number(valueToFormat, {
            style: "unit",
            unit,
            unitDisplay: this.display,
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-format-bytes": PcFormatBytes;
    }
}
