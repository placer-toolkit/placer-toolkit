import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { animateTo, stopAnimations } from "../../internal/animate.js";
import {
    getAnimation,
    setDefaultAnimation,
} from "../../utilities/animation-registry.js";
import { HasSlotController } from "../../internal/slot.js";
import { LocalizeController } from "../../utilities/localize.js";
import { PcSubmenuOpeningEvent } from "../../events/pc-submenu-opening.js";
import "../icon/icon.js";
import styles from "./dropdown-item.css";

setDefaultAnimation("submenu.show", {
    keyframes: [
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1 },
    ],
    options: {
        duration: 300,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        fill: "both",
    },
});

setDefaultAnimation("submenu.hide", {
    keyframes: [
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.9 },
    ],
    options: {
        duration: 200,
        easing: "cubic-bezier(0.4, 0.2, 0.6, 0.1)",
        fill: "both",
    },
});

/**
 * @summary Represents an individual item within a dropdown menu, supporting standard items, checkboxes and submenus.
 * @status experimental
 * @since 1.0.0-alpha.1
 *
 * @dependency pc-icon
 *
 * @event focus - Emitted when the dropdown item gains focus.
 * @event blur - Emitted when the dropdown item loses focus.
 *
 * @slot - The dropdown item’s label.
 * @slot icon - An optional icon to display before the label.
 * @slot details - Additional content or details to display after the label.
 * @slot submenu - Submenu items, typically `<pc-dropdown-item>` elements, to create a nested menu.
 *
 * @csspart checkmark - The checkmark icon (a `<pc-icon>` element) when the item is a checkbox.
 * @csspart checkmark-svg - The `svg` part in the checkmark’s `<pc-icon>` element.
 * @csspart icon - The container for the icon slot.
 * @csspart label - The container for the label slot.
 * @csspart details - The container for the details slot.
 * @csspart submenu-icon - The submenu indicator icon (a `<pc-icon>` element).
 * @csspart submenu-icon-svg - The `svg` part in the submenu icon’s `<pc-icon>` element.
 * @csspart submenu - The submenu container.
 */
@customElement("pc-dropdown-item")
export class PcDropdownItem extends PlacerElement {
    static css = styles;

    private readonly hasSlotController = new HasSlotController(
        this,
        "[default]",
        "prefix",
        "suffix",
    );
    private readonly localize = new LocalizeController(this);

    @query("#submenu") submenuElement!: HTMLDivElement;

    /** @internal Store whether this item has a submenu. */
    @state() hasSubmenu = false;

    /** @internal The controller will set this property to `true` when the item is active. */
    @property({ type: Boolean }) active = false;

    /** The type of menu item to render. */
    @property({ reflect: true }) appearance:
        | "default"
        | "primary"
        | "success"
        | "warning"
        | "danger" = "default";

    /** @internal The dropdown item’s size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** @internal The controller will set this property to `true` when at least one checkbox exists in the dropdown. This allows non‐checkbox items to draw additional space to align properly with checkbox items. */
    @property({ attribute: "checkbox-adjacent", type: Boolean, reflect: true })
    checkboxAdjacent = false;

    /** @internal The controller will set this property to true when at least one item with a submenu exists in the dropdown. This allows non‐submenu items to draw additional space to align properly with items that have submenus. */
    @property({ attribute: "submenu-adjacent", type: Boolean, reflect: true })
    submenuAdjacent = false;

    /** An optional value for the menu item. This is useful for determining which item was selected when listening to the dropdown’s `pc-select` event. */
    @property() value?: string;

    /** The dropdown item’s type. */
    @property({ reflect: true }) type: "normal" | "checkbox" = "normal";

    /** Set to `true` to check the dropdown item by default. This is only valid when the `type` attribute/property is set to `checkbox`. */
    @property({ type: Boolean }) checked = false;

    /** Disables the dropdown item. */
    @property({ type: Boolean }) disabled = false;

