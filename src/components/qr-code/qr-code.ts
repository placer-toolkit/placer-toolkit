import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { styleMap } from "lit/directives/style-map.js";
import { watch } from "../../internal/watch.js";
import QrCreator from "qr-creator";
import styles from "./qr-code.css";

/**
 * @summary Generates a [QR code](https://www.qrcode.com/) and renders it using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).
 * @status experimental
 * @since 0.1.0
 *
 * @csspart base - The component’s base wrapper.
 */
@customElement("pc-qr-code")
export class PcQrCode extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;

    /** @internal This is an internal class property. */
    @query("canvas") canvas!: HTMLElement;

    /** The QR code’s value. */
    @property() value = "";

    /** A label to use to describe the QR code to assistive devices. If unspecified, the value will be used instead. */
    @property() label = "";

    /** The size of the QR code in pixels. */
    @property({ type: Number }) size = 128;

    /** The QR code’s fill colour. This can be any valid CSS colour value, but not a custom property. */
    @property() fill = "black";

    /** The QR code’s background colour. This can be any valid CSS colour value or `transparent`, but not a custom property. */
    @property() background = "white";

    /** The corner radius of each QR code module. Must be a value between 0 and 0,5. */
    @property({ type: Number }) radius = 0;

    /** The level of error correction to use. */
    @property({ attribute: "error-correction" }) errorCorrection:
        | "L"
        | "M"
        | "Q"
        | "H" = "M";

    firstUpdated() {
        this.generate();
    }

    /** @internal This is an internal method. */
    @watch(["background", "errorCorrection", "fill", "radius", "size", "value"])
    generate() {
        if (!this.hasUpdated) {
            return;
        }

        QrCreator.render(
            {
                background: this.background,
                ecLevel: this.errorCorrection,
                fill: this.fill,
                radius: this.radius,
                size: this.size * 2,
                text: this.value,
            },
            this.canvas,
        );
    }

    render() {
        return html`
            <canvas
                class="qr-code"
                part="base"
                role="img"
                style=${styleMap({
                    inlineSize: `${this.size}px`,
                    blockSize: `${this.size}px`,
                })}
                aria-label=${this.label?.length > 0 ? this.label : this.value}
            ></canvas>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-qr-code": PcQrCode;
    }
}
