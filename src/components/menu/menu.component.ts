import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, query } from "lit/decorators.js";
import { emit } from "../../internal/emit.js";
import type { PcMenuItem } from "../menu-item/menu-item.js";
import { styles } from "./menu.styles.js";

export interface MenuSelectEventDetail {
    item: PcMenuItem;
}

@customElement("pc-menu")
export class PcMenu extends LitElement {
    static styles: CSSResultGroup = styles;

    @query("slot") defaultSlot!: HTMLSlotElement;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "menu");
    }

    private handleClick(event: MouseEvent) {
        const menuItemTypes = ["menuitem", "menuitemcheckbox"];

        const composedPath = event.composedPath();
        const target = composedPath.find(
            (element): element is Element =>
                element instanceof Element &&
                menuItemTypes.includes(element.getAttribute("role") || ""),
        );

        if (!target) {
            return;
        }

        const closestMenu = composedPath.find(
            (element): element is Element =>
                element instanceof Element &&
                element.getAttribute("role") === "menu",
        );
        const clickHasSubmenu = closestMenu !== this;

        if (clickHasSubmenu) {
            return;
        }

        const item = target as PcMenuItem;

        if (item.type === "checkbox") {
            item.checked = !item.checked;
        }

        emit(this, "pc-select", { detail: { item } });
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter" || event.key === " ") {
            const item = this.getCurrentItem();
            event.preventDefault();
            event.stopPropagation();
            item?.click();
        } else if (
            ["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)
        ) {
            const items = this.getAllItems();
            const activeItem = this.getCurrentItem();
            let index = activeItem ? items.indexOf(activeItem) : 0;

            if (items.length > 0) {
                event.preventDefault();
                event.stopPropagation();

                if (event.key === "ArrowUp") {
                    index--;
                } else if (event.key === "ArrowDown") {
                    index++;
                } else if (event.key === "Home") {
                    index = 0;
                } else if (event.key === "End") {
                    index = items.length - 1;
                }

                if (index < 0) {
                    index = items.length - 1;
                }

                if (index > items.length - 1) {
                    index = 0;
                }

                this.setCurrentItem(items[index]);
                items[index].focus();
            }
        }
    }

    private handleMouseDown(event: MouseEvent) {
        const target = event.target as HTMLElement;

        if (this.isMenuItem(target)) {
            this.setCurrentItem(target as PcMenuItem);
        }
    }

    private handleSlotChange() {
        const items = this.getAllItems();

        if (items.length > 0) {
            this.setCurrentItem(items[0]);
        }
    }

    private isMenuItem(item: HTMLElement) {
        return (
            item.tagName.toLowerCase() === "pc-menu-item" ||
            ["menuitem", "menuitemcheckbox", "menuitemradio"].includes(
                item.getAttribute("role") ?? "",
            )
        );
    }

    getAllItems() {
        return [...this.defaultSlot.assignedElements({ flatten: true })].filter(
            (element: Element) => {
                if (
                    (element as HTMLElement).inert ||
                    !this.isMenuItem(element as HTMLElement)
                ) {
                    return false;
                }
                return true;
            },
        ) as PcMenuItem[];
    }

    getCurrentItem() {
        return this.getAllItems().find(
            (item) => item.getAttribute("tabindex") === "0",
        );
    }

    setCurrentItem(menuItem: PcMenuItem) {
        const items = this.getAllItems();

        items.forEach((item) => {
            item.setAttribute("tabindex", item === menuItem ? "0" : "-1");
        });
    }

    render() {
        return html`
            <slot
                @click=${this.handleClick}
                @mousedown=${this.handleMouseDown}
                @keydown=${this.handleKeyDown}
                @slotchange=${this.handleSlotChange}
            ></slot>
        `;
    }
}
