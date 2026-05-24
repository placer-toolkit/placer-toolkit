// TODO: This depends on the Tree Item component. This is currently planned but not available yet.
// import type { PcTreeItem } from "../components/tree-item/tree-item.js";
//
// export class PcSelectionChangeEvent extends Event {
//     readonly detail: PcSelectionChangeEventDetail;
//
//     constructor(detail: PcSelectionChangeEventDetail) {
//         super("pc-selection-change", {
//             bubbles: true,
//             cancelable: false,
//             composed: true,
//         });
//         this.detail = detail;
//     }
// }
//
// interface PcSelectionChangeEventDetail {
//     selection: PcTreeItem[];
// }
//
// declare global {
//     interface GlobalEventHandlersEventMap {
//         "pc-selection-change": PcSelectionChangeEvent;
//     }
// }
