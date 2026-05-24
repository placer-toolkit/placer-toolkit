import { html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import { hasFocusableChild } from "../../internal/focus.js";
import { watch } from "../../internal/watch.js";
import styles from "./tab-panel.css";

let id = 0;

/**
 * @summary Tab panels are used inside tab groups to display tabbed content.
 * @status experimental
 * @since 0.1.0
 *
 * @slot - The tab panel’s content.
 *
 * @csspart base - The component’s base wrapper.
 */
@customElement("pc-tab-panel")
export class PcTabPanel extends PlacerElement {
    static css = styles;

    private readonly attributeID = ++id;
    private readonly componentID = `pc-tab-panel-${this.attributeID}`;

    /** The tab panel’s name. */
    @property({ reflect: true }) name = "";

    /** The active state of the tab panel. */
    @property({ type: Boolean, reflect: true }) active = false;

    connectedCallback() {
        super.connectedCallback();

        this.id = this.id.length > 0 ? this.id : this.componentID;
        this.setAttribute("role", "tabpanel");
    }

    @watch("active")
    handleActiveChange() {
        this.setAttribute("aria-hidden", this.active ? "false" : "true");
    }

    private updateTabIndex() {
        if (this.active) {
            const hasFocusable = hasFocusableChild(this, true);

            if (!hasFocusable) {
                this.setAttribute("tabindex", "0");
            } else {
                this.removeAttribute("tabindex");
            }
        } else {
            this.removeAttribute("tabindex");
        }
    }

    protected updated(changedProperties: PropertyValues<this>) {
        super.updated(changedProperties);

        if (changedProperties.has("active")) {
            this.updateTabIndex();
        }
    }

    render() {
        return html`
            <slot
                part="base"
                class=${classMap({
                    "tab-panel": true,
                    "active": this.active,
                })}
                @slotchange=${this.updateTabIndex}
            ></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-tab-panel": PcTabPanel;
    }
}
