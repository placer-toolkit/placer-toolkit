import type { IconLibrary } from "./library.js";

const library: IconLibrary = {
    name: "default",
    resolver: (name, iconStyle = "solid") => {
        return `https://use.fontawesome.com/releases/v6.7.2/svgs/${iconStyle}/${name}.svg`;
    },
};

export default library;
