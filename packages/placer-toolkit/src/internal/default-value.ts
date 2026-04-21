import { defaultConverter } from "lit";
import type { ReactiveElement } from "lit";

export const defaultValue =
    (propertyName = "value") =>
    (proto: ReactiveElement, key: string) => {
        const constructor = proto.constructor as typeof ReactiveElement;
        const attributeChangedCallback =
            constructor.prototype.attributeChangedCallback;

        constructor.prototype.attributeChangedCallback = function (
            this: ReactiveElement & { [name: string]: unknown },
            name,
            old,
            value,
        ) {
            const options = constructor.getPropertyOptions(propertyName);
            const attributeName =
                typeof options.attribute === "string"
                    ? options.attribute
                    : propertyName;

            if (name === attributeName) {
                const converter = options.converter || defaultConverter;
                const fromAttribute =
                    typeof converter === "function"
                        ? converter
                        : (converter?.fromAttribute ??
                          defaultConverter.fromAttribute);

                const newValue: unknown = fromAttribute!(value, options.type);

                if (this[propertyName] !== newValue) {
                    this[key] = newValue;
                }
            }

            attributeChangedCallback.call(this, name, old, value);
        };
    };
