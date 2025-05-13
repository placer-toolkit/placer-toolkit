import { CSSResultGroup, LitElement, html } from "lit";
import {
    customElement,
    eventOptions,
    property,
    query,
    state,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { scrollIntoView } from "../../internal/scroll.ts";
import { watch } from "../../internal/watch.ts";
import { emit } from "../../internal/emit.ts";
import { PcIconButton } from "../icon-button/icon-button.ts";
import { PcResizeObserver } from "../resize-observer/resize-observer.ts";
import type { PcTab } from "../tab/tab.ts";
import type { PcTabPanel } from "../tab-panel/tab-panel.ts";
import { styles } from "./tab-group.styles.ts";
import "../../internal/scrollend-polyfill.ts";

@customElement("pc-tab-group")
export class PcTabGroup extends LitElement {
    static styles: CSSResultGroup = styles;
    static dependencies = {
        "pc-icon-button": PcIconButton,
        "pc-resize-observer": PcResizeObserver,
    };

    private activeTab?: PcTab;
    private mutationObserver!: MutationObserver;
    private resizeObserver!: ResizeObserver;
    private tabs: PcTab[] = [];
    private focusableTabs: PcTab[] = [];
    private panels: PcTabPanel[] = [];

    @query(".tab-group") tabGroup!: HTMLElement;
    @query(".tab-group-body") body!: HTMLSlotElement;
    @query(".tab-group-navigation") navigation!: HTMLElement;
    @query(".tab-group-indicator") indicator!: HTMLElement;

    @state() private hasScrollControls = false;

    @state() private shouldHideScrollStartButton = false;
    @state() private shouldHideScrollEndButton = false;

    @property() activation: "auto" | "manual" = "auto";

    @property({ attribute: "fixed-scroll-controls", type: Boolean })
    fixedScrollControls = false;

    @property({ attribute: "no-scroll-controls", type: Boolean })
    noScrollControls = false;

    @property() placement: "top" | "bottom" | "start" | "end" = "top";

    connectedCallback() {
        const whenAllDefined = Promise.all([
            customElements.whenDefined("pc-tab"),
            customElements.whenDefined("pc-tab-panel"),
        ]);

        super.connectedCallback();

        this.resizeObserver = new ResizeObserver(() => {
            this.repositionIndicator();
            this.updateScrollControls();
        });

        this.mutationObserver = new MutationObserver((mutations) => {
            const instanceMutations = mutations.filter(({ target }) => {
                if (target === this) {
                    return true;
                }

                if ((target as HTMLElement).closest("pc-tab-group") !== this) {
                    return false;
                }

                const tagName = (target as HTMLElement).tagName.toLowerCase();
                return tagName === "pc-tab" || tagName === "pc-tab-panel";
            });

            if (instanceMutations.length === 0) {
                return;
            }

            if (
                instanceMutations.some(
                    (mutation) =>
                        !["aria-labelledby", "aria-controls"].includes(
                            mutation.attributeName!
                        )
                )
            ) {
                setTimeout(() => this.setAriaLabels());
            }

            if (
                instanceMutations.some(
                    (mutation) => mutation.attributeName === "disabled"
                )
            ) {
                this.syncTabsAndPanels();
            } else if (
                instanceMutations.some(
                    (mutation) => mutation.attributeName === "active"
                )
            ) {
                const tabs = instanceMutations
                    .filter(
                        (mutation) =>
                            mutation.attributeName === "active" &&
                            (
                                mutation.target as HTMLElement
                            ).tagName.toLowerCase() === "pc-tab"
                    )
                    .map((mutation) => mutation.target as PcTab);
                const newActiveTab = tabs.find((tab) => tab.active);

                if (newActiveTab) {
                    this.setActiveTab(newActiveTab);
                }
            }
        });

        this.updateComplete.then(() => {
            this.syncTabsAndPanels();

            this.mutationObserver.observe(this, {
                attributes: true,
                attributeFilter: ["active", "disabled", "name", "panel"],
                childList: true,
                subtree: true,
            });

            this.resizeObserver.observe(this.navigation);

            whenAllDefined.then(() => {
                const intersectionObserver = new IntersectionObserver(
                    (entries, observer) => {
                        if (entries[0].intersectionRatio > 0) {
                            this.setAriaLabels();
                            this.setActiveTab(
                                this.getActiveTab() ?? this.tabs[0],
                                { emitEvents: false }
                            );
                            observer.unobserve(entries[0].target);
                        }
                    }
                );
                intersectionObserver.observe(this.tabGroup);
            });
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.mutationObserver?.disconnect();

        if (this.navigation) {
            this.resizeObserver?.unobserve(this.navigation);
        }
    }

    private getAllTabs() {
        const slot = this.shadowRoot!.querySelector<HTMLSlotElement>(
            'slot[name="navigation"]'
        )!;

        return slot.assignedElements() as PcTab[];
    }

    private getAllPanels() {
        return [...this.body.assignedElements()].filter(
            (element) => element.tagName.toLowerCase() === "pc-tab-panel"
        ) as [PcTabPanel];
    }

    private getActiveTab() {
        return this.tabs.find((element) => element.active);
    }

    private handleClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const tab = target.closest("pc-tab");
        const tabGroup = tab?.closest("pc-tab-group");

        if (tabGroup !== this) {
            return;
        }

        if (tab !== null) {
            this.setActiveTab(tab as PcTab, { scrollBehavior: "smooth" });
        }
    }

    private handleKeyDown(event: KeyboardEvent) {
        const target = event.target as HTMLElement;
        const tab = target.closest("pc-tab");
        const tabGroup = tab?.closest("pc-tab-group");

        if (tabGroup !== this) {
            return;
        }

        if (["Enter", " "].includes(event.key)) {
            if (tab !== null) {
                this.setActiveTab(tab as PcTab, { scrollBehavior: "smooth" });
                event.preventDefault();
            }
        }

        if (
            [
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "Home",
                "End",
            ].includes(event.key)
        ) {
            const activeElement = this.tabs.find((tab) =>
                tab.matches(":focus")
            );
            const isRTL = document.documentElement.dir === "rtl";
            let nextTab: null | PcTab = null;

            if (activeElement?.tagName.toLowerCase() === "pc-tab") {
                if (event.key === "Home") {
                    nextTab = this.focusableTabs[0];
                } else if (event.key === "End") {
                    nextTab = this.focusableTabs[this.focusableTabs.length - 1];
                } else if (
                    (["top", "bottom"].includes(this.placement) &&
                        event.key === (isRTL ? "ArrowRight" : "ArrowLeft")) ||
                    (["start", "end"].includes(this.placement) &&
                        event.key === "ArrowUp")
                ) {
                    const currentIndex = this.tabs.findIndex(
                        (element) => element === activeElement
                    );
                    nextTab = this.findNextFocusableTab(
                        currentIndex,
                        "backward"
                    );
                } else if (
                    (["top", "bottom"].includes(this.placement) &&
                        event.key === (isRTL ? "ArrowLeft" : "ArrowRight")) ||
                    (["start", "end"].includes(this.placement) &&
                        event.key === "ArrowDown")
                ) {
                    const currentIndex = this.tabs.findIndex(
                        (element) => element === activeElement
                    );
                    nextTab = this.findNextFocusableTab(
                        currentIndex,
                        "forward"
                    );
                }

                if (!nextTab) {
                    return;
                }

                nextTab.tabIndex = 0;
                nextTab.focus({ preventScroll: true });

                if (this.activation === "auto") {
                    this.setActiveTab(nextTab, { scrollBehavior: "smooth" });
                } else {
                    this.tabs.forEach((tabElement) => {
                        tabElement.tabIndex = tabElement === nextTab ? 0 : -1;
                    });
                }

                if (["top", "bottom"].includes(this.placement)) {
                    scrollIntoView(nextTab, this.navigation, "horizontal");
                }

                event.preventDefault();
            }
        }
    }

    private handleScrollToStart() {
        this.navigation.scroll({
            left:
                document.documentElement.dir === "rtl"
                    ? this.navigation.scrollLeft + this.navigation.clientWidth
                    : this.navigation.scrollLeft - this.navigation.clientWidth,
            behavior: "smooth",
        });
    }

    private handleScrollToEnd() {
        this.navigation.scroll({
            left:
                document.documentElement.dir === "rtl"
                    ? this.navigation.scrollLeft - this.navigation.clientWidth
                    : this.navigation.scrollLeft + this.navigation.clientWidth,
            behavior: "smooth",
        });
    }

    private setActiveTab(
        tab: PcTab,
        options?: { emitEvents?: boolean; scrollBehavior?: "auto" | "smooth" }
    ) {
        options = {
            emitEvents: true,
            scrollBehavior: "auto",
            ...options,
        };

        if (tab !== this.activeTab && !tab.disabled) {
            const previousTab = this.activeTab;
            this.activeTab = tab;

            this.tabs.forEach((element) => {
                element.active = element === this.activeTab;
                element.tabIndex = element === this.activeTab ? 0 : -1;
            });
            this.panels.forEach(
                (element) =>
                    (element.active = element.name === this.activeTab?.panel)
            );
            this.syncIndicator();

            if (["top", "bottom"].includes(this.placement)) {
                scrollIntoView(
                    this.activeTab,
                    this.navigation,
                    "horizontal",
                    options.scrollBehavior
                );
            }

            if (options.emitEvents) {
                if (previousTab) {
                    emit(this, "pc-tab-hide", {
                        detail: { name: previousTab.panel },
                    });
                }

                emit(this, "pc-tab-show", {
                    detail: { name: this.activeTab.panel },
                });
            }
        }
    }

    private setAriaLabels() {
        this.tabs.forEach((tab) => {
            const panel = this.panels.find(
                (element) => element.name === tab.panel
            );
            if (panel) {
                tab.setAttribute("aria-controls", panel.getAttribute("id")!);
                panel.setAttribute("aria-labelledby", tab.getAttribute("id")!);
            }
        });
    }

    private repositionIndicator() {
        const currentTab = this.getActiveTab();

        if (!currentTab) {
            return;
        }

        const width = currentTab.clientWidth;
        const height = currentTab.clientHeight;
        const isRTL = document.documentElement.dir === "rtl";

        const allTabs = this.getAllTabs();
        const precedingTabs = allTabs.slice(0, allTabs.indexOf(currentTab));
        const offset = precedingTabs.reduce(
            (previous, current) => ({
                left: previous.left + current.clientWidth,
                top: previous.top + current.clientHeight,
            }),
            { left: 0, top: 0 }
        );

        switch (this.placement) {
            case "top":
            case "bottom":
                this.indicator.style.width = `${width}px`;
                this.indicator.style.height = "auto";
                this.indicator.style.translate = isRTL
                    ? `${-1 * offset.left}px`
                    : `${offset.left}px`;
                break;

            case "start":
            case "end":
                this.indicator.style.width = "auto";
                this.indicator.style.height = `${height}px`;
                this.indicator.style.translate = `0 ${offset.top}px`;
                break;
        }
    }

    private syncTabsAndPanels() {
        this.tabs = this.getAllTabs();
        this.focusableTabs = this.tabs.filter((el) => !el.disabled);

        this.panels = this.getAllPanels();
        this.syncIndicator();

        this.updateComplete.then(() => this.updateScrollControls());
    }

    private findNextFocusableTab(
        currentIndex: number,
        direction: "forward" | "backward"
    ) {
        let nextTab = null;
        const iterator = direction === "forward" ? 1 : -1;
        let nextIndex = currentIndex + iterator;

        while (currentIndex < this.tabs.length) {
            nextTab = this.tabs[nextIndex] || null;

            if (nextTab === null) {
                if (direction === "forward") {
                    nextTab = this.focusableTabs[0];
                } else {
                    nextTab = this.focusableTabs[this.focusableTabs.length - 1];
                }
                break;
            }

            if (!nextTab.disabled) {
                break;
            }

            nextIndex += iterator;
        }

        return nextTab;
    }

    private scrollOffset = 1;

    @eventOptions({ passive: true })
    private updateScrollButtons() {
        if (this.hasScrollControls && !this.fixedScrollControls) {
            this.shouldHideScrollStartButton =
                this.scrollFromStart() <= this.scrollOffset;
            this.shouldHideScrollEndButton = this.isScrolledToEnd();
        }
    }

    private isScrolledToEnd() {
        return (
            this.scrollFromStart() + this.navigation.clientWidth >=
            this.navigation.scrollWidth - this.scrollOffset
        );
    }

    private scrollFromStart() {
        return document.documentElement.dir === "rtl"
            ? -this.navigation.scrollLeft
            : this.navigation.scrollLeft;
    }

    @watch("noScrollControls", { waitUntilFirstUpdate: true })
    updateScrollControls() {
        if (this.noScrollControls) {
            this.hasScrollControls = false;
        } else {
            this.hasScrollControls =
                ["top", "bottom"].includes(this.placement) &&
                this.navigation.scrollWidth > this.navigation.clientWidth + 1;
        }

        this.updateScrollButtons();
    }

    @watch("placement", { waitUntilFirstUpdate: true })
    syncIndicator() {
        const tab = this.getActiveTab();

        if (tab) {
            this.indicator.style.display = "block";
            this.repositionIndicator();
        } else {
            this.indicator.style.display = "none";
        }
    }

    show(panel: string) {
        const tab = this.tabs.find((el) => el.panel === panel);

        if (tab) {
            this.setActiveTab(tab, { scrollBehavior: "smooth" });
        }
    }

    render() {
        const isRTL = document.documentElement.dir === "rtl";

        return html`
            <div
                part="base"
                class=${classMap({
                    "tab-group": true,
                    "tab-group-top": this.placement === "top",
                    "tab-group-bottom": this.placement === "bottom",
                    "tab-group-start": this.placement === "start",
                    "tab-group-end": this.placement === "end",
                    "tab-group-rtl": isRTL === true,
                    "tab-group-has-scroll-controls": this.hasScrollControls,
                })}
                @click=${this.handleClick}
                @keydown=${this.handleKeyDown}
            >
                <div class="tab-group-navigation-container" part="navigation">
                    ${this.hasScrollControls
                        ? html`
                              <pc-icon-button
                                  part="scroll-button scroll-button-start"
                                  class=${classMap({
                                      "tab-group-scroll-button": true,
                                      "tab-group-scroll-button-start": true,
                                      "tab-group-scroll-button-start-hidden":
                                          this.shouldHideScrollStartButton,
                                  })}
                                  library="default"
                                  iconStyle="solid"
                                  name=${isRTL
                                      ? "chevron-right"
                                      : "chevron-left"}
                                  tabindex="-1"
                                  aria-hidden="true"
                                  label="Scroll left"
                                  @click=${this.handleScrollToStart}
                                  exportparts="base:scroll-button-base"
                              ></pc-icon-button>
                          `
                        : ""}

                    <div
                        class="tab-group-navigation"
                        @scrollend=${this.updateScrollButtons}
                    >
                        <div part="tabs" class="tab-group-tabs" role="tablist">
                            <div
                                class="tab-group-indicator"
                                part="active-tab-indicator"
                            ></div>
                            <pc-resize-observer
                                @pc-resize=${this.syncIndicator}
                            >
                                <slot
                                    name="navigation"
                                    @slotchange=${this.syncTabsAndPanels}
                                ></slot>
                            </pc-resize-observer>
                        </div>
                    </div>

                    ${this.hasScrollControls
                        ? html`
                              <pc-icon-button
                                  part="scroll-button scroll-button-end"
                                  class=${classMap({
                                      "tab-group-scroll-button": true,
                                      "tab-group-scroll-button-end": true,
                                      "tab-group-scroll-button-end-hidden":
                                          this.shouldHideScrollEndButton,
                                  })}
                                  library="default"
                                  iconStyle="solid"
                                  name=${isRTL
                                      ? "chevron-left"
                                      : "chevron-right"}
                                  tabindex="-1"
                                  aria-hidden="true"
                                  label="Scroll right"
                                  @click=${this.handleScrollToEnd}
                                  exportparts="base:scroll-button-base"
                              ></pc-icon-button>
                          `
                        : ""}
                </div>

                <slot
                    class="tab-group-body"
                    part="body"
                    @slotchange=${this.syncTabsAndPanels}
                ></slot>
            </div>
        `;
    }
}
