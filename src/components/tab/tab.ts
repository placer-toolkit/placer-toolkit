import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { classMap } from "lit/directives/class-map.js";
import { LocalizeController } from "../../utilities/localize.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcButton } from "../button/button.js";
import styles from "./tab.css";

let id = 0;

/**
 * @summary Tabs are used inside [tab groups](/components/tab-group) to represent and activate [tab panels](/components/tab-panel).
 * @status experimental
 * @since 0.1.0
 *
 * @dependency pc-button
 *
 * @slot - The tab’s label.
 *
 * @event pc-close - Emitted when the tab is closable and the close button is pressed.
 *
 * @csspart base - The component’s base wrapper.
 * @csspart close-button - The close button, a `<pc-icon-button>`.
 * @csspart close-button-base - The close button’s `base` part.
 */
@customElement("pc-tab")
export class PcTab extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;
    /** @internal This is an internal static property. */
    static dependencies = { "pc-button": PcButton };

    private readonly localize = new LocalizeController(this);

    private readonly attributeID = ++id;
    private readonly componentID = `pc-tab-${this.attributeID}`;

    /** @internal This is an internal class property. */
    @query(".tab") tab!: HTMLElement;

    /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
    @property({ reflect: true }) panel = "";

    /** Makes the tab active. */
    @property({ type: Boolean, reflect: true }) active = false;

    /** Makes the tab closable and adds a close button. */
    @property({ type: Boolean, reflect: true }) closable = false;

    /** Disables the tab. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** @internal This needs to be wrapped in a `@property` decorator, otherwise, `CustomElement` throws a runtime error: `The result must not have attributes.` */
    @property({ type: Number, reflect: true }) tabIndex = 0;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "tab");
    }

    private handleCloseClick(event: Event) {
        event.stopPropagation();
        emit(this, "pc-close");
    }

    /** @internal This is an internal method. */
    @watch("active")
    handleActiveChange() {
        this.setAttribute("aria-selected", this.active ? "true" : "false");
    }

    /** @internal This is an internal method. */
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
                    tab: true,
                    active: this.active,
                    closable: this.closable,
                    disabled: this.disabled,
                })}
            >
                <slot></slot>

                ${this.closable
                    ? html`
                          <pc-button
                              class="close-button"
                              size="small"
                              variant="plain"
                              tabindex="-1"
                              @click=${this.handleCloseClick}
                              exportparts="base:close-button-base"
                          >
                              <pc-icon
                                  library="system"
                                  icon-style="solid"
                                  name="xmark"
                                  label=${this.localize.term("close")}
                              ></pc-icon>
                          </pc-button>
                      `
                    : ""}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-tab": PcTab;
    }
}