    /** Decides whether the submenu is currently open. */
    @property({ type: Boolean, reflect: true }) submenuOpen = false;

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
        this.shadowRoot!.addEventListener("slotchange", this.handleSlotChange);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.closeSubmenu();
        this.removeEventListener("mouseenter", this.handleMouseEnter);
        this.shadowRoot!.removeEventListener(
            "slotchange",
            this.handleSlotChange,
        );
    }

    firstUpdated() {
        this.setAttribute("tabindex", "-1");
        this.hasSubmenu = this.hasSlotController.test("submenu");
        this.updateHasSubmenuState();
    }

    updated(changedProperties: PropertyValues<this>) {
        if (changedProperties.has("active")) {
            this.setAttribute("tabindex", this.active ? "0" : "-1");

            this.customStates.set("active", this.active);
        }

        if (changedProperties.has("checked")) {
            this.setAttribute("aria-checked", this.checked ? "true" : "false");

            this.customStates.set("checked", this.checked);
        }

        if (changedProperties.has("disabled")) {
            this.setAttribute(
                "aria-disabled",
                this.disabled ? "true" : "false",
            );

            this.customStates.set("disabled", this.disabled);
        }

        if (changedProperties.has("type")) {
            if (this.type === "checkbox") {
                this.setAttribute("role", "menuitemcheckbox");
            } else {
                this.setAttribute("role", "menuitem");
            }
        }

        if (changedProperties.has("submenuOpen")) {
            this.customStates.set("submenu-open", this.submenuOpen);

            if (this.submenuOpen) {
                this.openSubmenu();
            } else {
                this.closeSubmenu();
            }
        }
    }

    private handleSlotChange = () => {
        this.hasSubmenu = this.hasSlotController.test("submenu");
        this.updateHasSubmenuState();

        if (this.hasSubmenu) {
            this.setAttribute("aria-haspopup", "menu");
            this.setAttribute(
                "aria-expanded",
                this.submenuOpen ? "true" : "false",
            );
        } else {
            this.removeAttribute("aria-haspopup");
            this.removeAttribute("aria-expanded");
        }
    };

    /** Update the `has-submenu` custom state */
    private updateHasSubmenuState() {
        this.customStates.set("has-submenu", this.hasSubmenu);
    }

    /** Opens the submenu. */
    async openSubmenu() {
        if (!this.hasSubmenu || !this.submenuElement) {
            return;
        }

        this.notifyParentOfOpening();

        this.submenuElement.showPopover();
        this.submenuElement.hidden = false;
        this.submenuElement.setAttribute("data-visible", "");
        this.submenuOpen = true;
        this.setAttribute("aria-expanded", "true");

        const { keyframes, options } = getAnimation(this, "submenu.show", {
            dir: this.localize.dir(),
        });

        await animateTo(this.submenuElement, keyframes, options);
        await stopAnimations(this);

        setTimeout(() => {
            const items = this.getSubmenuItems();

            if (items.length > 0) {
                items.forEach((item, index) => (item.active = index === 0));
                items[0].focus({ preventScroll: true });
            }
        }, 0);
    }

    /** Notifies the parent dropdown that this item is opening its submenu. */
    private notifyParentOfOpening() {
        this.dispatchEvent(new PcSubmenuOpeningEvent({ item: this }));

        const parent = this.parentElement;

        if (parent) {
            const siblings = [...parent.children].filter(
                (element) =>
                    element !== this &&
                    element.localName === "pc-dropdown-item" &&
                    element.getAttribute("slot") ===
                        this.getAttribute("slot") &&
                    (element as PcDropdownItem).submenuOpen,
            ) as PcDropdownItem[];

            siblings.forEach((sibling) => {
                sibling.submenuOpen = false;
            });
        }
    }

    /** Closes the submenu. */
    async closeSubmenu() {
        if (!this.hasSubmenu || !this.submenuElement) {
            return;
        }

        this.submenuOpen = false;
        this.setAttribute("aria-expanded", "false");

        if (!this.submenuElement.hidden) {
            const { keyframes, options } = getAnimation(this, "submenu.hide", {
                dir: this.localize.dir(),
            });

            await animateTo(this.submenuElement, keyframes, options);
            await stopAnimations(this);

            this.submenuElement.hidden = true;
            this.submenuElement.removeAttribute("data-visible");
            this.submenuElement.hidePopover();
        }
    }

    /** Gets all dropdown items in the submenu. */
    private getSubmenuItems(): PcDropdownItem[] {
        return [...this.children].filter(
            (element) =>
                element.localName === "pc-dropdown-item" &&
                element.getAttribute("slot") === "submenu" &&
                !element.hasAttribute("disabled"),
        ) as PcDropdownItem[];
    }

    /** Handles mouse entering events to open the submenu. */
    private handleMouseEnter() {
        if (this.hasSubmenu && !this.disabled) {
            this.notifyParentOfOpening();
            this.submenuOpen = true;
        }
    }

    render() {
        return html`
            ${this.type === "checkbox"
                ? html`
                      <pc-icon
                          library="system"
                          icon-style="solid"
                          name="check"
                          part="checkmark"
                          id="check"
                          exportparts="svg:checkmark-svg"
                      ></pc-icon>
                  `
                : ""}

            <span id="icon" part="icon">
                <slot name="icon"></slot>
            </span>

            <span id="label" part="label">
                <slot></slot>
            </span>

            <span id="details" part="details">
                <slot name="details"></slot>
            </span>

            ${this.hasSubmenu
                ? html`
                      <pc-icon
                          library="system"
                          icon-style="solid"
                          name="chevron-right"
                          part="submenu-icon"
                          id="submenu-indicator"
                          exportparts="svg:submenu-icon-svg"
                      ></pc-icon>
                  `
                : ""}
            ${this.hasSubmenu
                ? html`
                      <div
                          id="submenu"
                          part="submenu"
                          role="menu"
                          popover="manual"
                          tabindex="-1"
                          aria-orientation="vertical"
                          hidden
                      >
                          <slot name="submenu"></slot>
                      </div>
                  `
                : ""}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-dropdown-item": PcDropdownItem;
    }
}
