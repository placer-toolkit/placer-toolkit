import { PcTag } from "./tag.component.js";

export * from "./tag.component.js";
export default PcTag;

declare global {
    interface HTMLElementTagNameMap {
        "pc-tag": PcTag;
    }
}
