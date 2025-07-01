import { LitElement, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { animateTo, stopAnimations } from "../../internal/animate.js";
import {
    getAnimation,
    setDefaultAnimation,
} from "../../utilities/animation-registry.js";
import { getDeepestActiveElement } from "../../internal/active-elements.js";
import { waitForEvent } from "../../internal/event.js";
import { getTabbableBoundary } from "../../internal/tabbable.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import { PcPopup } from "../popup/popup.component.js";
import type { PcSelectEvent } from "../../events/pc-select.js";
import type { PcButton } from "../button/button.js";
import type { PcIconButton } from "../icon-button/icon-button.js";
import type { PcMenu } from "../menu/menu.js";
import { styles } from "./dropdown.styles.js";

setDefaultAnimation("dropdown.show", {
    keyframes: [
        { opacity: 0, transform: "scale(0.92)" },
        { opacity: 1, transform: "scale(1)" },
    ],
    options: {
        duration: 200,
        easing: "cubic-bezier(0.25, 0.8, 0.4, 1)",
    },
});

setDefaultAnimation("dropdown.hide", {
    keyframes: [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.9)" },
    ],
    options: {
        duration: 150,
        easing: "cubic-bezier(0.4, 0, 1, 1)",
    },
});

@customElement("pc-dropdown")
export class PcDropdown extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = { "pc-popup": PcPopup };

    @query(".dropdown") popup!: PcPopup;
    @query(".dropdown-trigger") trigger!: HTMLSlotElement;
    @query(".dropdown-panel") panel!: HTMLSlotElement;

    private closeWatcher!: CloseWatcher | null;

    @property({ attribute: false }) containingElement?: HTMLElement;

    @property({ type: Boolean, reflect: true }) disabled = false;

    @property({ type: Number }) distance = 0;

    @property({ type: Boolean }) hoist = false;

    @property({ type: Boolean, reflect: true }) open = false;

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

    @property({ type: Number }) skidding = 0;

    @property({
        attribute: "stay-open-on-select",
        type: Boolean,
        reflect: true,
    })
    stayOpenOnSelect = false;

    @property({ reflect: true }) sync: "width" | "height" | "both" | undefined =
        undefined;

    connectedCallback() {
        super.connectedCallback();

        if (!this.containingElement) {
            this.containingElement = this;
        }
    }

    firstUpdated() {
        this.panel.hidden = !this.open;

        if (this.open) {
            this.addOpenListeners();
            this.popup.active = true;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeOpenListeners();
        this.hide();
    }

    focusOnTrigger() {
        const trigger = this.trigger.assignedElements({ flatten: true })[0] as
            | HTMLElement
            | undefined;

        if (typeof trigger?.focus === "function") {
            trigger.focus();
        }
    }

    getMenu() {
        return this.panel
            .assignedElements({ flatten: true })
            .find((element) => element.tagName.toLowerCase() === "pc-menu") as
            | PcMenu
            | undefined;
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        if (this.open && event.key === "Escape") {
            event.stopPropagation();
            this.hide();
            this.focusOnTrigger();
        }
    };

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && this.open && !this.closeWatcher) {
            event.stopPropagation();
            this.focusOnTrigger();
            this.hide();
            return;
        }

        if (event.key === "Tab") {
            if (
                this.open &&
                document.activeElement?.tagName.toLowerCase() === "pc-menu-item"
            ) {
                event.preventDefault();
                this.hide();
                this.focusOnTrigger();
                return;
            }

            const computeClosestContaining = (
                element: Element | null | undefined,
                tagName: string,
            ): Element | null => {
                if (!element) {
                    return null;
                }

                const closest = element.closest(tagName);
                if (closest) {
                    return closest;
                }

                const rootNode = element.getRootNode();
                if (rootNode instanceof ShadowRoot) {
                    return computeClosestContaining(rootNode.host, tagName);
                }

                return null;
            };

            setTimeout(() => {
                const activeElement =
                    this.containingElement?.getRootNode() instanceof ShadowRoot
                        ? getDeepestActiveElement()
                        : document.activeElement;

                if (
                    !this.containingElement ||
                    computeClosestContaining(
                        activeElement,
                        this.containingElement.tagName.toLowerCase(),
                    ) !== this.containingElement
                ) {
                    this.hide();
                }
            });
        }
    };

    private handleDocumentMouseDown = (event: MouseEvent) => {
        const path = event.composedPath();
        if (this.containingElement && !path.includes(this.containingElement)) {
            this.hide();
        }
    };

    private handlePanelSelect = (event: PcSelectEvent) => {
        const target = event.target as HTMLElement;

        if (
            !this.stayOpenOnSelect &&
            target.tagName.toLowerCase() === "pc-menu"
        ) {
            this.hide();
            this.focusOnTrigger();
        }
    };

    handleTriggerClick() {
        if (this.open) {
            this.hide();
        } else {
            this.show();
            this.focusOnTrigger();
        }
    }

    async handleTriggerKeyDown(event: KeyboardEvent) {
        if ([" ", "Enter"].includes(event.key)) {
            event.preventDefault();
            this.handleTriggerClick();
            return;
        }

        const menu = this.getMenu();

        if (menu) {
            const menuItems = menu.getAllItems();
            const firstMenuItem = menuItems[0];
            const lastMenuItem = menuItems[menuItems.length - 1];

            if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
                event.preventDefault();

                if (!this.open) {
                    this.show();

                    await this.updateComplete;
                }

                if (menuItems.length > 0) {
                    this.updateComplete.then(() => {
                        if (event.key === "ArrowDown" || event.key === "Home") {
                            menu.setCurrentItem(firstMenuItem);
                            firstMenuItem.focus();
                        }

                        if (event.key === "ArrowUp" || event.key === "End") {
                            menu.setCurrentItem(lastMenuItem);
                            lastMenuItem.focus();
                        }
                    });
                }
            }
        }
    }

    handleTriggerKeyUp(event: KeyboardEvent) {
        if (event.key === " ") {
            event.preventDefault();
        }
    }

    handleTriggerSlotChange() {
        this.updateAccessibleTrigger();
    }

    updateAccessibleTrigger() {
        const assignedElements = this.trigger.assignedElements({
            flatten: true,
        }) as HTMLElement[];
        const accessibleTrigger = assignedElements.find(
            (element) => getTabbableBoundary(element).start,
        );
        let target: HTMLElement;

        if (accessibleTrigger) {
            switch (accessibleTrigger.tagName.toLowerCase()) {
                case "pc-button":
                case "pc-icon-button":
                    target = (accessibleTrigger as PcButton | PcIconButton)
                        .button;
                    break;

                default:
                    target = accessibleTrigger;
            }

            target.setAttribute("aria-haspopup", "true");
            target.setAttribute("aria-expanded", this.open ? "true" : "false");
        }
    }

    async show() {
        if (this.open) {
            return undefined;
        }

        this.open = true;
        return waitForEvent(this, "pc-after-show");
    }

    async hide() {
        if (!this.open) {
            return undefined;
        }

        this.open = false;
        return waitForEvent(this, "pc-after-hide");
    }

    reposition() {
        this.popup.reposition();
    }

    addOpenListeners() {
        this.panel.addEventListener("pc-select", this.handlePanelSelect);
        if ("CloseWatcher" in window) {
            this.closeWatcher?.destroy();
            this.closeWatcher = new CloseWatcher();
            this.closeWatcher.onclose = () => {
                this.hide();
                this.focusOnTrigger();
            };
        } else {
            this.panel.addEventListener("keydown", this.handleKeyDown);
        }
        document.addEventListener("keydown", this.handleDocumentKeyDown);
        document.addEventListener("mousedown", this.handleDocumentMouseDown);
    }

    removeOpenListeners() {
        if (this.panel) {
            this.panel.removeEventListener("pc-select", this.handlePanelSelect);
            this.panel.removeEventListener("keydown", this.handleKeyDown);
        }
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
        document.removeEventListener("mousedown", this.handleDocumentMouseDown);
        this.closeWatcher?.destroy();
    }

    @watch("open", { waitUntilFirstUpdate: true })
    async handleOpenChange() {
        if (this.disabled) {
            this.open = false;
            return;
        }

        this.updateAccessibleTrigger();

        if (this.open) {
            emit(this, "pc-show");
            this.addOpenListeners();

            await stopAnimations(this);
            this.panel.hidden = false;
            this.popup.active = true;
            const { keyframes, options } = getAnimation(this, "dropdown.show", {
                dir: document.documentElement.dir || "ltr",
            });
            await animateTo(this.popup.popup, keyframes, options);

            emit(this, "pc-after-show");
        } else {
            emit(this, "pc-hide");
            this.removeOpenListeners();

            await stopAnimations(this);
            const { keyframes, options } = getAnimation(this, "dropdown.hide", {
                dir: document.documentElement.dir || "ltr",
            });
            await animateTo(this.popup.popup, keyframes, options);
            this.panel.hidden = true;
            this.popup.active = false;

            emit(this, "pc-after-hide");
        }
    }

    render() {
        return html`
            <pc-popup
                part="base"
                class=${classMap({
                    "dropdown": true,
                    "dropdown-open": this.open === true,
                })}
                id="dropdown"
                placement=${this.placement}
                distance=${this.distance}
                skidding=${this.skidding}
                strategy=${this.hoist ? "fixed" : "absolute"}
                auto-size="vertical"
                auto-size-padding="10
                sync=${ifDefined(this.sync ? this.sync : undefined)}
                exportparts="popup:base__popup"
                flip
                shift
            >
                <slot
                    class="dropdown-trigger"
                    name="trigger"
                    slot="anchor"
                    part="trigger"
                    @click=${this.handleTriggerClick}
                    @keydown=${this.handleTriggerKeyDown}
                    @keyup=${this.handleTriggerKeyUp}
                    @slotchange=${this.handleTriggerSlotChange}
                ></slot>

                <div
                    aria-labelledby="dropdown"
                    aria-hidden=${this.open ? "false" : "true"}
                >
                    <slot class="dropdown-panel" part="panel"></slot>
                </div>
            </pc-popup>
        `;
    }
}
