import { PcRating } from "./rating.component.js";

export * from "./rating.component.js";
export default PcRating;

declare global {
    interface HTMLElementTagNameMap {
        "pc-rating": PcRating;
    }
}
