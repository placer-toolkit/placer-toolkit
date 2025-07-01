# Creating a new component

There are a lot of steps to scaffold a new component as the docs are quite complex. Here are some instructions to scaffold a new component though.

1. Create a folder in `src/components` as the name of your component (in kebab‐case).
2. Then, create three files, `*.ts`, `*.component.ts` and `*.styles.ts` where `*` represents the component name in kebab‐case. The main entry file defines the main component, the component file defines the logic and template and the styles file defines the CSS styles for the component. Remember to add JSDoc to your component code so the API documentation tables can be auto‐generated. Use other components’ code as reference to follow the convention for your component.
3. Once you’ve created your component, open `src/placer.ts` and add the export to the component under the “Components” section alphabetically sorted.

```Diff
@@ -19,6 +19,7 @@
 export { default as PcCheckbox } from "./components/checkbox/checkbox.js";
 export { default as PcComparer } from "./components/comparer/comparer.js";
 export { default as PcCopyButton } from "./components/copy-button/copy-button.js";
+export { default as PcComponentName } from "./components/component-name/component-name.js";
 export { default as PcDetails } from "./components/details/details.js";
 export { default as PcDialog } from "./components/dialog/dialog.js";
 export { default as PcDivider } from "./components/divider/divider.js";
```

Now you can run your build!

4. Make sure to create a new MDX in `docs/src/content/components` as the component name in kebab‐case and the `.mdx` extension and create the docs there, following conventions from other component docs.
5. You also have to add the link to the sidebar in `docs/src/layouts/Sidebar.astro` alphabetically sorted in the details component with summary “Components”.
6. Make sure to also repeat step 5 again but in `docs/src/layouts/MobileSidebar.astro` for the mobile sidebar!
7. Add the component in the interactive examples in `docs/src/pages/index.astro` alphabetically sorted. Keep it concise, as a middle‐point of being not too little and not too much for an interactive example.
8. Final step, add the link into the array of sidebar links in the 404 page (`docs/src/pages/404.astro`), so the “I’m feeling lucky” has a chance of teleporting to the new component’s page.
9. 🎉 You’ve successfully created your new component! You can submit a PR or merge it into Placer Toolkit or keep it as‐is.

## Want to merge it?

Then create a PR and we will assign it to the “new component” labels. One of our maintainers or contributors will see it and possibly improve it. The maintainers will then approve it.

## Frequently asked questions

<details>
    <summary><strong>But what about the Components catalogue? Do I add it in there myself?</strong></summary>
    No, you don’t have to add it in there yourself. We can tell by the PR that it is a new one and we’ll handle it for you so we can display a matching image in the correct category.
</details>

<br />

© 2025 Placer and its contributors. All rights reserved.
