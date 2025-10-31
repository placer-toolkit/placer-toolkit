import type { PcDropdownItem } from "../components/dropdown-item/dropdown-item.js";

export type PcSelectEvent = CustomEvent<{ item: PcDropdownItem }>;

declare global {
    interface GlobalEventHandlersEventMap {
        "pc-select": PcSelectEvent;
    }
}
