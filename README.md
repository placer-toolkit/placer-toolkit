# <picture><source media="(prefers-color-scheme: dark)" srcset="https://github.com/randomguy-2650/placer-toolkit/blob/main/public/logo-wordmark-dark.svg"></source><source media="(prefers-color-scheme: light)" srcset="https://github.com/randomguy-2650/placer-toolkit/blob/main/public/logo-wordmark-light.svg"></source><img src="https://github.com/randomguy-2650/placer-toolkit/blob/main/public/logo-wordmark-light.svg" alt="Placer Toolkit" width="50%" /></picture>

### The go‐to web component library for the web! 🛠️

[![Netlify status](https://api.netlify.com/api/v1/badges/b854c7b0-7765-4fe0-a1a7-06e300c4e164/deploy-status)](https://app.netlify.com/projects/whimsical-cheesecake-9c86fe/deploys)

> ![NOTE]
> 📦 This is a **monorepo** containing the Placer Toolkit core and its documentation site.

## 🚧 Pre‐release notice

This is a **pre‐release** version of Placer Toolkit. There may be instabilities and bugs in pre‐release versions of Placer Toolkit, feel free to create an issue about the bug or if you know how to fix it, then create a PR instead. We **don’t recommend** using pre‐release software in production _just_ yet.

## 🛠️ Custom Placer Toolkit builds

If you want to create custom builds of Placer Toolkit, you can use this documentation to learn how to build Placer Toolkit from source. You will need Node.js ≥18 to build and run the project locally.

You don’t need any of this to use Placer Toolkit. This section is for contributors or anyone who wants to tinker with the source or create custom builds of Placer Toolkit.

1. Start by [forking the repo](https://github.com/randomguy-2650/placer-toolkit/fork) on GitHub, then clone it locally and install dependencies.

```shell
git clone https://github.com/[GITHUB_USERNAME]/placer-toolkit
cd placer-toolkit # Navigate into your clone
npm install # Installs dependencies for Placer Toolkit
cd docs
npm install # Installs dependencies for Placer Toolkit’s docs
```

2. Once you’ve cloned the repo, you can run the following command to spin up the development server for the docs. Make sure you’re in the `docs` folder of the project.

```shell
npm run dev # To spin up the dev server provided by Astro
npx astro dev --host # If you want to expose the server on your network
```

This will spin up the dev server on `localhost:4321`. There is hot module reloading (HMR) as the docs are powered by [Astro](https://astro.build), which uses [Vite](https://vite.dev).

3. To build the docs, run this command in the `docs` folder.

```shell
npm run build # Builds the project. Also initialises Pagefind on‐the‐go
npm run preview # To spin up the production server provided by Astro
```

### 🧱 Creating new components

See [CREATING_A_NEW_COMPONENT.md](https://github.com/randomguy-2650/placer-toolkit/blob/main/CREATING_A_NEW_COMPONENT.md) for more info.

## 📄 Licence

This project is licenced under the [MIT Licence](LICENSE.md).

## 💖 Special thanks

Placer Toolkit was built with the help of these fantastic libraries:

-   [Lit](https://lit.dev)
-   [Astro](https://astro.build)
-   [Floating UI](https://floating-ui.com)
-   [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org)
-   [Pagefind](https://pagefind.app)

Additionally, Placer Toolkit is heavily inspired by [Shoelace](https://shoelace.style)—a forward‐thinking library of web components. Shoelace is licenced under the [MIT Licence](https://github.com/shoelace-style/shoelace/blob/next/LICENSE.md).

© 2025 Placer and its contributors. All rights reserved.
