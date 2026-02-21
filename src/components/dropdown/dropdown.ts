import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { animateTo, stopAnimations } from "../../internal/animate.js";
import {
    getAnimation,
    setDefaultAnimation,
} from "../../utilities/animation-registry.js";
import { LocalizeController } from "../../utilities/localize.js";
import { PcAfterHideEvent } from "../../events/pc-after-hide.js";
import { PcAfterShowEvent } from "../../events/pc-after-show.js";
import { PcHideEvent } from "../../events/pc-hide.js";
import { PcSelectEvent } from "../../events/pc-select.js";
import { PcShowEvent } from "../../events/pc-show.js";
import {
    autoUpdate,
    computePosition,
    flip,
    offset,
    shift,
} from "@floating-ui/dom";
import { activeElements } from "../../internal/active-elements.js";
import { uniqueID } from "../../internal/math.js";
import type { PcButton } from "../button/button.js";
import type { PcDropdownItem } from "../dropdown-item/dropdown-item.js";
import type { PcPopup } from "../popup/popup.js";
import sizeStyles from "../../styles/utilities/size.css";
import styles from "./dropdown.css";

const openDropdowns = new Set<PcDropdown>();

setDefaultAnimation("dropdown.show", {
    keyframes: [
        {
            offset: 0,
            opacity: 0,
            transform:
                "scaleY(0.35) scaleX(0.95) translateY(-10px) rotate(1deg)",
        },
        {
            offset: 0.25,
            opacity: 1,
            transform:
                "scaleY(1.03) scaleX(1.005) translateY(2px) rotate(-0.5deg)",
        },
        {
            offset: 0.5,
            transform:
                "scaleY(0.995) scaleX(0.999) translateY(-0.5px) rotate(0.1deg)",
        },
        {
            offset: 0.75,
            transform:
                "scaleY(1.002) scaleX(1.0005) translateY(0.2px) rotate(-0.05deg)",
        },
        {
            offset: 1,
            opacity: 1,
            transform: "scaleY(1) scaleX(1) translateY(0) rotate(0deg)",
        },
    ],
    options: {
        duration: 1000,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        fill: "forwards",
    },
});

setDefaultAnimation("dropdown.hide", {
    keyframes: [
        {
            offset: 0,
            opacity: 1,
            transform: "scaleY(1) scaleX(1) translateY(0) rotate(0deg)",
        },
        {
            offset: 0.15,
            transform:
                "scaleY(1.005) scaleX(1.001) translateY(0.5px) rotate(-0.002deg)",
        },
        {
            offset: 0.4,
            transform:
                "scaleY(0.99) scaleX(0.998) translateY(-1px) rotate(0.008deg)",
        },
        {
            offset: 0.75,
            transform:
                "scaleY(0.6) scaleX(0.9) translateY(10px) rotate(0.007deg)",
        },
        {
            offset: 1,
            opacity: 0,
            transform:
                "scaleY(0.3) scaleX(0.8) translateY(25px) rotate(0.01deg)",
        },
    ],
    options: {
        duration: 400,
        easing: "cubic-bezier(0.6, 0.05, 0.8, 0.2)",
        fill: "forwards",
    },
});

/**
 * @summary Dropdowns display a list of options that can be triggered by keyboard navigation, submenus and various customisation options.
 * @status experimental
 * @since 0.5.1
 *
 * @dependency pc-popup
 *
 * @event pc-show - Emitted when the dropdown is about to show.
 * @event pc-after-show - Emitted when the dropdown has been shown.
 * @event pc-hide - Emitted when the dropdown is about to hide.
 * @event pc-after-hide - Emitted when the dropdown has been hidden.
 * @event pc-select - Emitted when an item in the dropdown is selected.
 *
 * @slot - The dropdown’s items, typically `<pc-dropdown-item>` elements.
 * @slot trigger - The element that triggers the dropdown, such as a `<pc-button>` or `<button>`.
 *
 * @csspart base - The component’s host element.
 * @csspart menu - The dropdown menu container.
 */
