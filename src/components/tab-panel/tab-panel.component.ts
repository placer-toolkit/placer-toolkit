import { CSSResultGroup, LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../internal/watch.ts";
import { styles } from "./tab-panel.styles.ts";

let id = 0;

@customElement("pc-tab-panel")
export class PcTabPanel extends LitElement {
    static styles: CSSResultGroup = styles;

    private readonly attributeID = ++id;
    private readonly componentID = `pc-tab-panel-${this.attributeID}`;

    @property({ type: Boolean, reflect: true }) active = false;

    @property({ reflect: true }) name = "";

    connectedCallback() {
        super.connectedCallback();
        this.id = this.id.length > 0 ? this.id : this.componentID;
        this.setAttribute("role", "tabpanel");
    }

    @watch("active")
    handleActiveChange() {
        this.setAttribute("aria-hidden", this.active ? "false" : "true");
    }

    render() {
        return html`
            <slot
                part="base"
                class=${classMap({
                    "tab-panel": true,
                    "tab-panel-active": this.active,
                })}
            ></slot>
        `;
    }
}
