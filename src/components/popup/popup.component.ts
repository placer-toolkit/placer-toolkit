//! Popup is a low‐level utility built specifically for positioning elements. Do not mistake it for a tooltip or similar because it does not facilitate an accessible experience! Almost every correct usage of it will involve building other components. It should rarely, if ever, occur directly in your HTML.

import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    offset,
    platform,
    shift,
    size,
} from "@floating-ui/dom";
import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { offsetParent } from "composed-offset-position";
import { emit } from "../../internal/emit.js";
import { styles } from "./popup.styles.js";

export interface VirtualElement {
    getBoundingClientRect: () => DOMRect;
    contextElement?: Element;
}

function isVirtualElement(e: unknown): e is VirtualElement {
    return (
        e !== null &&
        typeof e === "object" &&
        "getBoundingClientRect" in e &&
        ("contextElement" in e ? e.contextElement instanceof Element : true)
    );
}

@customElement("pc-popup")
export class PcPopup extends LitElement {
    static styles: CSSResultGroup = styles;

    private anchorElement!: Element | VirtualElement | null;
    private cleanup: ReturnType<typeof autoUpdate> | undefined;

    @query(".popup") popup!: HTMLElement;
    @query(".popup-arrow") private arrowElement!: HTMLElement;

    @property({ type: Boolean, reflect: true }) active = false;

    @property() anchor?: Element | string | VirtualElement;

    @property({ type: Boolean }) arrow = false;

    @property({ attribute: "arrow-padding", type: Number }) arrowPadding = 10;

    @property({ attribute: "arrow-placement" }) arrowPlacement:
        | "start"
        | "end"
        | "center"
        | "anchor" = "anchor";

    @property({ attribute: "auto-size" }) autoSize?:
        | "horizontal"
        | "vertical"
        | "both";

    @property({ type: Object }) autoSizeBoundary?: Element | Element[];

    @property({ attribute: "auto-size-padding", type: Number })
    autoSizePadding = 0;

    @property({ type: Number }) distance = 0;

    @property({ type: Boolean }) flip = false;

    @property({ type: Object }) flipBoundary?: Element | Element[];

    @property({
        attribute: "flip-fallback-placements",
        converter: {
            fromAttribute: (value: string) => {
                return value
                    .split(" ")
                    .map((p) => p.trim())
                    .filter((p) => p !== "");
            },
            toAttribute: (value: []) => {
                return value.join(" ");
            },
        },
    })
    flipFallbackPlacements = "";

    @property({ attribute: "flip-fallback-strategy" }) flipFallbackStrategy:
        | "best-fit"
        | "initial" = "best-fit";

    @property({ attribute: "flip-padding", type: Number }) flipPadding = 0;

    @property({ attribute: "hover-bridge", type: Boolean }) hoverBridge = false;

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

    @property({ type: Boolean }) shift = false;

    @property({ type: Object }) shiftBoundary?: Element | Element[];

    @property({ attribute: "shift-padding", type: Number }) shiftPadding = 0;

    @property({ type: Number }) skidding = 0;

    @property({ reflect: true }) strategy: "absolute" | "fixed" = "absolute";

    @property() sync?: "width" | "height" | "both";

    async connectedCallback() {
        super.connectedCallback();

        await this.updateComplete;
        this.start();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.stop();
    }

    async updated(changedProps: Map<string, unknown>) {
        super.updated(changedProps);

        if (changedProps.has("active")) {
            if (this.active) {
                this.start();
            } else {
                this.stop();
            }
        }

        if (changedProps.has("anchor")) {
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

        if (this.anchorElement && this.active) {
            this.start();
        }
    }

    private start() {
        if (!this.anchorElement || !this.active) {
            return;
        }

        this.cleanup = autoUpdate(this.anchorElement, this.popup, () => {
            this.reposition();
        });
    }

    private async stop(): Promise<void> {
        return new Promise((resolve) => {
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

    reposition() {
        if (!this.anchorElement || !this.active) {
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
                        this.popup.style.width = syncWidth
                            ? `${rects.reference.width}px`
                            : "";
                        this.popup.style.height = syncHeight
                            ? `${rects.reference.height}px`
                            : "";
                    },
                }),
            );
        } else {
            this.popup.style.width = "";
            this.popup.style.height = "";
        }

        if (this.flip) {
            middleware.push(
                flip({
                    boundary: this.flipBoundary,
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
                    boundary: this.shiftBoundary,
                    padding: this.shiftPadding,
                }),
            );
        }

        if (this.autoSize) {
            middleware.push(
                size({
                    boundary: this.autoSizeBoundary,
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

        const getOffsetParent =
            this.strategy === "absolute"
                ? (element: Element) =>
                      platform.getOffsetParent(element, offsetParent)
                : platform.getOffsetParent;

        computePosition(this.anchorElement, this.popup, {
            placement: this.placement,
            middleware,
            strategy: this.strategy,
            platform: {
                ...platform,
                getOffsetParent,
            },
        }).then(({ x, y, middlewareData, placement }) => {
            const isRTL =
                document.documentElement.dir === "rtl" ||
                (!document.documentElement.dir &&
                    getComputedStyle(document.documentElement).direction ===
                        "rtl");
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

        emit(this, "pc-reposition");
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
                    "popup-hover-bridge": true,
                    "popup-hover-bridge-visible":
                        this.hoverBridge && this.active,
                })}
            ></span>

            <div
                part="popup"
                class=${classMap({
                    "popup": true,
                    "popup-active": this.active === true,
                    "popup-fixed": this.strategy === "fixed",
                    "popup-has-arrow": this.arrow === true,
                })}
            >
                <slot></slot>
                ${this.arrow
                    ? html`
                          <div
                              part="arrow"
                              class="popup-arrow"
                              role="presentation"
                          ></div>
                      `
                    : ""}
            </div>
        `;
    }
}
