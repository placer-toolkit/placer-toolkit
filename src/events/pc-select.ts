import type PcMenuItem from "../components/menu-item/menu-item.js";

export type PcSelectEvent = CustomEvent<{ item: PcMenuItem }>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-select": PcSelectEvent;
    }
}
