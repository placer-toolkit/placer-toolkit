import { html, css } from "lit";
import type {
    CSSResultGroup,
    ReactiveController,
    ReactiveControllerHost,
} from "lit";
import { createRef, ref, type Ref } from "lit/directives/ref.js";
import { type HasSlotController } from "../../internal/slot.js";
import type { PcMenuItem } from "./menu-item.js";
import type { PcPopup } from "../popup/popup.js";

export class SubmenuController implements ReactiveController {
    static styles: CSSResultGroup = css`
        slot[hidden] {
            display: none !important;
        }
    `;

    private host: ReactiveControllerHost & PcMenuItem;
    private popupRef: Ref<PcPopup> = createRef();
    private enableSubmenuTimer = -1;
    private isConnected = false;
    private isPopupConnected = false;
    private skidding = 0;
    private readonly hasSlotController: HasSlotController;
    private readonly submenuOpenDelay = 100;

    constructor(
        host: ReactiveControllerHost & PcMenuItem,
        hasSlotController: HasSlotController,
    ) {
        (this.host = host).addController(this);
        this.hasSlotController = hasSlotController;
    }

    hostConnected() {
        if (this.hasSlotController.test("submenu") && !this.host.disabled) {
            this.addListeners();
        }
    }

    hostDisconnected() {
        this.removeListeners();
    }

    hostUpdated() {
        if (this.hasSlotController.test("submenu") && !this.host.disabled) {
            this.addListeners();
            this.updateSkidding();
        } else {
            this.removeListeners();
        }
    }

    private addListeners() {
        if (!this.isConnected) {
            this.host.addEventListener("mousemove", this.handleMouseMove);
            this.host.addEventListener("mouseover", this.handleMouseOver);
            this.host.addEventListener("keydown", this.handleKeyDown);
            this.host.addEventListener("click", this.handleClick);
            this.host.addEventListener("focusout", this.handleFocusOut);
            this.isConnected = true;
        }

        if (!this.isPopupConnected) {
            if (this.popupRef.value) {
                this.popupRef.value.addEventListener(
                    "mouseover",
                    this.handlePopupMouseover,
                );
                this.popupRef.value.addEventListener(
                    "pc-reposition",
                    this.handlePopupReposition,
                );
                this.isPopupConnected = true;
            }
        }
    }

    private removeListeners() {
        if (this.isConnected) {
            this.host.removeEventListener("mousemove", this.handleMouseMove);
            this.host.removeEventListener("mouseover", this.handleMouseOver);
            this.host.removeEventListener("keydown", this.handleKeyDown);
            this.host.removeEventListener("click", this.handleClick);
            this.host.removeEventListener("focusout", this.handleFocusOut);
            this.isConnected = false;
        }

        if (this.isPopupConnected) {
            if (this.popupRef.value) {
                this.popupRef.value.removeEventListener(
                    "mouseover",
                    this.handlePopupMouseover,
                );
                this.popupRef.value.removeEventListener(
                    "pc-reposition",
                    this.handlePopupReposition,
                );
                this.isPopupConnected = false;
            }
        }
    }

    private handleMouseMove = (event: MouseEvent) => {
        this.host.style.setProperty(
            "--safe-triangle-cursor-x",
            `${event.clientX}px`,
        );
        this.host.style.setProperty(
            "--safe-triangle-cursor-y",
            `${event.clientY}px`,
        );
    };

    private handleMouseOver = () => {
        if (this.hasSlotController.test("submenu")) {
            this.enableSubmenu();
        }
    };

