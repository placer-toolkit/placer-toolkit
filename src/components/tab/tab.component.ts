import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcIconButton } from "../icon-button/icon-button.js";
import { styles } from "./tab.styles.js";

let id = 0;

@customElement("pc-tab")
export class PcTab extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = { "pc-icon-button": PcIconButton };

    private readonly attributeID = ++id;
    private readonly componentID = `pc-tab-${this.attributeID}`;

    @query(".tab") tab!: HTMLElement;

    @property({ type: Boolean, reflect: true }) active = false;

    @property({ type: Boolean, reflect: true }) closable = false;

    @property({ type: Boolean, reflect: true }) disabled = false;

    @property({ reflect: true }) panel = "";

    @property({ type: Number, reflect: true }) tabIndex = 0;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "tab");
    }

    private handleCloseClick(event: Event) {
        event.stopPropagation();
        emit(this, "pc-close");
    }

    @watch("active")
    handleActiveChange() {
        this.setAttribute("aria-selected", this.active ? "true" : "false");
    }

    @watch("disabled")
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");

        if (this.disabled && !this.active) {
            this.tabIndex = -1;
        }
    }

    render() {
        this.id = this.id.length > 0 ? this.id : this.componentID;

        return html`
            <div
                part="base"
                class=${classMap({
                    "tab": true,
                    "tab-active": this.active === true,
                    "tab-closable": this.closable === true,
                    "tab-disabled": this.disabled === true,
                })}
            >
                <slot></slot>
                ${this.closable
                    ? html`
                          <pc-icon-button
                              class="close-button"
                              library="system"
                              icon-style="solid"
                              name="xmark"
                              label="Close tab"
                              @click=${this.handleCloseClick}
                              tabindex="-1"
                              exportparts="base:close-button__base"
                          ></pc-icon-button>
                      `
                    : ""}
            </div>
        `;
    }
}
