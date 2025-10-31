# Placer Style Guide violations

This document outlines the mandatory consequences for failing to adhere to the [Placer Style Guide](https://github.com/placer-toolkit/placer-style-guide). Compliance with the style guide is an **absolute requirement** for all content contributions (code, documentation and communications) and is acknowledged by contributors through the PR checklist.

Failure to meet these standards will result in the immediate closure of the PR, as there are no exceptions to the Placer Style Guide’s mandatory, absolute nature.

## 🗂️ Violation classifications

Violations are strictly categorised based on their impact on typographic purity, SI convention adherence and overall content structure.

### 🚨 Major violations

A major violation is defined as a failure to adhere to the fundamental typographical, mathematical or structural standards of the Placer Style Guide.

| Violation type         | Examples                                                                                                                                                                                                      |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SI number formatting   | Using a full stop (`.`) instead of a comma (`,`) or failing to use the narrow non‐breaking space (` `, U+202F) as a thousand separator or between a number and its unit (e.g., 1,234.56 instead of 1 234,56). |
| Quotes and apostrophes | Using straight quotes (`""`, `''`) or the apostrophe (`'`) in place of the required smart quotes (`“”`, `‘’`) or the correct closing single smart quote (`’`) for apostrophes.                                |
| Voice and structure    | Consistent use of the passive voice when the active voice is mandated or failing to address the user directly (“you”).                                                                                        |
| Capitalisation         | Incorrect Title Case and Sentence case usage for major headings or product names (e.g., Placer Toolkit).                                                                                                      |

### ⚠️ Minor violations

A minor violation is defined as an isolated or less critical deviation from the Placer Style Guide that affects minor formatting or consistency.

| Violation type       | Examples                                                                                                                                                           |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typographical purity | Using the simple hyphen‐minus (`-`) in place of the correct Unicode character for the true hyphen (`‐`), en‐dash (`–`), em‐dash (`—`) or mathematical minus (`−`). |
| Punctuation          | Failing to use the single ellipsis character (`…`) in place of three full stops (`...`).                                                                           |
| Lists/UI             | Failing to ensure parallelism in a list or incorrect bolding of a minor UI element.                                                                                |

## ✅ Mandatory consequences

The severity of the consequences ensures **absolute, uniform quality** and reinforces the need for self‐correction before submission.

| Violation level | Threshold      | Action                                                                                       | Implication                                                                                                                                                                                   |
| :-------------- | :------------- | :------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Major           | ≥ 1 instance   | PR is immediately closed.                                                                    | Any single failure on a core standard (like SI formatting or smart quotes) results in automatic rejection. The author must correct all errors, perform a new self‐review and create a new PR. |
| Minor           | > 30 instances | PR is immediately closed.                                                                    | Too many small errors demonstrate a lack of commitment to the Placer Style Guide, resulting in automatic rejection.                                                                           |
| Minor           | < 30 instances | PR not closed, but strong enforcement to guide author to prevent these issues in the future. | The PR will only be merged by the reviewer if the author fixes all the violations suggested by the reviewer. The author must promise that errors won’t happen as often in the future.         |
