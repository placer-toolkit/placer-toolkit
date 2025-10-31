import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PlacerElement } from "../../internal/placer-element.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import styles from "./mutation-observer.css";

/**
 * @summary The Mutation Observer component offers a thin, declarative interface to the [`MutationObserver` API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
 * @status experimental
 * @since 1.0.0-alpha.1
 *
 * @event {{ mutationList: MutationRecord[] }} pc-mutation - Emitted when a mutation occurs.
 *
 * @slot - The content to watch for mutations.
 */
@customElement("pc-mutation-observer")
export class PcMutationObserver extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;

    private mutationObserver!: MutationObserver;

    /** Watches for changes to attributes. To watch only specific attributes, separate them with a space (e.g., `attribute="class id title"`). To watch all attributes, use the `*` wildcard. */
    @property({ reflect: true }) attribute?: string;

    /** Indicates whether or not the attribute’s previous value should be recorded when monitoring changes. */
    @property({
        attribute: "attribute-old-value",
        type: Boolean,
        reflect: true,
    })
    attributeOldValue = false;

    /** Watches for changes to the character data contained within the node. */
    @property({ attribute: "character-data", type: Boolean, reflect: true })
    characterData = false;

    /** Indicates whether or not the previous value of the node’s text should be recorded. */
    @property({
        attribute: "character-data-old-value",
        type: Boolean,
        reflect: true,
    })
    characterDataOldValue = false;

    /** Watches for the addition or removal of new child nodes. */
    @property({ attribute: "child-list", type: Boolean, reflect: true })
    childList = false;

    /** Disables the mutation observer. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    connectedCallback() {
        super.connectedCallback();

        this.mutationObserver = new MutationObserver(this.handleMutation);

        if (!this.disabled) {
            this.startObserver();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.stopObserver();
    }

    private handleMutation = (mutationList: MutationRecord[]) => {
        emit(this, "pc-mutation", {
            detail: { mutationList },
        });
    };

    private startObserver() {
        const observerAttributes =
            typeof this.attribute === "string" && this.attribute.length > 0;
        const attributeFilter =
            observerAttributes && this.attribute !== "*"
                ? this.attribute?.split(" ")
                : undefined;

        try {
            this.mutationObserver.observe(this, {
                subtree: true,
                childList: this.childList,
                attributes: observerAttributes,
                attributeFilter,
                attributeOldValue: this.attributeOldValue,
                characterData: this.characterData,
                characterDataOldValue: this.characterDataOldValue,
            });
        } catch {}
    }

    private stopObserver() {
        this.mutationObserver.disconnect();
    }

    /** @internal This is an internal method. */
    @watch("disabled")
    handleDisabledChange() {
        if (this.disabled) {
            this.stopObserver();
        } else {
            this.startObserver();
        }
    }

    /** @internal This is an internal method. */
    @watch(
        [
            "attribute",
            "attribute-old-value",
            "character-data",
            "character-data-old-value",
            "child-list",
        ],
        { waitUntilFirstUpdate: true },
    )
    handleChange() {
        this.stopObserver();
        this.startObserver();
    }

    render() {
        return html`<slot></slot>`;
    }
}
