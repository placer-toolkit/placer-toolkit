// TODO: This depends on the Carousel Item component. This is currently planned but not available yet.
// import type { PcCarouselItem } from "../components/carousel-item/carousel-item.js";
//
// export class PcSlideChangeEvent extends Event {
//     readonly detail: PcSlideChangeEventDetails;
//
//     constructor(detail: PcSlideChangeEventDetails) {
//         super("pc-slide-change", {
//             bubbles: true,
//             cancelable: false,
//             composed: true,
//         });
//         this.detail = detail;
//     }
// }
//
// interface PcSlideChangeEventDetails {
//     index: number;
//     slide: PcCarouselItem;
// }
//
// declare global {
//     interface GlobalEventHandlersEventMap {
//         "pc-slide-change": PcSlideChangeEvent;
//     }
// }
