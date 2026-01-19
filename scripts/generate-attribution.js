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
            licenseFile: "",
        },
    },
    function (error, packages) {
        if (error) {
            console.error(error);
        } else {
            let output =
                "# Third‐party licences\n\n" +
                "This project incorporates components from the following third‐party projects. " +
                "The full text of their respective licences is provided below.\n\n";

            for (const [name, info] of Object.entries(packages)) {
                if (name.startsWith("placer-toolkit")) {
                    continue;
                }

                let licenseText = null;
                const isReadme =
                    info.licenseFile &&
                    info.licenseFile.toLowerCase().includes("readme");

                if (info.licenseFile && fs.existsSync(info.licenseFile)) {
                    const rawText = fs.readFileSync(info.licenseFile, "utf8");
                    if (
                        !isReadme ||
                        rawText.toLowerCase().includes("copyright")
                    ) {
                        licenseText = rawText;
                    }
                }

                output += `### ${name}\n\n`;
                output += `- **Licence:** ${info["license"]}\n`;
                output += `- **Repository:** ${info.repository || "_Not provided_"}\n`;

                if (licenseText) {
                    output += `<details>\n  <summary>View full ${info["license"]} licence text</summary>\n`;
                    output += `  ${licenseText.trim()}\n`;
                    output += `</details>\n\n`;
                } else {
                    output += `- ⚠️ **Licence text not found:** Please manually verify at the repository link above.\n\n`;
                }
            }

            fs.writeFileSync("THIRD-PARTY-NOTICES.md", output);
            console.log("✅ THIRD-PARTY-NOTICES.md was successfully created.");
        }
    },
);