    private handleSubmenuEntry(event: KeyboardEvent) {
        const submenuSlot: HTMLSlotElement | null =
            this.host.renderRoot.querySelector('slot[name="submenu"]');

        if (!submenuSlot) {
            console.error(
                `Cannot activate a submenu if no corresponding menu item can be found. ${this}`,
            );
            return;
        }

        let menuItems: NodeListOf<Element> | null = null;

        for (const element of submenuSlot.assignedElements()) {
            menuItems = element.querySelectorAll(
                'pc-menu-item, [role^="menuitem"]',
            );

            if (menuItems.length !== 0) {
                break;
            }
        }

        if (!menuItems || menuItems.length === 0) {
            return;
        }

        menuItems[0].setAttribute("tabindex", "0");

        for (let i = 1; i !== menuItems.length; ++i) {
            menuItems[i].setAttribute("tabindex", "-1");
        }

        if (this.popupRef.value) {
            event.preventDefault();
            event.stopPropagation();
            if (this.popupRef.value.active) {
                if (menuItems[0] instanceof HTMLElement) {
                    menuItems[0].focus();
                }
            } else {
                this.enableSubmenu(false);
                this.host.updateComplete.then(() => {
                    if (menuItems[0] instanceof HTMLElement) {
                        menuItems[0].focus();
                    }
                });
                this.host.requestUpdate();
            }
        }
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case "Escape":
            case "Tab":
                this.disableSubmenu();
                break;
            case "ArrowLeft":
                if (event.target !== this.host) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.host.focus();
                    this.disableSubmenu();
                }
                break;
            case "ArrowRight":
            case "Enter":
            case " ":
                this.handleSubmenuEntry(event);
                break;
            default:
                break;
        }
    };

    private handleClick = (event: MouseEvent) => {
        if (event.target === this.host) {
            event.preventDefault();
            event.stopPropagation();
        } else if (
            event.target instanceof Element &&
            (event.target.tagName === "pc-menu-item" ||
                event.target.role?.startsWith("menuitem"))
        ) {
            this.disableSubmenu();
        }
    };

    private handleFocusOut = (event: FocusEvent) => {
        if (
            event.relatedTarget &&
            event.relatedTarget instanceof Element &&
            this.host.contains(event.relatedTarget)
        ) {
            return;
        }
        this.disableSubmenu();
    };

    private handlePopupMouseover = (event: MouseEvent) => {
        event.stopPropagation();
    };

    private handlePopupReposition = () => {
        const submenuSlot: HTMLSlotElement | null =
            this.host.renderRoot.querySelector('slot[name="submenu"]');
        const menu = submenuSlot
            ?.assignedElements({ flatten: true })
            .filter((element) => element.localName === "pc-menu")[0];
        const isRTL = getComputedStyle(this.host).direction === "rtl";

        if (!menu) {
            return;
        }

        const { left, top, width, height } = menu.getBoundingClientRect();

        this.host.style.setProperty(
            "--safe-triangle-submenu-start-x",
            `${isRTL ? left + width : left}px`,
        );
        this.host.style.setProperty(
            "--safe-triangle-submenu-start-y",
            `${top}px`,
        );
        this.host.style.setProperty(
            "--safe-triangle-submenu-end-x",
            `${isRTL ? left + width : left}px`,
        );
        this.host.style.setProperty(
            "--safe-triangle-submenu-end-y",
            `${top + height}px`,
        );
    };

    private setSubmenuState(state: boolean) {
        if (this.popupRef.value) {
            if (this.popupRef.value.active !== state) {
                this.popupRef.value.active = state;
                this.host.requestUpdate();
            }
        }
    }

    private enableSubmenu(delay = true) {
        if (delay) {
            window.clearTimeout(this.enableSubmenuTimer);
            this.enableSubmenuTimer = window.setTimeout(() => {
                this.setSubmenuState(true);
            }, this.submenuOpenDelay);
        } else {
            this.setSubmenuState(true);
        }
    }

    private disableSubmenu() {
        window.clearTimeout(this.enableSubmenuTimer);
        this.setSubmenuState(false);
    }

    private updateSkidding(): void {
        if (!this.host.parentElement?.computedStyleMap) {
            return;
        }

        const styleMap: StylePropertyMapReadOnly =
            this.host.parentElement.computedStyleMap();
        const attributes: string[] = [
            "padding-top",
            "border-top-width",
            "margin-top",
        ];

        const skidding = attributes.reduce((accumulator, attribute) => {
            const styleValue: CSSStyleValue =
                styleMap.get(attribute) ?? new CSSUnitValue(0, "px");
            const unitValue =
                styleValue instanceof CSSUnitValue
                    ? styleValue
                    : new CSSUnitValue(0, "px");
            const pxValue = unitValue.to("px");
            return accumulator - pxValue.value;
        }, 0);

        this.skidding = skidding;
    }

    isExpanded(): boolean {
        return this.popupRef.value ? this.popupRef.value.active : false;
    }

    renderSubmenu() {
        const isRTL = getComputedStyle(this.host).direction === "rtl";

        if (!this.isConnected) {
            return html`<slot name="submenu" hidden></slot>`;
        }

        return html`
            <pc-popup
                ${ref(this.popupRef)}
                placement=${isRTL ? "left-start" : "right-start"}
                anchor="anchor"
                flip-fallback-strategy="best-fit"
                skidding=${this.skidding}
                strategy="fixed"
                auto-size="vertical"
                auto-size-padding="10"
                flip
            >
                <slot name="submenu"></slot>
            </pc-popup>
        `;
    }
}