@customElement("pc-dropdown")
export class PcDropdown extends PlacerElement {
    static css = [sizeStyles, styles];

    private submenuCleanups: Map<
        PcDropdownItem,
        ReturnType<typeof autoUpdate>
    > = new Map();
    private readonly localize = new LocalizeController(this);
    private userTypedQuery = "";
    private userTypedTimeout!: ReturnType<typeof setTimeout>;
    private openSubmenuStack: PcDropdownItem[] = [];

    @query("slot:not([name])") defaultSlot!: HTMLSlotElement;
    @query("#menu") private menu!: HTMLDivElement;
    @query("pc-popup") private popup!: PcPopup;

    /** Opens or closes the dropdown. */
    @property({ type: Boolean, reflect: true }) open = false;

    /** The dropdown’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** The placement of the dropdown menu in reference to the trigger. The menu will shift to a more optimal location if the preferred placement doesn’t have enough room. */
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
        | "left-end" = "bottom-start";

    /** The distance of the dropdown menu from its trigger. */
    @property({ type: Number }) distance = 0;

    /** The skidding of the dropdown menu along its trigger. */
    @property({ type: Number }) skidding = 0;

    firstUpdated() {
        this.syncARIAAttributes();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.userTypedTimeout);
        this.closeAllSubmenus();

        this.submenuCleanups.forEach((cleanup) => cleanup());
        this.submenuCleanups.clear();

