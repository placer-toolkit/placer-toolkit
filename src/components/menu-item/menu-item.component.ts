import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { getTextContent, HasSlotController } from "../../internal/slot.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { SubmenuController } from "./submenu-controller.js";
import { PcIcon } from "../icon/icon.js";
import { PcPopup } from "../popup/popup.js";
import { PcSpinner } from "../spinner/spinner.js";
import { styles } from "./menu-item.styles.js";

@customElement("pc-menu-item")
export class PcMenuItem extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = {
        "pc-icon": PcIcon,
        "pc-popup": PcPopup,
        "pc-spinner": PcSpinner,
    };

    private readonly hasSlotController = new HasSlotController(this, "submenu");
    private submenuController: SubmenuController = new SubmenuController(
        this,
        this.hasSlotController,
    );

    private cachedTextLabel: string = "";

    @query("slot:not([name])") defaultSlot!: HTMLSlotElement;
    @query(".menu-item") menuItem!: HTMLElement;

    @property({ type: Boolean, reflect: true }) checked = false;

    @property({ type: Boolean, reflect: true }) disabled = false;

    @property({ type: Boolean, reflect: true }) loading = false;

    @property() type: "normal" | "checkbox" = "normal";

    @property() value = "";

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("click", this.handleHostClick);
        this.addEventListener("mouseover", this.handleMouseOver);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("click", this.handleHostClick);
        this.removeEventListener("mouseover", this.handleMouseOver);
    }

    private handleDefaultSlotChange() {
        const textLabel = this.getTextLabel();

        if (typeof this.cachedTextLabel === "undefined") {
            this.cachedTextLabel = textLabel;
            return;
        }

        if (textLabel !== this.cachedTextLabel) {
            this.cachedTextLabel = textLabel;
            emit(this, "slotchange", {
                bubbles: true,
                composed: false,
                cancelable: false,
            });
        }
    }

    private handleHostClick = (event: MouseEvent) => {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };

    private handleMouseOver = (event: MouseEvent) => {
        this.focus();
        event.stopPropagation();
    };

    @watch("checked")
    handleCheckedChange() {
        if (this.checked && this.type !== "checkbox") {
            this.checked = false;
            console.error(
                `The checked attribute can only be used on menu items with type “checkbox” ${this}`,
            );
            return;
        }

        if (this.type === "checkbox") {
            this.setAttribute("aria-checked", this.checked ? "true" : "false");
        } else {
            this.removeAttribute("aria-checked");
        }
    }

    @watch("disabled")
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    @watch("type")
    handleTypeChange() {
        if (this.type === "checkbox") {
            this.setAttribute("role", "menuitemcheckbox");
            this.setAttribute("aria-checked", this.checked ? "true" : "false");
        } else {
            this.setAttribute("role", "menuitem");
            this.removeAttribute("aria-checked");
        }
    }

    getTextLabel() {
        return getTextContent(this.defaultSlot);
    }

    isSubmenu() {
        return this.hasSlotController.test("submenu");
    }

    render() {
        const isRTL =
            document.documentElement.dir === "rtl" ||
            (!document.documentElement.dir &&
                getComputedStyle(document.documentElement).direction === "rtl");
        const isSubmenuExpanded = this.submenuController.isExpanded();

        return html`
            <div
                id="anchor"
                part="base"
                class=${classMap({
                    "menu-item": true,
                    "menu-item-rtl": isRTL === true,
                    "menu-item-checked": this.checked === true,
                    "menu-item-disabled": this.disabled === true,
                    "menu-item-loading": this.loading === true,
                    "menu-item-has-submenu": this.isSubmenu(),
                    "menu-item-submenu-expanded": isSubmenuExpanded === true,
                })}
                ?aria-haspopup=${this.isSubmenu()}
                ?aria-expanded=${isSubmenuExpanded ? true : false}
            >
                <span part="checked-icon" class="menu-item-check">
                    <pc-icon
                        library="system"
                        icon-style="solid"
                        name="check"
                        aria-hidden="true"
                    ></pc-icon>
                </span>

                <slot name="prefix" part="prefix" class="prefix"></slot>

                <slot
                    part="label"
                    class="label"
                    @slotchange=${this.handleDefaultSlotChange}
                ></slot>

                <slot name="suffix" part="suffix" class="suffix"></slot>

                <span part="submenu-icon" class="menu-item-chevron">
                    <pc-icon
                        library="system"
                        icon-style="solid"
                        name=${isRTL ? "chevron-left" : "chevron-right"}
                        aria-hidden="true"
                    ></pc-icon>
                </span>

                ${this.submenuController.renderSubmenu()}
                ${this.loading
                    ? html`
                          <pc-spinner
                              part="spinner"
                              exportparts="base:spinner__base"
                          ></pc-spinner>
                      `
                    : ""}
            </div>
        `;
    }
}
