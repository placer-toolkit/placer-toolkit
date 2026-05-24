import { html } from "lit";
import {
    customElement,
    eventOptions,
    property,
    query,
    state,
} from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { LocalizeController } from "../../utilities/localize.js";
import styles from "./scroller.css";

/**
 * @summary Scrollers create an accessible container while providing visual cues that help users and navigate.
 * @status experimental
 * @since 1.0.0-alpha.1
 *
 * @slot - The content to show inside the scroller.
 *
 * @cssproperty --shadow-color: var(--pc-color-surface-default) - The base colour of the shadow.
 * @cssproperty --shadow-size: 2rem - The size of the shadow.
 *
 * @csspart content - The container that wraps the slotted content.
 */
@customElement("pc-scroller")
export class PcScroller extends PlacerElement {
    static css = styles;

    private readonly localize = new LocalizeController(this);

    private resizeObserver = new ResizeObserver(() => this.updateScroll());

    @query("#content") content!: HTMLElement;

    @state() canScroll = false;

    /** The scroller’s orientation. */
    @property({ reflect: true }) orientation: "horizontal" | "vertical" =
        "horizontal";

    /** Removes the visible scrollbar. */
    @property({ attribute: "no-scrollbar", type: Boolean, reflect: true })
    noScrollbar = false;

    /** Removes the shadow. */
    @property({ attribute: "no-shadow", type: Boolean, reflect: true })
    noShadow = false;

    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver.observe(this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.resizeObserver.disconnect();
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Home") {
            event.preventDefault();
            this.content.scrollTo({
                left: this.orientation === "horizontal" ? 0 : undefined,
                top: this.orientation === "vertical" ? 0 : undefined,
            });
        }

        if (event.key === "End") {
            event.preventDefault();
            this.content.scrollTo({
                left:
                    this.orientation === "horizontal"
                        ? this.content.scrollWidth
                        : undefined,
                top:
                    this.orientation === "vertical"
                        ? this.content.scrollHeight
                        : undefined,
            });
        }
    }

    private handleSlotChange() {
        this.updateScroll();
    }

    @eventOptions({ passive: true })
    private updateScroll() {
        if (this.orientation === "horizontal") {
            const clientWidth = Math.ceil(this.content.clientWidth);
            const scrollLeft = Math.abs(Math.ceil(this.content.scrollLeft));
            const scrollWidth = Math.ceil(this.content.scrollWidth);

            const maxScroll = scrollWidth - clientWidth;
            this.canScroll = maxScroll > 0;

            const startShadowOpacity = Math.min(
                1,
                scrollLeft / (maxScroll * 0.05),
            );
            const endShadowOpacity = Math.min(
                1,
                (maxScroll - scrollLeft) / (maxScroll * 0.05),
            );

            this.style.setProperty(
                "--start-shadow-opacity",
                String(startShadowOpacity || 0),
            );
            this.style.setProperty(
                "--end-shadow-opacity",
                String(endShadowOpacity || 0),
            );
        } else {
            const clientHeight = Math.ceil(this.content.clientHeight);
            const scrollTop = Math.abs(Math.ceil(this.content.scrollTop));
            const scrollHeight = Math.ceil(this.content.scrollHeight);

            const maxScroll = scrollHeight - clientHeight;
            this.canScroll = maxScroll > 0;

            const startShadowOpacity = Math.min(
                1,
                scrollTop / (maxScroll * 0.05),
            );
            const endShadowOpacity = Math.min(
                1,
                (maxScroll - scrollTop) / (maxScroll * 0.05),
            );

            this.style.setProperty(
                "--start-shadow-opacity",
                String(startShadowOpacity || 0),
            );
            this.style.setProperty(
                "--end-shadow-opacity",
                String(endShadowOpacity || 0),
            );
        }
    }

    render() {
        return html`
            ${this.noShadow
                ? ""
                : html`
                      <div
                          id="start-shadow"
                          part="start-shadow"
                          aria-hidden="true"
                      ></div>
                      <div
                          id="end-shadow"
                          part="end-shadow"
                          aria-hidden="true"
                      ></div>
                  `}

            <div
                id="content"
                part="content"
                role="region"
                aria-label=${this.localize.term("scrollableRegion")}
                aria-orientation=${this.orientation}
                tabindex=${this.canScroll ? "0" : "-1"}
                @keydown=${this.handleKeyDown}
                @scroll=${this.updateScroll}
            >
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `;
    }
}
