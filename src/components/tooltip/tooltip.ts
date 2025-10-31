import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import {
    animateTo,
    parseDuration,
    stopAnimations,
} from "../../internal/animate.js";
import {
    getAnimation,
    setDefaultAnimation,
} from "../../utilities/animation-registry.js";
import { LocalizeController } from "../../utilities/localize.js";
import { waitForEvent } from "../../internal/event.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcPopup } from "../popup/popup.js";
import styles from "./tooltip.css";

setDefaultAnimation("tooltip.show", {
    keyframes: [
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.05 },
        { opacity: 1, scale: 1 },
    ],
    options: {
        duration: 220,
        easing: "ease-out",
    },
});

setDefaultAnimation("tooltip.hide", {
    keyframes: [
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.9 },
    ],
    options: {
        duration: 140,
        easing: "cubic-bezier(0.4, 0, 1, 1)",
    },
});

/**
 * @summary Tooltips display additional information based on a specific action.
 * @status experimental
 * @since 0.4.0
 *
 * @dependency pc-popup
 *
 * @slot - The tooltip’s target element. Avoid slotting in more than one element, as subsequent elements will be ignored.
 * @slot content - The content to render in the tooltip. Alternatively, you can use the `content` attribute.
 *
 * @event pc-show - Emitted when the tooltip starts to show.
 * @event pc-after-show - Emitted when the tooltip shows and all animations are complete.
 * @event pc-hide - Emitted when the tooltip starts to hide.
 * @event pc-after-hide - Emitted when the tooltip hides and all animations are complete.
 *
 * @csspart base - The component’s base wrapper, a `<pc-popup>` element.
 * @csspart base-popup - The popup’s `popup` part. Use this to target the tooltip’s popup container.
 * @csspart base-arrow - The popup’s `arrow` part. Use this to target the tooltip’s arrow.
 *
 * @cssproperty --max-width: 30ch - The maximum width of the tooltip before its content will wrap.
 * @cssproperty --hide-delay: 0s - The amount of time to wait before hiding the tooltip when hovering.
 * @cssproperty --show-delay: 0.15s - The amount of time to wait before showing the tooltip when hovering.
 *
 * @animation tooltip.show - The animation to use when showing the tooltip.
 * @animation tooltip.hide - The animation to use when hiding the tooltip.
 */
