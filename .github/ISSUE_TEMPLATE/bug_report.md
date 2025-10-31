---
name: Bug report 🐛
about: Create a bug report to help us fix a demonstrable problem in Placer Toolkit.
title: ""
labels: bug
assignees: ""
---

### 📝 Describe the bug

<!-- A bug is a demonstrable problem caused by some code in Placer Toolkit. Please provide a clear and concise description of what the bug is. -->

### 🔢 Steps to reproduce

<!-- We need steps to reproduce the bug you found in Placer Toolkit. Please describe it, similar to the example below. -->

1. Create an HTML form containing a checkbox with a `checked` attribute.

    ```html
    <form id="example-form">
        <pc-checkbox value="some-option" name="checkbox" checked></pc-checkbox>
        <pc-button type="submit">Submit</pc-button>
    </form>
    ```

2. Add a JavaScript event listener to the form to prevent default form submission and log the `FormData`.

    ```js
    document
        .getElementById("example-form")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            console.log(formData.get("some-option"));
        });
    ```

3. Open the page in a browser and click the **Submit** button.
4. Check the browser’s developer console.

- **✅ Expected result:** The console should log `some-option`.
- **❌ Actual result:** The console instead logs `on`.

### 🧪 Test sandbox

<!-- If the bug isn’t obvious, please provide a minimal working demo for us with a CodePen or JSFiddle. Bug reports that have test sandboxes have higher priority than those that don’t. -->

<!-- 💡 Tip: Use the Edit button on any code demo in the Placer Toolkit docs! -->

### 🖼️ Screenshots

<!-- If applicable, add screenshots to help explain the bug. -->

### 💻 Browser and operating system

<!-- If it applies to a specific browser and operating system, then replace the example below. If it applies for all, then leave a little note saying that it is applies for all users. -->

- **Browser:** Mozilla Firefox
- **Browser version:** Version 140.0.4
- **Operating system:** macOS Sequoia 15.5

### ℹ️ Additional information

<!-- If you have any additional information about the bug, write it here. -->
