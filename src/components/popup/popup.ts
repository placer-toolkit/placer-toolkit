//! Popup is a low‐level utility built specifically for positioning elements. Do not mistake it for a tooltip or similar because it does not facilitate an accessible experience! Almost every correct usage of it will involve building other components. It should rarely, if ever, occur directly in your HTML.

import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import { LocalizeController } from "../../utilities/localize.js";
import { PcRepositionEvent } from "../../events/pc-reposition.js";
import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    getOverflowAncestors,
    offset,
    platform,
    shift,
    size,
} from "@floating-ui/dom";
import { offsetParent } from "composed-offset-position";
import styles from "./popup.css";

export interface VirtualElement {
    getBoundingClientRect: () => DOMRect;
    contextElement?: Element;
}

function isVirtualElement(element: unknown): element is VirtualElement {
    return (
        element !== null &&
        typeof element === "object" &&
        "getBoundingClientRect" in element &&
        ("contextElement" in element ? element instanceof Element : true)
    );
}

const supportsPopover =
    globalThis?.HTMLElement?.prototype.hasOwnProperty("popover");

/**
 * @summary Popup is a utility that lets you declaratively anchor “popup” containers to another element.
 * @status experimental
 * @since 0.4.0
 *
 * @slot - The popup’s content.
 * @slot anchor - The element the popup will be anchored to. If the anchor lives outside of the popup, you can use the `anchor` attribute/property instead.
 *
 * @event pc-reposition - Emitted when the popup is repositioned. This event can fire a lot, so avoid putting expensive operations in your event listener or consider debouncing it.
 *
 * @csspart arrow - The arrow’s container. Avoid setting positioning properties, as these values are assigned dynamically as the popup moves.
 * @csspart popup - The popup’s container.
 * @csspart hover-bridge - The hover bridge element. This is only available if the `hover-bridge` attribute is set.
 *
 * @cssproperty --arrow-size: var(--pc-tooltip-arrow-size) - The arrow’s size. The arrow won’t be shown unless the `arrow` attribute is used.
 * @cssproperty --arrow-color: var(--pc-color-neutral-fill-normal) - The arrow’s colour.
 */
@customElement("pc-popup")
export class PcPopup extends PlacerElement {
    static css = styles;

    private readonly localize = new LocalizeController(this);

    private anchorElement!: Element | VirtualElement | null;
    private cleanup: ReturnType<typeof autoUpdate> | undefined;

    @query(".popup") popup!: HTMLElement;
    @query(".arrow") private arrowElement!: HTMLElement;

    /** The element the popup will be anchored to. If the anchor lives outside of the popup, you can provide the anchor element’s `id`, a DOM  element reference or a `VirtualElement`. If the anchor lives inside the popup, use the `anchor` slot instead. */
    @property() anchor?: Element | string | VirtualElement;

    /** Activates the positioning logic and shows the popup. When this attribute is removed, the positioning logic is torn down and the popup will be hidden. */
    @property({ type: Boolean, reflect: true }) active = false;

    /** The preferred placement of the popup. Note that the actual placement will vary as configured to keep the panel inside of the viewport. */
    @property({ reflect: true }) placement:
        | "top"
        | "top-start"
        | "top-end"
        | "bottom"
        | "bottom-start"
        | "bottom-end"
        | "right"
        | "right-start"
        | "right-end"
        | "left"
        | "left-start"
        | "left-end" = "top";

    /** The bounding box to use for flipping, shifting and auto‐sizing. */
    @property() boundary: "viewport" | "scroll" = "viewport";

    /** The distance in pixels from which to offset the panel away from its anchor. */
    @property({ type: Number }) distance = 0;

    /** The distance in pixels from which to offset the panel alongside its anchor. */
    @property({ type: Number }) skidding = 0;

    /** Adds an arrow to the popup. The arrow’s size and colour can be customised using the `--arrow-size` and `--arrow-color` custom properties. For additional customisation, you can also target the arrow using the `arrow` part in your stylesheet. */
    @property({ type: Boolean }) arrow = false;

    /** The placement of the arrow. The default is `anchor`, which will align the arrow as close to the centre of the anchor as possible, considering available space and arrow padding. The alignment values will align the arrow to the popup instead. */
    @property({ attribute: "arrow-placement" }) arrowPlacement:
        | "start"
        | "end"
        | "center"
        | "anchor" = "anchor";

    /** The amount of padding between the arrow and the popup’s edges. */
    @property({ attribute: "arrow-padding", type: Number }) arrowPadding = 10;

    /** If the popup doesn’t fit in the boundary with the placement anymore, the popup will flip to the opposite side to keep it in view. You can also use the `flip-fallback-placements` attribute to further configure  how the fallback placement is determined. */
    @property({ type: Boolean }) flip = false;

