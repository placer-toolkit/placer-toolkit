# <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/placer-toolkit/placer-toolkit/refs/heads/main/public/logo-wordmark-dark.svg"></source><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/placer-toolkit/placer-toolkit/refs/heads/main/public/logo-wordmark-light.svg"></source><img src="https://raw.githubusercontent.com/placer-toolkit/placer-toolkit/refs/heads/main/public/logo-wordmark-light.svg" alt="Placer Toolkit" width="50%" /></picture>

### Flexible. Accessible. Web Components.

![Vercel deploy status](https://deploy-badge.vercel.app/vercel/placer-toolkit)

> [!NOTE]
> 📦 This is a **monorepo** containing the Placer Toolkit core and its documentation site.

## 🚧 Alpha notice

This is an **alpha** version of Placer Toolkit. There may be instabilities and bugs in alpha versions of Placer Toolkit, feel free to create an issue or PR about the bug instead.

## 🛠️ Custom Placer Toolkit builds

If you want to create custom builds of Placer Toolkit, you can use this documentation to learn how to build Placer Toolkit from source. You will need Node.js v20 or later (v21 is not supported) to build and run the project locally.

You don’t need any of this to use Placer Toolkit. This section is for contributors or anyone who wants to tinker with the source or create custom builds of Placer Toolkit.

1. Start by [forking the repo](https://github.com/placer-toolkit/placer-toolkit/fork) on GitHub, then clone it locally and install dependencies.

```shell
git clone https://github.com/placer-toolkit/placer-toolkit
cd placer-toolkit # Navigates into your clone
npm install # Installs dependencies for Placer Toolkit
cd docs
npm install # Installs dependencies for Placer Toolkit’s docs
```

2. Once you’ve cloned the repo, you can run the following command to spin up the development server for the docs. Make sure you’re in the `docs` folder of the project.

```shell
npm run dev # Spins up the dev server provided by Astro
npx astro dev --host # If you want to expose the server on your network
```

This will spin up the dev server on `localhost:4321`. There isn’t any hot module reloading as Web Components aren’t compatible with this technology, but it’ll automatically refresh the page instead.

3. To build the docs, run this command in the `docs` folder.

```shell
npm run build # Builds the project. Also initialises Pagefind on‐the‐go
npm run preview # Spins up the production server provided by Astro
```

## 📄 Licence

This project is licensed under the [MIT License](./LICENSE.md).

## 💖 Special thanks

Placer Toolkit was built with the help of these fantastic libraries:

- [Lit](https://lit.dev)
- [Astro](https://astro.build)
- [Floating UI](https://floating-ui.com)
- [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org)
- [Pagefind](https://pagefind.app)

Additionally, Placer Toolkit is heavily inspired by [Shoelace](https://shoelace.style)—a forward‐thinking library of web components. Shoelace is licensed under the [MIT License](https://github.com/shoelace-style/shoelace/blob/next/LICENSE.md). More recently, elements of [Web Awesome](https://webawesome.com) have also influenced Placer Toolkit’s development.

For the entire list of open‐source libraries and frameworks, see [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) for more information.

© 2025–present Placer and its contributors
