import { CSSResultGroup, LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../internal/watch.ts";
import { emit } from "../../internal/emit.ts";
import { PcIcon } from "../icon/icon.ts";
import { styles } from "./avatar.styles.ts";

@customElement("pc-avatar")
export class PcAvatar extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = { "pc-icon": PcIcon };

    @state() private hasError = false;

    @property() image = "";

    @property() initials = "";

    @property() label = "";

    @property() loading: "eager" | "lazy" = "eager";

    @property({ reflect: true }) shape: "circle" | "rounded" | "square" =
        "circle";

    @watch("image")
    handleImageChange() {
        this.hasError = false;
    }

    private handleImageLoadError() {
        this.hasError = true;
        emit(this, "pc-error");
    }

    render() {
        const avatarWithImage = html`
            <img
                class="image"
                part="image"
                src=${this.image}
                loading=${this.loading}
                alt=""
                @error=${this.handleImageLoadError}
            />
        `;

        let avatarWithoutImage = html``;

        if (this.initials) {
            avatarWithoutImage = html`
                <div class="initials">${this.initials}</div>
            `;
        } else {
            avatarWithoutImage = html`
                <div class="icon" part="icon" aria-hidden="true">
                    <slot name="icon">
                        <pc-icon
                            library="default"
                            iconStyle="solid"
                            name="user"
                        ></pc-icon>
                    </slot>
                </div>
            `;
        }

        return html`
            <div
                part="base"
                class=${classMap({
                    avatar: true,
                    circle: this.shape === "circle",
                    rounded: this.shape === "rounded",
                    square: this.shape === "square",
                })}
                role="img"
                aria-label=${this.label}
            >
                ${this.image && !this.hasError
                    ? avatarWithImage
                    : avatarWithoutImage}
            </div>
        `;
    }
}
