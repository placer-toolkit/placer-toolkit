import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { watch } from "../../internal/watch.js";
import QrCreator from "qr-creator";
import { styles } from "./qr-code.styles.js";

@customElement("pc-qr-code")
export class PcQrCode extends LitElement {
    static styles: CSSResultGroup = styles;

    @query("canvas") canvas!: HTMLElement;

    @property() background = "white";

    @property({ attribute: "error-correction" }) errorCorrection:
        | "L"
        | "M"
        | "Q"
        | "H" = "M";

    @property() fill = "black";

    @property() label = "";

    @property({ type: Number }) radius = 0;

    @property({ type: Number }) size = 128;

    @property() value = "";

    firstUpdated() {
        this.generate();
    }

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
                    width: `${this.size}px`,
                    height: `${this.size}px`,
                })}
                aria-label=${this.label?.length > 0 ? this.label : this.value}
            ></canvas>
        `;
    }
}
