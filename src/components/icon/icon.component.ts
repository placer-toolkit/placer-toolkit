import {
    getIconLibrary,
    type IconLibrary,
    unwatchIcon,
    watchIcon,
} from "./library.ts";
import { LitElement, html } from "lit";
import type { CSSResultGroup, HTMLTemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { isTemplateResult } from "lit/directive-helpers.js";
import { watch } from "../../internal/watch.ts";
import { emit } from "../../internal/emit.ts";
import { styles } from "./icon.styles.ts";

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

@customElement("pc-icon")
export class PcIcon extends LitElement {
    static styles: CSSResultGroup = styles;

    private initialRender = false;

    private async resolveIcon(
        url: string,
        library?: IconLibrary
    ): Promise<SVGResult> {
        let fileData: Response;

        if (library?.spriteSheet) {
            this.svg = html`
                <svg part="svg">
                    <use part="use" href="${url}"></use>
                </svg>
            `;

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
    }

    @state() private svg: SVGElement | HTMLTemplateResult | null = null;

    @property({ reflect: true }) iconStyle?: string;

    @property() label = "";

    @property({ reflect: true }) library = "default";

    @property({ reflect: true }) name?: string;

    @property() src?: string;

    connectedCallback() {
        super.connectedCallback();
        watchIcon(this);
    }

    firstUpdated() {
        this.initialRender = true;
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
                url: library.resolver(this.name, this.iconStyle),
                fromLibrary: true,
            };
        }

        return {
            url: this.src,
            fromLibrary: false,
        };
    }

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

    @watch(["library", "iconStyle", "name", "src"])
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

        if (!this.initialRender) {
            return;
        }

        const svg = await iconResolver;

        if (svg === RETRYABLE_ERROR) {
            iconCache.delete(url);
        }

        if (url !== this.getIconSource().url) {
            return;
        }

        if (isTemplateResult(svg)) {
            this.svg = svg;

            if (library) {
                await this.updateComplete;

                const shadowSVG =
                    this.shadowRoot!.querySelector("[part='svg']")!;

                if (typeof library.mutator === "function" && shadowSVG) {
                    library.mutator(shadowSVG as SVGElement);
                }
            }

            return;
        }

        switch (svg) {
            case RETRYABLE_ERROR:
            case CACHEABLE_ERROR:
                this.svg = null;
                emit(this, "pc-error");
                break;
            default:
                this.svg = svg.cloneNode(true) as SVGElement;
                library?.mutator?.(this.svg);
                emit(this, "pc-load");
        }
    }

    render() {
        return this.svg;
    }
}
