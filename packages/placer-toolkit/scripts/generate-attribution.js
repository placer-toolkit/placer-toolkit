import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const licenseTemplateDirectory = "./licenses/templates";
const outputFile = "THIRD-PARTY-NOTICES.txt";

const requiredLicenses = [
    { file: "MIT.txt", title: "MIT License" },
    { file: "BSD-3-Clause.txt", title: "BSD-3-Clause License" },
];

console.log("🔍 Fetching dependency licenses…");

const rawJSON = execSync("pnpm licenses list --filter . --json --prod", {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "ignore"],
}).toString();
const data = JSON.parse(rawJSON);

let output = `Third‐party notices

This project incorporates components from the following third‐party projects. The full text of their respective licences is provided below.

---

`;

const allPackages = Object.values(data).flat();

allPackages.forEach((pkg) => {
    const name = pkg.name;
    const version = pkg.versions[0];
    const license = pkg.license || "Unknown";

    output += `${name} ${version}: ${license} License; copyright notice not retrievable\n`;
});

requiredLicenses.forEach(({ file, title }) => {
    const filePath = path.join(licenseTemplateDirectory, file);

    if (fs.existsSync(filePath)) {
        output += `\n---\n\n${title}:\n\n${fs.readFileSync(filePath, "utf8")}`;
    } else {
        console.warn(`⚠️ Warning: Licence file not found at ${filePath}`);
    }
});

fs.writeFileSync(outputFile, output);

console.log(
    `✅ ${outputFile} successfully generated with ${requiredLicenses.length <= 1 ? (requiredLicenses.length === 0 ? "no" : "one") : requiredLicenses.length} licence ${requiredLicenses.length === 1 ? "definition" : "definitions"}.`,
);