@customElement("pc-tooltip")
export class PcTooltip extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;
    /** @internal This is an internal static property. */
    static dependencies = { "pc-popup": PcPopup };

    private readonly localize = new LocalizeController(this);

    private hoverTimeout!: number;
    private closeWatcher!: CloseWatcher | null;

    /** @internal This is an internal class property. */
    @query("slot:not([name])") defaultSlot!: HTMLSlotElement;
    /** @internal This is an internal class property. */
    @query(".body") body!: HTMLElement;
    /** @internal This is an internal class property. */
    @query("pc-popup") popup!: PcPopup;

    /** The tooltip’s content. If you need to display HTML, use the `content` slot instead. */
    @property() content = "";

    /** The preferred placement of the tooltip. Note that the actual placement will vary as configured to keep the tooltip inside of the viewport. */
    @property() placement:
        | "top"
        | "top-start"
        | "top-end"
        | "right"
        | "right-start"
        | "right-end"
        | "bottom"
        | "bottom-start"
        | "bottom-end"
        | "left"
        | "left-start"
        | "left-end" = "top";

    /** Disables the tooltip so it won’t show when triggered. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** The distance in pixels from which to offset the tooltip away from its target. */
    @property({ type: Number }) distance = 8;

    /** Indicates whether or not the tooltip is open. You can use this instead of the `show()` and `hide()` methods. */
    @property({ type: Boolean, reflect: true }) open = false;

    /** The distance in pixels from which to offset the tooltip along its target. */
    @property({ type: Number }) skidding = 0;

    /** Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus` and `manual`. Multiple options can be passed by separating them with a space. When `manual` is used, the tooltip must be activated programmatically. */
    @property() trigger = "hover focus";

    constructor() {
        super();

        this.addEventListener("click", this.handleClick);
        this.addEventListener("focus", this.handleFocus, true);
        this.addEventListener("blur", this.handleBlur, true);
        this.addEventListener("mouseover", this.handleMouseOver);
        this.addEventListener("mouseout", this.handleMouseOut);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.closeWatcher?.destroy();
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
    }

    firstUpdated() {
        this.body.hidden = !this.open;

        if (this.open) {
            this.popup.active = true;
            this.popup.reposition();
        }
    }

    private handleClick = () => {
        if (this.hasTrigger("click")) {
            if (this.open) {
                this.hide();
            } else {
                this.show();
            }
        }
    };

    private handleFocus = () => {
        if (this.hasTrigger("focus")) {
            this.show();
        }
    };

    private handleBlur = () => {
        if (this.hasTrigger("focus")) {
            this.hide();
        }
    };

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            event.stopPropagation();
            this.hide();
        }
    };

    private handleMouseOver = () => {
        if (this.hasTrigger("hover")) {
            const delay = parseDuration(
                getComputedStyle(this).getPropertyValue("--show-delay"),
            );
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = window.setTimeout(() => this.show(), delay);
        }
    };

    private handleMouseOut = () => {
        if (this.hasTrigger("hover")) {
            const delay = parseDuration(
                getComputedStyle(this).getPropertyValue("--hide-delay"),
            );
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = window.setTimeout(() => this.hide(), delay);
        }
    };

    private hasTrigger(triggerType: string) {
        const triggers = this.trigger.split(" ");
        return triggers.includes(triggerType);
    }

    /** @internal This is an internal method. */
    @watch("open", { waitUntilFirstUpdate: true })
    async handleOpenChange() {
        if (this.open) {
            if (this.disabled) {
                return;
            }

            emit(this, "pc-show");

            if ("CloseWatcher" in window) {
                this.closeWatcher?.destroy();
                this.closeWatcher = new CloseWatcher();
                this.closeWatcher.onclose = () => {
                    this.hide();
                };
            } else {
                document.addEventListener(
                    "keydown",
                    this.handleDocumentKeyDown,
                );
            }

            await stopAnimations(this.body);

            this.body.hidden = false;
            this.popup.active = true;

            const { keyframes, options } = getAnimation(this, "tooltip.show", {
                dir: this.localize.dir(),
            });

            await animateTo(this.popup.popup, keyframes, options);

            this.popup.reposition();

            emit(this, "pc-after-show");
        } else {
            emit(this, "pc-hide");
            this.closeWatcher?.destroy();
            document.removeEventListener("keydown", this.handleDocumentKeyDown);

            await stopAnimations(this.body);

            const { keyframes, options } = getAnimation(this, "tooltip.hide", {
                dir: this.localize.dir(),
            });

            await animateTo(this.popup.popup, keyframes, options);

            this.popup.active = false;
            this.body.hidden = true;

            emit(this, "pc-after-hide");
        }
    }

    /** @internal This is an internal method. */
    @watch(["content", "distance", "placement", "skidding"])
    async handleOptionsChange() {
        if (this.hasUpdated) {
            await this.updateComplete;
            this.popup.reposition();
        }
    }

    /** @internal This is an internal method. */
    @watch("disabled")
    handleDisabledChange() {
        if (this.disabled && this.open) {
            this.hide();
        }
    }

    /** Shows the tooltip. */
    async show() {
        if (this.open) {
            return undefined;
        }

        this.open = true;
        return waitForEvent(this, "pc-after-show");
    }

    /** Hides the tooltip. */
    async hide() {
        if (!this.open) {
            return undefined;
        }

        this.open = false;
        return waitForEvent(this, "pc-after-hide");
    }

    render() {
        return html`
            <pc-popup
                part="base"
                class=${classMap({
                    tooltip: true,
                    open: this.open,
                })}
                placement=${this.placement}
                distance=${this.distance}
                skidding=${this.skidding}
                flip=""
                shift=""
                arrow=""
                hover-bridge=""
                exportparts="popup:base-popup, arrow:base__arrow"
            >
                <slot slot="anchor" aria-describedby="tooltip"></slot>

                <div
                    part="body"
                    class="body"
                    id="tooltip"
                    role="tooltip"
                    aria-live=${this.open ? "polite" : "off"}
                >
                    <slot name="content">${this.content}</slot>
                </div>
            </pc-popup>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-tooltip": PcTooltip;
    }
}