    /** If the preferred placement doesn’t fit in the boundary anymore, the popup will try to fit in the fallback placements you specify until one fits. It must be a string of any number of placements separated by a space (e.g., `top right bottom`). If no placement fits, the flip fallback strategy will be used instead. */
    @property({
        attribute: "flip-fallback-placements",
        converter: {
            fromAttribute: (value: string) => {
                return value
                    .split(" ")
                    .map((placement) => placement.trim())
                    .filter((placement) => placement !== "");
            },
            toAttribute: (value: []) => {
                return value.join(" ");
            },
        },
    })
    flipFallbackPlacements = "";

    /** When neither the preferred placement nor the fallback placements fit, this value will be use to determine whether the popup should be positioned using the best available fit based on available space or as it was initially preferred. */
    @property({ attribute: "flip-fallback-strategy" }) flipFallbackStrategy:
        | "best-fit"
        | "initial" = "best-fit";

    /** The flip boundary describes one or more clipping elements where overflow will be checked relative to when flipping. By default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can change the boundary by passing a reference to one or more elements to this property.  */
    @property({ type: Object }) flipBoundary?: Element | Element[];

    /** The amount of padding in pixels to exceed before the flip behaviour will occur. */
    @property({ attribute: "flip-padding", type: Number }) flipPadding = 0;

    /** Moves the popup along the axis to keep it in view when clipped. */
    @property({ type: Boolean }) shift = false;

    /** The shift boundary describes one or more clipping elements where overflow will be checked relative to when shifting. By default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can change the boundary by passing a reference to one or more elements to this property. */
    @property({ type: Object }) shiftBoundary?: Element | Element[];

    /** The amount of padding in pixels to exceed before the shift behaviour will occur. */
    @property({ attribute: "shift-padding", type: Number }) shiftPadding = 0;

    /** If set, the popup will automatically resize itself to prevent it from overflowing. */
    @property({ attribute: "auto-size" }) autoSize?:
        | "horizontal"
        | "vertical"
        | "both";

    /** Syncs the popup’s width or height to that of the anchor element. */
    @property() sync?: "width" | "height" | "both";

    /** The auto‐size boundary describes one or more clipping elements where overflow will be checked relative to when resizing. By default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can change the boundary by passing a reference to one or more elements to this property. */
    @property({ type: Object }) autoSizeBoundary?: Element | Element[];

    /** The amount of padding in pixels to exceed before the auto‐size behaviour will occur. */
    @property({ attribute: "auto-size-padding", type: Number })
    autoSizePadding = 0;

    /** When a gap exists between the anchor and the popup element, this option will add a “hover bridge” that fills the gap using an invisible element. This makes listening for events such as `mouseenter` and `mouseleave` more sane because the cursor technically never leaves the element. The hover bridge is only drawn if the popup is active. */
    @property({ attribute: "hover-bridge", type: Boolean }) hoverBridge = false;

    async connectedCallback() {
        super.connectedCallback();

        await this.updateComplete;
        this.start();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.stop();
    }

    async updated(changedProperties: PropertyValues<this>) {
        super.updated(changedProperties);

        if (changedProperties.has("active")) {
            if (this.active) {
                this.start();
            } else {
                this.stop();
            }
        }

        if (changedProperties.has("anchor")) {
            this.handleAnchorChange();
        }

        if (this.active) {
            await this.updateComplete;
            this.reposition();
        }
    }

    private async handleAnchorChange() {
        await this.stop();

        if (this.anchor && typeof this.anchor === "string") {
            const root = this.getRootNode() as Document | ShadowRoot;
            this.anchorElement = root.getElementById(this.anchor);
        } else if (
            this.anchor instanceof Element ||
            isVirtualElement(this.anchor)
        ) {
            this.anchorElement = this.anchor;
        } else {
            this.anchorElement =
                this.querySelector<HTMLElement>('[slot="anchor"]');
        }

        if (this.anchorElement instanceof HTMLSlotElement) {
            this.anchorElement = this.anchorElement.assignedElements({
                flatten: true,
            })[0] as HTMLElement;
        }

        if (this.anchorElement) {
            this.start();
        }
    }

    private start() {
        if (!this.anchorElement || !this.active) {
            return;
        }

        this.popup.showPopover?.();

        this.cleanup = autoUpdate(this.anchorElement, this.popup, () => {
            this.reposition();
        });
    }

