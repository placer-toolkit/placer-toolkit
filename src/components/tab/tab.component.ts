import { CSSResultGroup, LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import PcIconButton from "../icon-button/icon-button.ts";
import { styles } from "./tab.styles.ts";

let id = 0;

function watch(
    propName: string,
    options: { waitUntilFirstUpdate?: boolean } = {}
) {
    return (protoOrDescriptor: any, name: string): void => {
        const { update } = protoOrDescriptor;

        protoOrDescriptor.update = function (
            changedProps: Map<string, unknown>
        ) {
            if (changedProps.has(propName)) {
                const oldValue = changedProps.get(propName);
                const newValue = (this as any)[propName];

                if (!options.waitUntilFirstUpdate || this.hasUpdated) {
                    (this as any)[name].call(this, oldValue, newValue);
                }
            }

            update.call(this, changedProps);
        };
    };
}

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
        this.emit("pc-close");
    }

    private emit<T>(
        eventName: string,
        detail: T = {} as T,
        options: CustomEventInit = {}
    ) {
        const event = new CustomEvent<T>(eventName, {
            detail,
            bubbles: options.bubbles ?? true,
            composed: options.composed ?? true,
            cancelable: options.cancelable ?? true,
        });
        this.dispatchEvent(event);
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
                              library="default"
                              name="xmark"
                              label="Close tab"
                              @click=${this.handleCloseClick}
                              tabindex="-1"
                              exportparts="base:close-button-base"
                          ></pc-icon-button>
                      `
                    : ""}
            </div>
        `;
    }
}
