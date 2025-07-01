import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
    animateTo,
    shimKeyframesHeightAuto,
    stopAnimations,
} from "../../internal/animate.js";
import {
    getAnimation,
    setDefaultAnimation,
} from "../../utilities/animation-registry.js";
import { waitForEvent } from "../../internal/event.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcIcon } from "../icon/icon.js";
import { styles } from "../details/details.styles.js";

setDefaultAnimation("details.show", {
    keyframes: [
        { height: "0", opacity: "0" },
        { height: "auto", opacity: "1" },
    ],
    options: { duration: 300, easing: "cubic-bezier(0.33, 1, 0.68, 1)" },
});

setDefaultAnimation("details.hide", {
    keyframes: [
        { height: "auto", opacity: "1" },
        { height: "0", opacity: "0" },
    ],
    options: { duration: 200, easing: "cubic-bezier(0.55, 0, 0.55, 0.2)" },
});

@customElement("pc-details")
export class PcDetails extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = { "pc-icon": PcIcon };

    @query(".details") details!: HTMLDetailsElement;
    @query(".details-header") header!: HTMLElement;
    @query(".details-body") body!: HTMLElement;
    @query(".details-expand-icon-slot") expandIconSlot!: HTMLSlotElement;

    detailsObserver!: MutationObserver;

    @property({ type: Boolean, reflect: true }) disabled = false;

    @property({ type: Boolean, reflect: true }) open = false;

    @property() summary?: string;

    firstUpdated() {
        this.body.style.height = this.open ? "auto" : "0";

        if (this.open) {
            this.details.open = true;
        }

        this.detailsObserver = new MutationObserver((changes) => {
            for (const change of changes) {
                if (
                    change.type === "attributes" &&
                    change.attributeName === "open"
                ) {
                    if (this.details.open) {
                        this.show();
                    } else {
                        this.hide();
                    }
                }
            }
        });
        this.detailsObserver.observe(this.details, { attributes: true });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.detailsObserver?.disconnect();
    }

    private handleSummaryClick(event: MouseEvent) {
        event.preventDefault();

        if (!this.disabled) {
            if (this.open) {
                this.hide();
            } else {
                this.show();
            }
            this.header.focus();
        }
    }

    private handleSummaryKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();

            if (this.open) {
                this.hide();
            } else {
                this.show();
            }
        }

        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            this.hide();
        }

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            this.show();
        }
    }

    @watch("open", { waitUntilFirstUpdate: true })
    async handleOpenChange() {
        if (this.open) {
            this.details.open = true;

            const pcShowEvent = emit(this, "pc-show", {
                cancelable: true,
            }) as unknown as Event;

            if (pcShowEvent.defaultPrevented) {
                this.open = false;
                this.details.open = false;
                return;
            }

            await stopAnimations(this.body);

            const { keyframes, options } = getAnimation(this, "details.show", {
                dir: document.documentElement.dir || "ltr",
            });

            await animateTo(
                this.body,
                shimKeyframesHeightAuto(keyframes, this.body.scrollHeight),
                options,
            );

            this.body.style.height = "auto";
            emit(this, "pc-after-show");
        } else {
            const pcHide = emit(this, "pc-hide", {
                cancelable: true,
            }) as unknown as Event;

            if (pcHide.defaultPrevented) {
                this.details.open = true;
                this.open = true;
                return;
            }

            await stopAnimations(this.body);

            const { keyframes, options } = getAnimation(this, "details.hide", {
                dir: document.documentElement.dir || "ltr",
            });

            await animateTo(
                this.body,
                shimKeyframesHeightAuto(keyframes, this.body.scrollHeight),
                options,
            );

            this.body.style.height = "auto";

            this.details.open = false;
            emit(this, "pc-after-hide");
        }
    }

    async show() {
        if (this.open || this.disabled) {
            return undefined;
        }

        this.open = true;
        return waitForEvent(this, "pc-after-show");
    }

    async hide() {
        if (!this.open || this.disabled) {
            return undefined;
        }

        this.open = false;
        return waitForEvent(this, "pc-after-hide");
    }

    render() {
        const isRTL =
            document.documentElement.dir === "rtl" ||
            (!document.documentElement.dir &&
                getComputedStyle(document.documentElement).direction === "rtl");

        return html`
            <details
                part="base"
                class=${classMap({
                    "details": true,
                    "details-open": this.open === true,
                    "details-disabled": this.disabled === true,
                    "details-rtl": isRTL === true,
                })}
            >
                <summary
                    part="header"
                    class="details-header"
                    id="header"
                    role="button"
                    aria-expanded=${this.open ? "true" : "false"}
                    aria-controls="content"
                    aria-disabled=${this.disabled ? "true" : "false"}
                    tabindex=${this.disabled ? "-1" : "0"}
                    @click=${this.handleSummaryClick}
                    @keydown=${this.handleSummaryKeyDown}
                >
                    <slot class="details-summary" part="summary" name="summary">
                        ${this.summary}
                    </slot>

                    <span part="summary-icon" class="summary-icon">
                        <slot name="expand-icon">
                            <pc-icon
                                library="system"
                                icon-style="solid"
                                name=${isRTL ? "chevron-left" : "chevron-right"}
                            ></pc-icon>
                        </slot>
                        <slot name="collapse-icon">
                            <pc-icon
                                library="system"
                                icon-style="solid"
                                name=${isRTL ? "chevron-left" : "chevron-right"}
                            ></pc-icon>
                        </slot>
                    </span>
                </summary>

                <div
                    class="details-body"
                    role="region"
                    aria-labelledby="header"
                >
                    <slot
                        class="details-content"
                        part="content"
                        id="content"
                    ></slot>
                </div>
            </details>
        `;
    }
}
