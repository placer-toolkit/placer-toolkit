import defaultLibrary from "./library.default.ts";
import type PcIcon from "./icon.ts";

export type IconLibraryResolver = (name: string, iconStyle?: string) => string;
export type IconLibraryMutator = (svg: SVGElement) => void;

export interface IconLibrary {
    name: string;
    resolver: IconLibraryResolver;
    mutator?: IconLibraryMutator;
    spriteSheet?: boolean;
}

let registry: IconLibrary[] = [defaultLibrary];
let watchedIcons: PcIcon[] = [];

export function watchIcon(icon: PcIcon) {
    watchedIcons.push(icon);
}

export function unwatchIcon(icon: PcIcon) {
    watchedIcons = watchedIcons.filter((element) => element !== icon);
}

export function getIconLibrary(name?: string) {
    return (
        registry.find((library) => library.name === name) ||
        registry.find((library) => library.name === "default")
    );
}

export function registerIconLibrary(
    name: string,
    options: Omit<IconLibrary, "name">
) {
    unregisterIconLibrary(name);
    registry.push({
        name,
        resolver: options.resolver,
        mutator: options.mutator,
        spriteSheet: options.spriteSheet,
    });

    watchedIcons.forEach((icon) => {
        if (icon.library === name) {
            icon.setIcon();
        }
    });
}

export function unregisterIconLibrary(name: string) {
    registry = registry.filter((library) => library.name !== name);
}
