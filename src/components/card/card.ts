import { PcCard } from "./card.component.js";

export * from "./card.component.js";
export default PcCard;

declare global {
    interface HTMLElementTagNameMap {
        "pc-card": PcCard;
    }
}
