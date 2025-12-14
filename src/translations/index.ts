import { LitElement } from "lit";
import type { ReactiveController, ReactiveControllerHost } from "lit";

export type FunctionParams<T> = T extends (...args: infer U) => string ? U : [];

export interface Translation {
    $code: string;
    $name: string;
    $dir: "ltr" | "rtl";
}

export interface DefaultTranslation extends Translation {
    [key: string]: any;
}

export interface ExistsOptions {
    language: string;
    includeFallback: boolean;
}

const connectedElements = new Set<HTMLElement>();
const translations: Map<string, Translation> = new Map();

let fallback: Translation;

let documentDirection = "ltr";
let documentLanguage = "en";

const isClient =
    typeof MutationObserver !== "undefined" &&
    typeof document !== "undefined" &&
    typeof document.documentElement !== "undefined";

if (isClient) {
    const documentElementObserver = new MutationObserver(update);

    documentDirection = document.documentElement.dir || "ltr";
    documentLanguage = document.documentElement.lang || navigator.language;

    documentElementObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir", "lang"],
    });
}

/** Registers one or more translations. */
export function registerTranslation(...translation: Translation[]) {
    translation.map((t) => {
        const code = t.$code.toLowerCase();

        if (translations.has(code)) {
            translations.set(code, { ...translations.get(code), ...t });
        } else {
            translations.set(code, t);
        }

        if (!fallback) {
            fallback = t;
        }
    });

    update();
}

/** Updates all localised elements that are currently connected. */
export function update() {
    if (isClient) {
        documentDirection = document.documentElement.dir || "ltr";
        documentLanguage = document.documentElement.lang || navigator.language;
    }

    [...connectedElements.keys()].map((element: HTMLElement) => {
        if (typeof (element as LitElement).requestUpdate === "function") {
            (element as LitElement).requestUpdate();
        }
    });
}

/**
 * To use this reactive controller, import the class and instantiate it in a custom element constructor:
 *
 * ```typescript
 * private localize = new LocalizeController(this);
 * ```
 *
 * This will add the element to the set and make it respond to changes to the `dir` and `lang` attributes automatically.
 * To make it respond to changes to its own dir|lang properties, make it a property:
 *
 * ```typescript
 * @property() dir: string;
 * @property() lang: string;
 * ```
 *
 * To use a translation method, call it like this:
 *
 * ```typescript
 * ${this.localize.term("key_of_localised_term")}
 * ${this.localize.date("2025-05-13")}
 * ${this.localize.number(1000000)}
 * ```
 */
export class LocalizeController<
    UserTranslation extends Translation = DefaultTranslation,
> implements ReactiveController
{
    host: ReactiveControllerHost & HTMLElement;

    constructor(host: ReactiveControllerHost & HTMLElement) {
        this.host = host;
        this.host.addController(this);
    }

    hostConnected() {
        connectedElements.add(this.host);
    }

    hostDisconnected() {
        connectedElements.delete(this.host);
    }

    /** Gets the host element’s direction as determined by the `dir` attribute. The returned value is lowercase. */
    dir() {
        return `${this.host.dir || documentDirection}`.toLowerCase();
    }

    /** Gets the host element’s language as determined by the `lang` attribute. The returned value is lowercase. */
    lang() {
        return `${this.host.lang || documentLanguage}`.toLowerCase();
    }

    private getTranslationData(lang: string) {
        const locale = new Intl.Locale(lang.replace(/_/g, "-"));
        const language = locale?.language.toLowerCase();
        const region = locale?.region?.toLowerCase() ?? "";
        const primary = <UserTranslation>(
            translations.get(`${language}-${region}`)
        );
        const secondary = <UserTranslation>translations.get(language);

        return { locale, language, region, primary, secondary };
    }

    /** Determines if the specified term exists, optionally checking the fallback translation. */
    exists<K extends keyof UserTranslation>(
        key: K,
        options: Partial<ExistsOptions>,
    ): boolean {
        const { primary, secondary } = this.getTranslationData(
            options.language ?? this.lang(),
        );

        options = {
            includeFallback: false,
            ...options,
        };

        if (
            (primary && primary[key]) ||
            (secondary && secondary[key]) ||
            (options.includeFallback &&
                fallback &&
                fallback[key as keyof Translation])
        ) {
            return true;
        }

        return false;
    }

    /** Outputs a translated term. */
    term<K extends keyof UserTranslation>(
        key: K,
        ...args: FunctionParams<UserTranslation[K]>
    ): string {
        const { primary, secondary } = this.getTranslationData(this.lang());
        let term: any;

        if (primary && primary[key]) {
            term = primary[key];
        } else if (secondary && secondary[key]) {
            term = secondary[key];
        } else if (fallback && fallback[key as keyof Translation]) {
            term = fallback[key as keyof Translation];
        } else {
            console.error(`No translation was found for “${String(key)}”.`);
            return String(key);
        }

        if (typeof term === "function") {
            return term(...args) as string;
        }

        return term;
    }

    /** Outputs a localised date in the specified format. */
    date(
        dateToFormat: Date | string,
        options?: Intl.DateTimeFormatOptions,
    ): string {
        dateToFormat = new Date(dateToFormat);
        return new Intl.DateTimeFormat(this.lang(), options).format(
            dateToFormat,
        );
    }

    /** Outputs a localised number in the specified format. */
    number(
        numberToFormat: number | string,
        options?: Intl.NumberFormatOptions,
    ): string {
        numberToFormat = Number(numberToFormat);
        return isNaN(numberToFormat)
            ? ""
            : new Intl.NumberFormat(this.lang(), options).format(
                  numberToFormat,
              );
    }

    /** Outputs a localised time in relative format. */
    relativeTime(
        value: number,
        unit: Intl.RelativeTimeFormatUnit,
        options?: Intl.RelativeTimeFormatOptions,
    ): string {
        return new Intl.RelativeTimeFormat(this.lang(), options).format(
            value,
            unit,
        );
    }
}
