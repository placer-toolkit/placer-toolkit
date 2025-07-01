import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
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
import { waitForEvent } from "../../internal/event.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcPopup } from "../popup/popup.js";
import { styles } from "./tooltip.styles.js";

setDefaultAnimation("tooltip.show", {
    keyframes: [
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1 },
    ],
    options: { duration: 150, easing: "ease-out" },
});

setDefaultAnimation("tooltip.hide", {
    keyframes: [
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.8 },
    ],
    options: { duration: 150, easing: "ease-in" },
});

@customElement("pc-tooltip")
export class PcTooltip extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = { "pc-popup": PcPopup };

    private hoverTimeout!: number;
    private closeWatcher!: CloseWatcher | null;

    @query("slot:not([name])") defaultSlot!: HTMLSlotElement;
    @query(".tooltip-body") body!: HTMLElement;
    @query("pc-popup") popup!: PcPopup;

    @property() content = "";

    @property({ type: Boolean, reflect: true }) disabled = false;

    @property({ type: Number }) distance = 8;

    @property({ type: Boolean }) hoist = false;

    @property({ type: Boolean, reflect: true }) open = false;

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

    @property({ type: Number }) skidding = 0;

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
                dir: document.documentElement.dir || "ltr",
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
                dir: document.documentElement.dir || "ltr",
            });

            await animateTo(this.popup.popup, keyframes, options);

            this.popup.active = false;
            this.body.hidden = true;

            emit(this, "pc-after-hide");
        }
    }

    @watch(["content", "distance", "hoist", "placement", "skidding"])
    async handleOptionsChange() {
        if (this.hasUpdated) {
            await this.updateComplete;
            this.popup.reposition();
        }
    }

    @watch("disabled")
    handleDisabledChange() {
        if (this.disabled && this.open) {
            this.hide();
        }
    }

    async show() {
        if (this.open) {
            return undefined;
        }

        this.open = true;
        return waitForEvent(this, "pc-after-show");
    }

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
                    "tooltip": true,
                    "tooltip-open": this.open === true,
                })}
                placement=${this.placement}
                distance=${this.distance}
                skidding=${this.skidding}
                strategy=${this.hoist ? "fixed" : "absolute"}
                flip=""
                shift=""
                arrow=""
                hover-bridge=""
                exportparts="popup:base__popup, arrow:base__arrow"
            >
                <slot slot="anchor" aria-describedby="tooltip"></slot>

                <div
                    part="body"
                    class="tooltip-body"
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
