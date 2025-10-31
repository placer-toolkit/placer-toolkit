import { html } from "lit";
import type { HTMLTemplateResult, PropertyValues } from "lit";
import { PlacerElement } from "../../internal/placer-element.js";
import { getIconLibrary, unwatchIcon, watchIcon } from "./library.js";
import type { IconLibrary } from "./library.js";
import { customElement, property, state } from "lit/decorators.js";
import { watch } from "../../internal/watch.js";
import { emit } from "../../internal/emit.js";
import styles from "./icon.css";

const CACHEABLE_ERROR = Symbol();
const RETRYABLE_ERROR = Symbol();
type SVGResult =
    | HTMLTemplateResult
    | SVGSVGElement
    | typeof RETRYABLE_ERROR
    | typeof CACHEABLE_ERROR;

let parser: DOMParser;
const iconCache = new Map<string, Promise<SVGResult>>();

interface IconSource {
    url?: string;
    fromLibrary: boolean;
}

/**
 * @summary Icons are visual symbols that represent actions, objects or ideas.
 * @status experimental
 * @since 0.1.0
 *
 * @event pc-load - Emitted when the icon has loaded. When using `spriteSheet: true`, this will not emit.
 * @event pc-error - Emitted when the icon fails to load due to an error. When using `spriteSheet: true`, this will not emit.
 *
 * @csspart svg - The component’s internal SVG element.
 * @csspart use - The `<use>` element generated when using `spriteSheet: true`.
 *
 * @cssproperty --fa-primary-color: currentColor - The primary colour for the primary layer in duotone icons.
 * @cssproperty --fa-secondary-color: currentColor - The secondary colour for the secondary layer in duotone icons.
 * @cssproperty --fa-primary-opacity: 1 - The primary opacity for the primary layer in duotone icons.
 * @cssproperty --fa-secondary-opacity: 0.4 - The secondary opacity for the secondary layer in duotone icons.
 */
@customElement("pc-icon")
export class PcIcon extends PlacerElement {
    /** @internal This is an internal static property. */
    static css = styles;

    @state() private svg: SVGElement | HTMLTemplateResult | null = null;

    /** The name of the icon to render. Available names depend on the icon library being used. */
    @property({ reflect: true }) name?: string;

    /** The icon style to use for the icon. If not configured, this only works for the default icon library. */
    @property({ attribute: "icon-style", reflect: true }) iconStyle = "solid";

    /** Sets the width of the icon to match the cropped SVG viewBox. This operates like the Font Awesome `fa-width-auto` class. */
    @property({ attribute: "auto-width", type: Boolean, reflect: true })
    autoWidth = false;

    /** Swaps the opacity of duotone icons. Has no effect on custom icon libraries. */
    @property({ attribute: "swap-opacity", type: Boolean, reflect: true })
    swapOpacity = false;

    /** The external URL of an SVG file. Make sure you trust the content you are included, as it will be executed as code and can result in XSS attacks. */
    @property() src?: string;

    /** A label to include for assistive devices. If omitted, the icon will be considered presentational and ignored by assistive devices. */
    @property() label = "";

    /** The name of a registered icon library. */
    @property({ reflect: true }) library = "default";

    connectedCallback() {
        super.connectedCallback();
        watchIcon(this);
    }

    firstUpdated(changedProperties: PropertyValues<this>) {
        super.firstUpdated(changedProperties);
        this.setIcon();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        unwatchIcon(this);
    }

    private getIconSource(): IconSource {
        const library = getIconLibrary(this.library);
        if (this.name && library) {
            return {
                url: library.resolver(
                    this.name,
                    this.iconStyle,
                    this.autoWidth,
                ),
                fromLibrary: true,
            };
        }

        return {
            url: this.src,
            fromLibrary: false,
        };
    }

    /** Given a URL, this function returns the resulting SVG element or an appropriate error icon. */
    private resolveIcon = async (
        url: string,
        library?: IconLibrary,
    ): Promise<SVGResult> => {
        let fileData: Response;

        if (library?.spriteSheet) {
            if (!this.hasUpdated) {
                await this.updateComplete;
            }

            this.svg = html`
                <svg part="svg">
                    <use part="use" href=${url}></use>
                </svg>
            `;

            await this.updateComplete;

            const svg =
                this.shadowRoot!.querySelector<SVGElement>('[part="svg"]')!;

            if (typeof library.mutator === "function") {
                library.mutator(svg, this);
            }

            return this.svg;
        }

        try {
            fileData = await fetch(url, { mode: "cors" });

            if (!fileData.ok) {
                return fileData.status === 410
                    ? CACHEABLE_ERROR
                    : RETRYABLE_ERROR;
            }
        } catch {
            return RETRYABLE_ERROR;
        }

        try {
            const div = document.createElement("div");
            div.innerHTML = await fileData.text();

            const svg = div.firstElementChild;

            if (svg?.tagName?.toLowerCase() !== "svg") {
                return CACHEABLE_ERROR;
            }

            if (!parser) {
                parser = new DOMParser();
            }

            const doc = parser.parseFromString(svg.outerHTML, "text/html");

            const svgElement = doc.body.querySelector("svg");

            if (!svgElement) {
                return CACHEABLE_ERROR;
            }

            svgElement.part.add("svg");
            return document.adoptNode(svgElement);
        } catch {
            return CACHEABLE_ERROR;
        }
    };

    /** @internal This is an internal method. */
    @watch("label")
    handleLabelChange() {
        const hasLabel =
            typeof this.label === "string" && this.label.length > 0;

        if (hasLabel) {
            this.setAttribute("role", "img");
            this.setAttribute("aria-label", this.label);
            this.removeAttribute("aria-hidden");
        } else {
            this.removeAttribute("role");
            this.removeAttribute("aria-label");
            this.setAttribute("aria-hidden", "true");
        }
    }

    /** @internal This is an internal method. */
    @watch(["library", "iconStyle", "name", "src", "autoWidth", "swapOpacity"])
    async setIcon() {
        const { url, fromLibrary } = this.getIconSource();
        const library = fromLibrary ? getIconLibrary(this.library) : undefined;

        if (!url) {
            this.svg = null;
            return;
        }

        let iconResolver = iconCache.get(url);

        if (!iconResolver) {
            iconResolver = this.resolveIcon(url, library);
            iconCache.set(url, iconResolver);
        }

        const svg = await iconResolver;

        if (svg === RETRYABLE_ERROR) {
            iconCache.delete(url);
        }

        if (url !== this.getIconSource().url) {
            return;
        }

        switch (svg) {
            case RETRYABLE_ERROR:
            case CACHEABLE_ERROR:
                this.svg = null;
                emit(this, "pc-error");
                break;
            default:
                this.svg = (svg as SVGElement).cloneNode(true) as SVGElement;
                library?.mutator?.(this.svg, this);
                emit(this, "pc-load");
        }
    }

    updated(changedProperties: PropertyValues<this>) {
        super.updated(changedProperties);

        const library = getIconLibrary(this.library);
        const svg = this.shadowRoot?.querySelector("svg");

        if (svg) {
            library?.mutator?.(svg, this);
        }
    }

    render() {
        if (this.hasUpdated) {
            return this.svg;
        }

        return html`
            <svg part="svg" width="16" height="16" fill="currentColor"></svg>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pc-icon": PcIcon;
    }
}
