// Critical: Global shim for SSR rendering. More information in global-shims.ts/global-shims.js
import "./global-shims.js";

// Components
export { default as PcAnimation } from "./components/animation/animation.js";
export { default as PcAvatar } from "./components/avatar/avatar.js";
export { default as PcBadge } from "./components/badge/badge.js";
export { default as PcButton } from "./components/button/button.js";
export { default as PcButtonGroup } from "./components/button-group/button-group.js";
export { default as PcCallout } from "./components/callout/callout.js";
export { default as PcCard } from "./components/card/card.js";
export { default as PcCheckbox } from "./components/checkbox/checkbox.js";
export { default as PcComparer } from "./components/comparer/comparer.js";
export { default as PcCopyButton } from "./components/copy-button/copy-button.js";
export { default as PcDetails } from "./components/details/details.js";
export { default as PcDialog } from "./components/dialog/dialog.js";
export { default as PcDivider } from "./components/divider/divider.js";
export { default as PcDrawer } from "./components/drawer/drawer.js";
export { default as PcDropdown } from "./components/dropdown/dropdown.js";
export { default as PcIcon } from "./components/icon/icon.js";
export { default as PcIconButton } from "./components/icon-button/icon-button.js";
export { default as PcInput } from "./components/input/input.js";
export { default as PcMenu } from "./components/menu/menu.js";
export { default as PcMenuItem } from "./components/menu-item/menu-item.js";
export { default as PcMenuLabel } from "./components/menu-label/menu-label.js";
export { default as PcOption } from "./components/option/option.js";
export { default as PcPopup } from "./components/popup/popup.js";
export { default as PcQrCode } from "./components/qr-code/qr-code.js";
export { default as PcRadio } from "./components/radio/radio.js";
export { default as PcRadioButton } from "./components/radio-button/radio-button.js";
export { default as PcRadioGroup } from "./components/radio-group/radio-group.js";
export { default as PcRating } from "./components/rating/rating.js";
export { default as PcResizeObserver } from "./components/resize-observer/resize-observer.js";
export { default as PcSelect } from "./components/select/select.js";
export { default as PcSpinner } from "./components/spinner/spinner.js";
export { default as PcSwitch } from "./components/switch/switch.js";
export { default as PcTab } from "./components/tab/tab.js";
export { default as PcTabGroup } from "./components/tab-group/tab-group.js";
export { default as PcTabPanel } from "./components/tab-panel/tab-panel.js";
export { default as PcTag } from "./components/tag/tag.js";
export { default as PcTooltip } from "./components/tooltip/tooltip.js";

// Note: Style utilities cannot be included in placer.ts/placer.js and must be imported manually

// Utilities
export * from "./utilities/animation-registry.js";
export * from "./utilities/animation.js";
export * from "./utilities/base-path.js";
export * from "./utilities/form.js";
export * from "./utilities/icon-library.js";

// Events
export * from "./events/events.js";