    private async stop(): Promise<void> {
        return new Promise((resolve) => {
            this.popup.hidePopover?.();

            if (this.cleanup) {
                this.cleanup();
                this.cleanup = undefined;
                this.removeAttribute("data-current-placement");
                this.style.removeProperty("--auto-size-available-width");
                this.style.removeProperty("--auto-size-available-height");
                requestAnimationFrame(() => resolve());
            } else {
                resolve();
            }
        });
    }

    /** Forces the popup to recalculate and reposition itself. */
    reposition() {
        if (!this.active || !this.anchorElement) {
            return;
        }

        const middleware = [
            offset({ mainAxis: this.distance, crossAxis: this.skidding }),
        ];

        if (this.sync) {
            middleware.push(
                size({
                    apply: ({ rects }) => {
                        const syncWidth =
                            this.sync === "width" || this.sync === "both";
                        const syncHeight =
                            this.sync === "height" || this.sync === "both";
                        this.popup.style.inlineSize = syncWidth
                            ? `${rects.reference.width}px`
                            : "";
                        this.popup.style.blockSize = syncHeight
                            ? `${rects.reference.height}px`
                            : "";
                    },
                }),
            );
        } else {
            this.popup.style.inlineSize = "";
            this.popup.style.blockSize = "";
        }

        let defaultBoundary;

        if (
            supportsPopover &&
            !isVirtualElement(this.anchor) &&
            this.boundary === "scroll"
        ) {
            defaultBoundary = getOverflowAncestors(
                this.anchorElement as Element,
            ).filter((element) => element instanceof Element);
        }

        if (this.flip) {
            middleware.push(
                flip({
                    boundary: this.flipBoundary || defaultBoundary,
                    // @ts-expect-error — We’re converting the property type of “fallbackPlacements” from a string to an array
                    fallbackPlacements: this.flipFallbackPlacements,
                    fallbackStrategy:
                        this.flipFallbackStrategy === "best-fit"
                            ? "bestFit"
                            : "initialPlacement",
                    padding: this.flipPadding,
                }),
            );
        }

        if (this.shift) {
            middleware.push(
                shift({
                    boundary: this.shiftBoundary || defaultBoundary,
                    padding: this.shiftPadding,
                }),
            );
        }

        if (this.autoSize) {
            middleware.push(
                size({
                    boundary: this.autoSizeBoundary || defaultBoundary,
                    padding: this.autoSizePadding,
                    apply: ({ availableWidth, availableHeight }) => {
                        if (
                            this.autoSize === "vertical" ||
                            this.autoSize === "both"
                        ) {
                            this.style.setProperty(
                                "--auto-size-available-height",
                                `${availableHeight}px`,
                            );
                        } else {
                            this.style.removeProperty(
                                "--auto-size-available-height",
                            );
                        }

                        if (
                            this.autoSize === "horizontal" ||
                            this.autoSize === "both"
                        ) {
                            this.style.setProperty(
                                "--auto-size-available-width",
                                `${availableWidth}px`,
                            );
                        } else {
                            this.style.removeProperty(
                                "--auto-size-available-width",
                            );
                        }
                    },
                }),
            );
        } else {
            this.style.removeProperty("--auto-size-available-width");
            this.style.removeProperty("--auto-size-available-height");
        }

        if (this.arrow) {
            middleware.push(
                arrow({
                    element: this.arrowElement,
                    padding: this.arrowPadding,
                }),
            );
        }

        const getOffsetParent = supportsPopover
            ? (element: Element) =>
                  platform.getOffsetParent(element, offsetParent)
            : platform.getOffsetParent;

        computePosition(this.anchorElement, this.popup, {
            placement: this.placement,
            middleware,
            strategy: supportsPopover ? "absolute" : "fixed",
            platform: {
                ...platform,
                getOffsetParent,
            },
        }).then(({ x, y, middlewareData, placement }) => {
            const isRTL = this.localize.dir() === "rtl";
            const staticSide = {
                top: "bottom",
                right: "left",
                bottom: "top",
                left: "right",
            }[placement.split("-")[0]]!;

            this.setAttribute("data-current-placement", placement);

            Object.assign(this.popup.style, {
                left: `${x}px`,
                top: `${y}px`,
            });

            if (this.arrow) {
                const arrowX = middlewareData.arrow!.x;
                const arrowY = middlewareData.arrow!.y;
                let top = "";
                let right = "";
                let bottom = "";
                let left = "";

                if (this.arrowPlacement === "start") {
                    const value =
                        typeof arrowX === "number"
                            ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))`
                            : "";
                    top =
                        typeof arrowY === "number"
                            ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))`
                            : "";
                    right = isRTL ? value : "";
                    left = isRTL ? "" : value;
                } else if (this.arrowPlacement === "end") {
                    const value =
                        typeof arrowX === "number"
                            ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))`
                            : "";
                    right = isRTL ? "" : value;
                    left = isRTL ? value : "";
                    bottom =
                        typeof arrowY === "number"
                            ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))`
                            : "";
                } else if (this.arrowPlacement === "center") {
                    left =
                        typeof arrowX === "number"
                            ? `calc(50% - var(--arrow-size-diagonal))`
                            : "";
                    top =
                        typeof arrowY === "number"
                            ? `calc(50% - var(--arrow-size-diagonal))`
                            : "";
                } else {
                    left = typeof arrowX === "number" ? `${arrowX}px` : "";
                    top = typeof arrowY === "number" ? `${arrowY}px` : "";
                }

