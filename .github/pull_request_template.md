### ✨ Type of change

- [ ] Bug fix (non‐breaking change which fixes an issue)
- [ ] New feature (non‐breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Refactor (code restructuring, no new features or bug fixes)
- [ ] Documentation update
- [ ] Chore (dependency updates, build process changes, etc.)

### 📝 Description of changes

<!-- We need a description of the changes you made to the codebase. Please provide a clear, concise description to what this PR wants to merge. -->

### 🔗 Related issues

<!-- Does this close or fix other issues? If so, then list them here. -->

### 🧪 How to test

<!-- We need instructions for reviewers to verify your changes. Please describe the steps to test your fix or new feature, similar to the example below. -->

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

### 🖼️ Screenshots

<!-- If applicable, add screenshots or videos to help explain visual changes or demonstrate new functionality/fixes. -->

### ✅ Checklist

- [ ] My code follows the [Placer Style Guide](https://github.com/placer-toolkit/placer-style-guide). I also understand and agree to the mandatory, absolute nature of the style guide; in which I accept the [defined consequences](../../PLACER_STYLE_GUIDE_VIOLATION.md) if I fail.
- [ ] I have performed a self‐review of my own code.
- [ ] I have commented my code, particularly in hard‐to‐understand areas.
- [ ] I have made corresponding changes to the documentation.
- [ ] My changes generate no new warnings.
- [ ] Any dependent changes have been merged and published in downstream modules.

### 💻 Browser and operating system

- **Browser:** Mozilla Firefox
- **Browser version:** Version 143
- **Operating system:** macOS Tahoe 26

### ℹ️ Additional information

<!-- If you have any additional information about the pull request, write it here. -->
