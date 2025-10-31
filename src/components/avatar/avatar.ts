import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcIcon } from "../icon/icon.js";
import styles from "./avatar.css";

/**
 * @summary Avatars are used to represent a person or object.
 * @status experimental
 * @since 0.1.0
 *
 * @dependency pc-icon
 *
 * @event pc-error - Emitted when the image couldn’t be loaded. This may be because of an invalid URL, a temporary network error or some other unknown cause.
 *
 * @slot icon - The default icon to use when no image or initials are present. Works best with `<pc-icon>`.
 *
 * @csspart base - The component’s base wrapper.
 * @csspart icon - The container that wraps the avatar’s icon.
 * @csspart initials - The container that wraps the avatar’s initials.
 * @csspart image - The avatar image. Only shown when the `image` attribute is set.
 *
 * @cssproperty --size: 3rem - The size of the avatar.
 */
@customElement("pc-avatar")
export class PcAvatar extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;
    /** @internal This is an internal static property. */
    static dependencies = { "pc-icon": PcIcon };

    @state() private hasError = false;

    /** The image source to use for the avatar. */
    @property() image = "";

    /** A label to use to describe the avatar to assistive devices. */
    @property() label = "";

    /** Initials to use as a fallback when no image is available (1–2 characters recommended). */
    @property() initials = "";

    /** Indicates how the browser should load the image. */
    @property() loading: "eager" | "lazy" = "eager";

    /** The shape of the avatar. */
    @property({ reflect: true }) shape: "circle" | "rounded" | "square" =
        "circle";

    /** @internal This is an internal method. */
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
                            library="system"
                            icon-style="solid"
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

declare global {
    interface HTMLElementTagNameMap {
        "pc-avatar": PcAvatar;
    }
}
