import checker from "license-checker";
import fs from "fs";

checker.init(
    {
        start: "./",
        customFormat: {
            name: "",
            version: "",
            license: "",
            repository: "",
        },
    },
    function (error, packages) {
        if (error) {
            console.error(error);
        } else {
            let output =
                "# Third‐party licences\n\n" +
                "In this file, you can find a summary of all licences in this repository that are used in the Placer Toolkit library and site.\n\n";

            for (const [name, info] of Object.entries(packages)) {
                if (name.startsWith("placer-toolkit")) {
                    continue;
                }

                output += `### ${name}\n\n`;
                output += `- **Licence:** ${info["license"]}\n`;
                output += `- **Repository:** ${info.repository || "_Not provided_"}\n\n`;
            }

            fs.writeFileSync("THIRD-PARTY-NOTICES.md", output);

            console.log("✅ THIRD-PARTY-NOTICES.md was successfully created.");
        }
    },
);
