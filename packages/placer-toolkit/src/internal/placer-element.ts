import { LitElement, unsafeCSS } from "lit";
import type { CSSResult, CSSResultGroup } from "lit";
import { property } from "lit/decorators.js";
import hostStyles from "../styles/component-styles/host.css";

declare module "lit" {
    interface PropertyDeclaration {
        default?: any;
        initial?: any;
    }
}

export class PlacerElement extends LitElement {
    /** One or more CSS files to include in the component’s shadow root. Host styles are automatically prepended. We’re using this instead of Lit’s `styles` property because we’re importing CSS files as strings and need to convert them using `unsafeCSS`. */
    static css?: CSSResult | CSSResultGroup | string | (CSSResult | string)[];

    /** Override the default `styles` property to fetch and convert string CSS files. Components can override this behavior by setting their own `static styles = []` property. */
    static get styles(): CSSResultGroup {
        const styles = Array.isArray(this.css)
            ? this.css
            : this.css
              ? [this.css]
              : [];
        return [hostStyles, ...styles].map((style) =>
            typeof style === "string" ? unsafeCSS(style) : style,
        );
    }

    private hasRecordedInitialProperties = false;
    initialReflectedProperties: Map<string, unknown> = new Map();
    internals!: ElementInternals;

    @property() lang!: string;
    @property() dir!: string;

    constructor() {
        super();

        try {
            this.internals = this.attachInternals();
        } catch {
            console.error(
                "ElementInternals are not supported in your browser. Consider using a polyfill.",
            );
        }

        this.customStates.set("pc-defined", true);

        let Self = this.constructor as typeof PlacerElement;

        for (let [property, spec] of Self.elementProperties) {
            if (
                spec.default === "inherit" &&
                spec.initial !== undefined &&
                typeof property === "string"
            ) {
                this.customStates.set(
                    `initial-${property}-${spec.initial}`,
                    true,
                );
            }
        }
    }

    attributeChangedCallback(
        name: string,
        oldValue: string | null,
        newValue: string | null,
    ) {
        if (!this.hasRecordedInitialProperties) {
            (
                this.constructor as typeof PlacerElement
            ).elementProperties.forEach((object, property) => {
                if (typeof property === "string" && object.reflect) {
                    const value = (this as Record<string, unknown>)[property];

                    if (value != null) {
                        this.initialReflectedProperties.set(property, value);
                    }
                }
            });

            this.hasRecordedInitialProperties = true;
        }

        super.attributeChangedCallback(name, oldValue, newValue);
    }

    protected willUpdate(
        changedProperties: Parameters<LitElement["willUpdate"]>[0],
    ): void {
        super.willUpdate(changedProperties);

        this.initialReflectedProperties.forEach((value, prop) => {
            if (
                changedProperties.has(prop) &&
                (this as Record<string, unknown>)[prop] == null
            ) {
                (this as Record<string, unknown>)[prop] = value;
            }
        });
    }

    protected firstUpdated(
        changedProperties: Parameters<LitElement["firstUpdated"]>[0],
    ): void {
        super.firstUpdated(changedProperties);
    }

    /** A method to set and check custom states. */
    public customStates = {
        /** Adds or removes the specified custom state. */
        set: (customState: string, active: boolean) => {
            if (!Boolean(this.internals?.states)) {
                return;
            }

            try {
                if (active) {
                    this.internals.states.add(customState);
                } else {
                    this.internals.states.delete(customState);
                }
            } catch (event) {
                if (String(event).includes("must start with '--'")) {
                    console.error(
                        "Your browser implements an outdated version of `CustomStateSet`. Consider using a polyfill.",
                    );
                } else {
                    throw event;
                }
            }
        },

        /** Determines whether or not the element currently has the specified state. */
        has: (customState: string) => {
            if (!Boolean(this.internals?.states)) {
                return false;
            }

            return this.internals.states.has(customState);
        },
    };

    /** @internal Given a native event, this function cancels it and dispatches it again from the host element using the desired event options. */
    relayNativeEvent(event: Event, eventOptions?: EventInit) {
        event.stopImmediatePropagation();

        /** @internal This triggers an error in CEM, so we need to ignore it. */
        this.dispatchEvent(
            new (event.constructor as typeof Event)(event.type, {
                ...event,
                ...eventOptions,
            }),
        );
    }
}