        document.removeEventListener("mousemove", this.handleGlobalMouseMove);
    }

    async updated(changedProperties: PropertyValues) {
        if (changedProperties.has("open")) {
            this.customStates.set("open", this.open);

            if (this.open) {
                await this.showMenu();
            } else {
                this.closeAllSubmenus();
                await this.hideMenu();
            }
        }

        if (changedProperties.has("size")) {
            this.syncItemSizes();
        }
    }

    /** Gets all dropdown items slotted in the menu. */
    private getItems(includeDisabled = false): PcDropdownItem[] {
        const items = this.defaultSlot
            .assignedElements({ flatten: true })
            .filter(
                (element) => element.localName === "pc-dropdown-item",
            ) as PcDropdownItem[];

        return includeDisabled ? items : items.filter((item) => !item.disabled);
    }

    /** Gets all dropdown items in a specific submenu. */
    private getSubmenuItems(
        parentItem: PcDropdownItem,
        includeDisabled = false,
    ): PcDropdownItem[] {
        const submenuSlot =
            parentItem.shadowRoot?.querySelector<HTMLSlotElement>(
                'slot[name="submenu"]',
            ) ||
            parentItem.querySelector<HTMLSlotElement>('slot[name="submenu"]');

        if (!submenuSlot) {
            return [];
        }

        const items = submenuSlot
            .assignedElements({ flatten: true })
            .filter(
                (element) => element.localName === "pc-dropdown-item",
            ) as PcDropdownItem[];

        return includeDisabled ? items : items.filter((item) => !item.disabled);
    }

    /** Syncs item sizes with the dropdown’s size property. */
    private syncItemSizes() {
        const items = this.defaultSlot
            .assignedElements({ flatten: true })
            .filter(
                (element) => element.localName === "pc-dropdown-item",
            ) as PcDropdownItem[];
        items.forEach((item) => (item.size = this.size));
    }

    /** Handles the submenu navigation stack. */
    private addToSubmenuStack(item: PcDropdownItem) {
        const index = this.openSubmenuStack.indexOf(item);

        if (index !== -1) {
            this.openSubmenuStack = this.openSubmenuStack.slice(0, index + 1);
        } else {
            this.openSubmenuStack.push(item);
        }
    }

    /** Removes the last item from the submenu stack. */
    private removeFromSubmenuStack() {
        return this.openSubmenuStack.pop();
    }

    /** Gets the current active submenu item. */
    private getCurrentSubmenuItem(): PcDropdownItem | undefined {
        return this.openSubmenuStack.length > 0
            ? this.openSubmenuStack[this.openSubmenuStack.length - 1]
            : undefined;
    }

    /** Closes all submenus in the dropdown. */
    private closeAllSubmenus() {
        const items = this.getItems(true);

        items.forEach((item) => {
            item.submenuOpen = false;
        });

        this.openSubmenuStack = [];
    }

    /** Closes sibling submenus at the same level as the specified item. */
    private closeSiblingSubmenus(item: PcDropdownItem) {
        const parentDropdownItem = item.closest<PcDropdownItem>(
            'pc-dropdown-item:not([slot="submenu"])',
        );

        let siblingItems: PcDropdownItem[];

        if (parentDropdownItem) {
            siblingItems = this.getSubmenuItems(parentDropdownItem, true);
        } else {
            siblingItems = this.getItems(true);
        }

        siblingItems.forEach((siblingItem) => {
            if (siblingItem !== item && siblingItem.submenuOpen) {
                siblingItem.submenuOpen = false;
            }
        });

        if (!this.openSubmenuStack.includes(item)) {
            this.openSubmenuStack.push(item);
        }
    }

    /** Get the slotted trigger button, a <pc-button> or <button> element. */
    private getTrigger(): HTMLButtonElement | PcButton | null {
        return this.querySelector<HTMLButtonElement | PcButton>(
            '[slot="trigger"]',
        );
    }

    /** Shows the dropdown menu. This should be only called from within `updated()`. */
    private async showMenu() {
        const anchor = this.getTrigger();

        if (!anchor) {
            return;
        }

        const pcShow = new PcShowEvent();

        this.dispatchEvent(pcShow);

        if (pcShow.defaultPrevented) {
            this.open = false;
            return;
        }

        openDropdowns.forEach((dropdown) => (dropdown.open = false));

        this.popup.active = true;
        this.open = true;

        openDropdowns.add(this);

        this.syncARIAAttributes();

        document.addEventListener("keydown", this.handleDocumentKeyDown);
        document.addEventListener(
            "pointerdown",
            this.handleDocumentPointerDown,
        );
        document.addEventListener("mousemove", this.handleGlobalMouseMove);

        this.menu.hidden = false;

        const { keyframes, options } = getAnimation(this, "dropdown.show", {
            dir: this.localize.dir(),
        });

        await animateTo(this.menu, keyframes, options);
        await stopAnimations(this);

        const items = this.getItems();

        if (items.length > 0) {
            items.forEach((item, index) => (item.active = index === 0));
            items[0].focus({ preventScroll: true });
        }

        this.dispatchEvent(new PcAfterShowEvent());
    }

    /** Hides the dropdown menu. This should be only called from within `updated()`. */
    private async hideMenu() {
        const pcHide = new PcHideEvent();

        this.dispatchEvent(pcHide);

        if (pcHide.defaultPrevented) {
            this.open = true;
            return;
        }

        this.open = false;

        openDropdowns.delete(this);

        this.syncARIAAttributes();

        document.removeEventListener("keydown", this.handleDocumentKeyDown);
        document.removeEventListener(
            "pointerdown",
            this.handleDocumentPointerDown,
        );
        document.removeEventListener("mousemove", this.handleGlobalMouseMove);

        const { keyframes, options } = getAnimation(this, "dropdown.hide", {
            dir: this.localize.dir(),
        });

        await animateTo(this.menu, keyframes, options);
        await stopAnimations(this);

        this.menu.hidden = true;

        this.dispatchEvent(new PcAfterHideEvent());
    }

    /** Handles key down events when the menu is open. */
    private handleDocumentKeyDown = async (event: KeyboardEvent) => {
        const isRTL = this.localize.dir() === "rtl";

        if (event.key === "Escape") {
            const trigger = this.getTrigger();

            event.preventDefault();
            event.stopPropagation();

            this.open = false;
            trigger?.focus({ preventScroll: true });

            return;
        }

        const activeElement = [...activeElements()].find(
            (element) => element.localName === "pc-dropdown-item",
        );
        const isFocusedOnItem = activeElement?.localName === "pc-dropdown-item";
        const currentSubmenuItem = this.getCurrentSubmenuItem();
        const isInSubmenu = !!currentSubmenuItem;

        let items: PcDropdownItem[];
        let activeItem: PcDropdownItem | undefined;
        let activeItemIndex: number;

        if (isInSubmenu) {
            items = this.getSubmenuItems(currentSubmenuItem);
            activeItem = items.find(
                (item) => item.active || item === activeElement,
            );
            activeItemIndex = activeItem ? items.indexOf(activeItem) : -1;
        } else {
            items = this.getItems();
            activeItem = items.find(
                (item) => item.active || item === activeElement,
            );
            activeItemIndex = activeItem ? items.indexOf(activeItem) : -1;
        }

        let itemToSelect: PcDropdownItem | undefined;

        if (event.key === "ArrowUp") {
            event.preventDefault();
            event.stopPropagation();

            if (activeItemIndex > 0) {
                itemToSelect = items[activeItemIndex - 1];
            } else {
                itemToSelect = items[items.length - 1];
            }
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            event.stopPropagation();

            if (activeItemIndex !== -1 && activeItemIndex < items.length - 1) {
                itemToSelect = items[activeItemIndex + 1];
            } else {
                itemToSelect = items[0];
            }
        }

        if (
            event.key === (isRTL ? "ArrowLeft" : "ArrowRight") &&
            isFocusedOnItem &&
            activeItem
        ) {
            if (activeItem.hasSubmenu) {
                event.preventDefault();
                event.stopPropagation();

                activeItem.submenuOpen = true;
                this.addToSubmenuStack(activeItem);

                setTimeout(() => {
                    const submenuItems = this.getSubmenuItems(activeItem!);
                    if (submenuItems.length > 0) {
                        submenuItems.forEach(
                            (item, index) => (item.active = index === 0),
                        );
                        submenuItems[0].focus({ preventScroll: true });
                    }
                }, 0);

                return;
            }
        }

        if (event.key === (isRTL ? "ArrowRight" : "ArrowLeft") && isInSubmenu) {
            event.preventDefault();
            event.stopPropagation();

            const removedItem = this.removeFromSubmenuStack();
            if (removedItem) {
                removedItem.submenuOpen = false;

                setTimeout(() => {
                    removedItem.focus({ preventScroll: true });
                    removedItem.active = true;

                    const parentItems =
                        removedItem.slot === "submenu"
                            ? this.getSubmenuItems(
                                  removedItem.parentElement as PcDropdownItem,
                              )
                            : this.getItems();

                    parentItems.forEach((item) => {
                        if (item !== removedItem) {
                            item.active = false;
                        }
                    });
                }, 0);
            }

            return;
        }

        if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            event.stopPropagation();

            itemToSelect =
                event.key === "Home" ? items[0] : items[items.length - 1];
        }

        if (event.key === "Tab") {
            await this.hideMenu();
        }

        if (
            event.key.length === 1 &&
            !(event.metaKey || event.ctrlKey || event.altKey) &&
            !(event.key === " " && this.userTypedQuery === "")
        ) {
            clearTimeout(this.userTypedTimeout);

            this.userTypedTimeout = setTimeout(() => {
                this.userTypedQuery = "";
            }, 1000);

            this.userTypedQuery += event.key;

            items.some((item) => {
                const label = (item.textContent || "").trim().toLowerCase();
                const selectionQuery = this.userTypedQuery.trim().toLowerCase();

                if (label.startsWith(selectionQuery)) {
                    itemToSelect = item;

                    return true;
                }

                return false;
            });
        }

        if (itemToSelect) {
            event.preventDefault();
            event.stopPropagation();

            items.forEach((item) => (item.active = item === itemToSelect));

            itemToSelect.focus({ preventScroll: true });

            return;
        }

        if (
            (event.key === "Enter" ||
                (event.key === " " && this.userTypedQuery === "")) &&
            isFocusedOnItem &&
            activeItem
        ) {
            event.preventDefault();
            event.stopPropagation();

            if (activeItem.hasSubmenu) {
                activeItem.submenuOpen = true;

                this.addToSubmenuStack(activeItem);

                setTimeout(() => {
                    const submenuItems = this.getSubmenuItems(activeItem!);

                    if (submenuItems.length > 0) {
                        submenuItems.forEach(
                            (item, index) => (item.active = index === 0),
                        );
                        submenuItems[0].focus({ preventScroll: true });
                    }
                }, 0);
            } else {
                this.makeSelection(activeItem);
            }
        }
    };

    /** Handles pointer down events when the dropdown is open. */
    private handleDocumentPointerDown = (event: PointerEvent) => {
        const path = event.composedPath();
        const isInDropdownHierarchy = path.some((element) => {
            if (element instanceof HTMLElement) {
                return (
                    element === this ||
                    element.closest('pc-dropdown, [part="submenu"]')
                );
            }

            return false;
        });

        if (!isInDropdownHierarchy) {
            this.open = false;
        }
    };

    /** Handles clicks on the menu. */
    private handleMenuClick(event: MouseEvent) {
        const item = (event.target as Element).closest("pc-dropdown-item");

        if (!item || item.disabled) {
            return;
        }

        if (item.hasSubmenu) {
            if (!item.submenuOpen) {
                this.closeSiblingSubmenus(item);
                this.addToSubmenuStack(item);

                item.submenuOpen = true;
            }

            event.stopPropagation();
            return;
        }

        this.makeSelection(item);
    }

    /** Prepares dropdown items when they get added or removed. */
    private async handleMenuSlotChange() {
        const items = this.getItems(true);

        await Promise.all(items.map((item) => item.updateComplete));

        this.syncItemSizes();

        const hasCheckbox = items.some((item) => item.type === "checkbox");
        const hasSubmenu = items.some((item) => item.hasSubmenu);

        items.forEach((item, index) => {
            item.active = index === 0;
            item.checkboxAdjacent = hasCheckbox;
            item.submenuAdjacent = hasSubmenu;
        });
    }

    /** Toggles the dropdown menu. */
    private handleTriggerClick() {
        this.open = !this.open;
    }

    /** Handles submenu opening events. */
    private handleSubmenuOpening(event: CustomEvent) {
        const openingItem = event.detail.item as PcDropdownItem;

        this.closeSiblingSubmenus(openingItem);
        this.addToSubmenuStack(openingItem);

        this.setupSubmenuPosition(openingItem);
        this.processSubmenuItems(openingItem);
    }

    /** Sets up submenu positioning with `autoUpdate`. */
    private setupSubmenuPosition(item: PcDropdownItem) {
        if (!item.submenuElement) {
            return;
        }

        this.cleanupSubmenuPosition(item);

        const cleanup = autoUpdate(item, item.submenuElement, () => {
            this.positionSubmenu(item);
            this.updateSafeTriangleCoordinates(item);
        });

        this.submenuCleanups.set(item, cleanup);

        const submenuSlot = item.submenuElement.querySelector(
            'slot[name="submenu"]',
        );

        if (submenuSlot) {
            submenuSlot.removeEventListener(
                "slotchange",
                PcDropdown.handleSubmenuSlotChange,
            );
            submenuSlot.addEventListener(
                "slotchange",
                PcDropdown.handleSubmenuSlotChange,
            );
            PcDropdown.handleSubmenuSlotChange({
                target: submenuSlot,
            } as unknown as Event);
        }
    }

    private static handleSubmenuSlotChange(event: Event) {
        const slot = event.target as HTMLSlotElement;

        if (!slot) {
            return;
        }

        const items = slot
            .assignedElements()
            .filter(
                (element) => element.localName === "pc-dropdown-item",
            ) as PcDropdownItem[];

        if (items.length === 0) {
            return;
        }

        const hasSubmenuItems = items.some((item) => item.hasSubmenu);
        const hasCheckboxItems = items.some((item) => item.type === "checkbox");

        items.forEach((item) => {
            item.submenuAdjacent = hasSubmenuItems;
            item.checkboxAdjacent = hasCheckboxItems;
        });
    }

    private processSubmenuItems(item: PcDropdownItem) {
        if (!item.submenuElement) {
            return;
        }

        const submenuItems = this.getSubmenuItems(item, true);
        const hasSubmenuItems = submenuItems.some(
            (subItem) => subItem.hasSubmenu,
        );
        const hasCheckboxItems = submenuItems.some(
            (subItem) => subItem.type === "checkbox",
        );

        submenuItems.forEach((subItem) => {
            subItem.submenuAdjacent = hasSubmenuItems;
            subItem.checkboxAdjacent = hasCheckboxItems;
        });
    }

    /** Cleans up the submenu positioning. */
    private cleanupSubmenuPosition(item: PcDropdownItem) {
        const cleanup = this.submenuCleanups.get(item);

        if (cleanup) {
            cleanup();
            this.submenuCleanups.delete(item);
        }
    }

    /** Positions a submenu relative to its parent item. */
    private positionSubmenu(item: PcDropdownItem) {
        if (!item.submenuElement) {
            return;
        }

        const isRTL = this.localize.dir() === "rtl";
        const placement = isRTL ? "left-start" : "right-start";

        computePosition(item, item.submenuElement, {
            placement: placement,
            middleware: [
                offset({
                    mainAxis: 0,
                    crossAxis: -5,
                }),
                flip({
                    fallbackStrategy: "bestFit",
                }),
                shift({
                    padding: 8,
                }),
            ],
        }).then(({ x, y, placement }) => {
            item.submenuElement.setAttribute("data-placement", placement);

            Object.assign(item.submenuElement.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }

    /** Updates the safe triangle coordinates for a submenu. */
    private updateSafeTriangleCoordinates(item: PcDropdownItem) {
        if (!item.submenuElement || !item.submenuOpen) {
            return;
        }

        const isKeyboardNavigation =
            document.activeElement?.matches(":focus-visible");

        if (isKeyboardNavigation) {
            item.submenuElement.style.setProperty(
                "--safe-triangle-visible",
                "none",
            );

            return;
        }

        item.submenuElement.style.setProperty(
            "--safe-triangle-visible",
            "block",
        );

        const submenuRect = item.submenuElement.getBoundingClientRect();
        const isRTL = this.localize.dir() === "rtl";

        item.submenuElement.style.setProperty(
            "--safe-triangle-submenu-start-x",
            `${isRTL ? submenuRect.right : submenuRect.left}px`,
        );
        item.submenuElement.style.setProperty(
            "--safe-triangle-submenu-start-y",
            `${submenuRect.top}px`,
        );
        item.submenuElement.style.setProperty(
            "--safe-triangle-submenu-end-x",
            `${isRTL ? submenuRect.right : submenuRect.left}px`,
        );
        item.submenuElement.style.setProperty(
            "--safe-triangle-submenu-end-y",
            `${submenuRect.bottom}px`,
        );
    }

    /** Handle global mouse movement for safe triangle logic. */
    private handleGlobalMouseMove = (event: MouseEvent) => {
        const currentSubmenuItem = this.getCurrentSubmenuItem();

        if (
            !currentSubmenuItem?.submenuOpen ||
            !currentSubmenuItem.submenuElement
        ) {
            return;
        }

        const submenuRect =
            currentSubmenuItem.submenuElement.getBoundingClientRect();
        const isRTL = this.localize.dir() === "rtl";
        const submenuEdgeX = isRTL ? submenuRect.right : submenuRect.left;

        const constrainedX = isRTL
            ? Math.max(event.clientX, submenuEdgeX)
            : Math.min(event.clientX, submenuEdgeX);
        const constrainedY = Math.max(
            submenuRect.top,
            Math.min(event.clientY, submenuRect.bottom),
        );

        currentSubmenuItem.submenuElement.style.setProperty(
            "--safe-triangle-cursor-x",
            `${constrainedX}px`,
        );
        currentSubmenuItem.submenuElement.style.setProperty(
            "--safe-triangle-cursor-y",
            `${constrainedY}px`,
        );

        const isOverItem = currentSubmenuItem.matches(":hover");
        const isOverSubmenu =
            currentSubmenuItem.submenuElement?.matches(":hover") ||
            !!event
                .composedPath()
                .find(
                    (element) =>
                        element instanceof HTMLElement &&
                        element.closest('[part="submenu"]') ===
                            currentSubmenuItem.submenuElement,
                );

        if (!isOverItem && !isOverSubmenu) {
            setTimeout(() => {
                if (
                    !currentSubmenuItem.matches(":hover") &&
                    !currentSubmenuItem.submenuElement?.matches(":hover")
                ) {
                    currentSubmenuItem.submenuOpen = false;
                }
            }, 100);
        }
    };

    /** Makes a selection, emits the `pc-select` event and closes the dropdown. */
    private makeSelection(item: PcDropdownItem) {
        const trigger = this.getTrigger();

        if (item.disabled) {
            return;
        }

        if (item.type === "checkbox") {
            item.checked = !item.checked;
        }

        const pcSelect = new PcSelectEvent({ item });

        this.dispatchEvent(pcSelect);

        if (!pcSelect.defaultPrevented) {
            this.open = false;
            trigger?.focus({ preventScroll: true });
        }
    }

    /** Syncs ARIA attributes on the slotted trigger element and the menu based on the dropdown’s current state. */
    private async syncARIAAttributes() {
        const trigger = this.getTrigger();

        let nativeButton: HTMLButtonElement | undefined;

        if (!trigger) {
            return;
        }

        if (trigger.localName === "pc-button") {
            await customElements.whenDefined("pc-button");
            await (trigger as PcButton).updateComplete;

            nativeButton =
                trigger.shadowRoot!.querySelector<HTMLButtonElement>(
                    '[part="base"]',
                )!;
        } else {
            nativeButton = trigger as HTMLButtonElement;
        }

        if (!nativeButton.hasAttribute("id")) {
            nativeButton.setAttribute("id", uniqueID("pc-dropdown-trigger-"));
        }

        nativeButton.setAttribute("aria-haspopup", "menu");
        nativeButton.setAttribute(
            "aria-expanded",
            this.open ? "true" : "false",
        );

        this.menu.setAttribute("aria-expanded", "false");
    }

    render() {
        let active = this.hasUpdated ? this.popup.active : this.open;

        return html`
            <pc-popup
                placement=${this.placement}
                distance=${this.distance}
                skidding=${this.skidding}
                ?active=${active}
                flip-fallback-strategy="best-fit"
                shift-padding="10"
                auto-size="vertical"
                auto-size-padding="10"
                shift
                flip
            >
                <slot
                    name="trigger"
                    slot="anchor"
                    @click=${this.handleTriggerClick}
                    @slotchange=${this.syncARIAAttributes}
                ></slot>

                <div
                    part="menu"
                    id="menu"
                    role="menu"
                    tabindex="-1"
                    aria-orientation="vertical"
                    @click=${this.handleMenuClick}
                    @pc-submenu-opening=${this.handleSubmenuOpening}
                >
                    <slot @slotchange=${this.handleMenuSlotChange}></slot>
                </div>
            </pc-popup>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-dropdown": PcDropdown;
    }
}
