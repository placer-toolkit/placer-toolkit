import { PcAnimation } from "./animation.component.js";

export * from "./animation.component.js";
export default PcAnimation;

declare global {
    interface HTMLElementTagNameMap {
        "pc-animation": PcAnimation;
    }
}