                Object.assign(this.arrowElement.style, {
                    top,
                    right,
                    bottom,
                    left,
                    [staticSide]: "calc(var(--arrow-size-diagonal) * -1)",
                });
            }
        });

        requestAnimationFrame(() => this.updateHoverBridge());

        this.dispatchEvent(new PcRepositionEvent());
    }

    private updateHoverBridge = () => {
        if (this.hoverBridge && this.anchorElement) {
            const anchorRect = this.anchorElement.getBoundingClientRect();
            const popupRect = this.popup.getBoundingClientRect();
            const isVertical =
                this.placement.includes("top") ||
                this.placement.includes("bottom");
            let topLeftX = 0;
            let topLeftY = 0;
            let topRightX = 0;
            let topRightY = 0;
            let bottomLeftX = 0;
            let bottomLeftY = 0;
            let bottomRightX = 0;
            let bottomRightY = 0;

            if (isVertical) {
                if (anchorRect.top < popupRect.top) {
                    topLeftX = anchorRect.left;
                    topLeftY = anchorRect.bottom;
                    topRightX = anchorRect.right;
                    topRightY = anchorRect.bottom;

                    bottomLeftX = popupRect.left;
                    bottomLeftY = popupRect.top;
                    bottomRightX = popupRect.right;
                    bottomRightY = popupRect.top;
                } else {
                    topLeftX = popupRect.left;
                    topLeftY = popupRect.bottom;
                    topRightX = popupRect.right;
                    topRightY = popupRect.bottom;

                    bottomLeftX = anchorRect.left;
                    bottomLeftY = anchorRect.top;
                    bottomRightX = anchorRect.right;
                    bottomRightY = anchorRect.top;
                }
            } else {
                if (anchorRect.left < popupRect.left) {
                    topLeftX = anchorRect.right;
                    topLeftY = anchorRect.top;
                    topRightX = popupRect.left;
                    topRightY = popupRect.top;

                    bottomLeftX = anchorRect.right;
                    bottomLeftY = anchorRect.bottom;
                    bottomRightX = popupRect.left;
                    bottomRightY = popupRect.bottom;
                } else {
                    topLeftX = popupRect.right;
                    topLeftY = popupRect.top;
                    topRightX = anchorRect.left;
                    topRightY = anchorRect.top;

                    bottomLeftX = popupRect.right;
                    bottomLeftY = popupRect.bottom;
                    bottomRightX = anchorRect.left;
                    bottomRightY = anchorRect.bottom;
                }
            }

            this.style.setProperty(
                "--hover-bridge-top-left-x",
                `${topLeftX}px`,
            );
            this.style.setProperty(
                "--hover-bridge-top-left-y",
                `${topLeftY}px`,
            );
            this.style.setProperty(
                "--hover-bridge-top-right-x",
                `${topRightX}px`,
            );
            this.style.setProperty(
                "--hover-bridge-top-right-y",
                `${topRightY}px`,
            );
            this.style.setProperty(
                "--hover-bridge-bottom-left-x",
                `${bottomLeftX}px`,
            );
            this.style.setProperty(
                "--hover-bridge-bottom-left-y",
                `${bottomLeftY}px`,
            );
            this.style.setProperty(
                "--hover-bridge-bottom-right-x",
                `${bottomRightX}px`,
            );
            this.style.setProperty(
                "--hover-bridge-bottom-right-y",
                `${bottomRightY}px`,
            );
        }
    };

    render() {
        return html`
            <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

            <span
                part="hover-bridge"
                class=${classMap({
                    "hover-bridge": true,
                    "hover-bridge-visible": this.hoverBridge && this.active,
                })}
            ></span>

            <div
                part="popup"
                popover="manual"
                class=${classMap({
                    "popup": true,
                    "active": this.active,
                    "fixed": !supportsPopover,
                    "has-arrow": this.arrow,
                })}
            >
                <slot></slot>
                ${this.arrow
                    ? html`
                          <div
                              part="arrow"
                              class="arrow"
                              role="presentation"
                          ></div>
                      `
                    : ""}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-popup": PcPopup;
    }
}
