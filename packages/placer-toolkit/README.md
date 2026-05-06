<!-- SPDX-License-Identifier: MIT -->

# <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/placer-toolkit/placer-toolkit/refs/heads/main/public/logo-wordmark-dark.svg"></source><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/placer-toolkit/placer-toolkit/refs/heads/main/public/logo-wordmark-light.svg"></source><img src="https://raw.githubusercontent.com/placer-toolkit/placer-toolkit/refs/heads/main/public/logo-wordmark-light.svg" alt="Placer Toolkit" width="50%" /></picture>

### Flexible. Accessible. Web Components.

<!-- GitHub Camo will handle the GDPR compliance for this deploy status. If you don’t
     want to load external content from them, do not use the Markdown preview. -->

![Vercel deploy status](https://deploy-badge.vercel.app/vercel/placer-toolkit)

> [!NOTE]
> 📦 This is a **monorepo** containing the Placer Toolkit core and its documentation site.

## 🚧 Alpha notice

This is an **alpha** version of Placer Toolkit. Expect instabilities and bugs; if you find one, please open an issue or submit a PR to improve this project.

## 🛠️ Custom Placer Toolkit builds

If you want to create custom builds of Placer Toolkit, you can use this documentation to learn how to build Placer Toolkit from source. You will need Node.js v20 or later (v21 is not supported) to build and run the project locally.

You don’t need any of this to use Placer Toolkit. This section is for contributors or anyone who wants to tinker with the source or create custom builds of Placer Toolkit.

Start by [forking the repo](https://github.com/placer-toolkit/placer-toolkit/fork) on GitHub, then clone it locally and install dependencies.

```bash
git clone https://github.com/placer-toolkit/placer-toolkit
cd placer-toolkit # Navigates into your clone
pnpm install # Installs dependencies
```

Once you’ve cloned the repo, you can run the following command to spin up the development server for the docs and the library compilation watcher.

```bash
pnpm dev # Spins up the dev server provided by Astro
pnpm dev --host # If you want to expose the dev server on your network
```

This will spin up the dev server on `localhost:4321`.

## 💖 Special thanks

Placer Toolkit was built with the help of these fantastic libraries:

- [Lit](https://lit.dev)w
- [Astro](https://astro.build)
- [Floating UI](https://floating-ui.com)
- [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org)
- [Pagefind](https://pagefind.app)

Additionally, Placer Toolkit is heavily inspired by [Web Awesome](https://webawesome.com)—a meticulously designed and highly customisable web component library. Web Awesome is licensed under the [MIT License](./licenses/@awesome.me/webawesome/LICENSE.md).

The default icon set is [Font Awesome](https://fontawesome.com) which is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0).

For the entire list of open‐source libraries and frameworks, see [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) for more information.

## 📄 Licence

This project uses a modular licensing system and different parts of the codebase are licensed under different licences.

- **Library:** MIT License
- **Documentation:** CC BY 4.0
- **Logos:** CC BY-ND 4.0 with exceptions listed in the [Brand assets guidelines](https://placer-toolkit.vercel.app/docs/resources/brand-assets)
- **Branding and marketing assets:** All rights reserved with a contributor licence grant

See the [licence page](https://placer-toolkit.vercel.app/docs/legal/licence) for more information.

© 2025–present Placer and its contributors
