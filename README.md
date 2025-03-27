# Gun-Vue: The Peer-to-Peer Web App Toolkit

<a href="https://gun-vue.js.org">
  <img src="https://github.com/DeFUCC/gun-vue/blob/main/docs/public/media/gun-vue-kit.png" alt="@gun-vue logo" width="650" />
</a>
<br>
<br>

[Home](https://gun-vue.js.org) •
[GitHub](https://github.com/DeFUCC/gun-vue/) •
[npm](https://npmjs.com/org/gun-vue) •
[YouTube](https://www.youtube.com/playlist?list=PLncuCCb2zjt6wmlSNLiK1lZl150qX-rAw) •
[Contact](https://forms.gle/4oBqAE7xNDaCvFSY8)
<br><br>
**Gun-Vue** empowers you to build **Offline-First, Progressive Web Apps (PWA)** that run in any modern browser and securely synchronize data **Peer-to-Peer (P2P)** in **Real-time** without centralized servers.

**Gun-Vue** utilizes three powerful technologies:

- **Peer-to-Peer (P2P)** powered by [**Gun**](https://gun.eco)
- **Cryptography** powered by [**SEA**](https://gun.eco/docs/SEA)
- **Web Apps** powered by [**Vue 3**](https://vuejs.org)

...and combines this [**Next-Gen Tech Stack**](https://gun-vue.js.org/basics/what-is.html) into a collection of [**Features**](#features) built from **Composables** and **Components**, that make **Decentralized Web (DWeb)** development [**Fast & Fun**](https://gun-vue.js.org/apps/getting-started.html)! These features are showcased in the [**Gun-Vue: 📱 Demo App**](https://gun-vue.js.org/app), so you can start experimenting right now:

## [**Try the Gun-Vue: 📱 Demo App!**](https://gun-vue.js.org/app)

## [**✉️ Sign-up for Updates**](https://forms.gle/4oBqAE7xNDaCvFSY8)

## The Toolkit

### 📱 Demo App

[GitHub (@gun-vue/app)](https://github.com/DeFUCC/gun-vue/tree/main/app) •
[npm](https://www.npmjs.com/package/@gun-vue/app) •
[📱 Demo App](https://gun-vue.js.org/app)

A **Single-Page App (SPA)** that runs in any modern browser, featuring **Peer-to-Peer**: **Social Posts**, **End-to-End Encrypted (E2EE) Chat**, **WebTorrent File Sharing**, and more!

---

### Relay

[GitHub (@gun-vue/relay)](https://github.com/DeFUCC/gun-vue/tree/main/relay) •
[npm](https://www.npmjs.com/package/@gun-vue/relay) •
[Docs](https://gun-vue.js.org/packages/relay.html)

A simple **Gun Relay Peer** that helps clients form **Peer-to-Peer (P2P)** connections.

---

### Features

[GitHub (@gun-vue/src)](https://github.com/DeFUCC/gun-vue/tree/main/src)

A collection of ready to use features such as: `User`, `Post`, `Chat`, `Project`, and more! Many of these are used in the [**Gun-Vue: 📱 Demo App**](https://gun-vue.js.org/app).

---

#### Components

[GitHub (@gun-vue/components)](https://github.com/DeFUCC/gun-vue/tree/main/components) •
[npm](https://www.npmjs.com/package/@gun-vue/components) •
[Docs](https://gun-vue.js.org/packages/components.html)

Prebuilt **Vue 3 UI components** that simplify adding **secure, real-time, peer-to-peer** functionality to your application—no need to build core features from scratch.

---

#### Composables

[GitHub (@gun-vue/composables)](https://github.com/DeFUCC/gun-vue/tree/main/composables) •
[npm](https://www.npmjs.com/package/@gun-vue/composables) •
[Docs](https://gun-vue.js.org/packages/composables.html) •
[API](https://gun-vue.js.org/reference/typedoc/modules.html)

**Reusable logic** built with the **Vue 3 Composition API**, for managing **reactive, peer-to-peer data flows** independently of any specific UI component.

#### Gun-Avatar

[GitHub (@gun-vue/gun-avatar)](https://github.com/DeFUCC/gun-avatar/) •
[npm](https://www.npmjs.com/package/gun-avatar) •
[Docs](https://gun-avatar.js.org) •

Human recognizable visual public key representation. Exports consistent and easy to recognize canvas/svg avatar images for SEA keypairs. Is exported by **Composables** library as a `gunAvatar()` function and is available as a separate library to import and use. Versions 2.0+ support embedding and extracting arbitrary text data into and from the generated PNG files.

#### Gun-ES

[GitHub (@gun-vue/gun-es)](https://github.com/DeFUCC/gun-es) •
[npm](https://www.npmjs.com/package/@gun-vue/gun-es) •
[Docs](https://gun.eco) •

An ESM treated GUN (that is still in CJS) so that it's compatible with modern JS module system. Exports { Gun, SEA } with opinionated setup of using the scalable IndexedDB storage, WebRTC adapter and then() promisification.

## How to Build the Toolkit

> **Note**: For a more guided approach, see the [**Tutorials**](https://gun-vue.js.org/apps/getting-started.html) or try the [**StackBlitz Starter Project**](https://stackblitz.com/edit/gun-vue?embed=1&file=src/App.vue).

1. Install `pnpm`

```bash
npm install -g pnpm
```

_(Alternatively, use [corepack](https://pnpm.io/installation#using-corepack))_

2. Clone the Repository & Install Dependencies

```bash
git clone https://github.com/DeFUCC/gun-vue.git
```

```bash
cd gun-vue
```

```bash
pnpm install
```

3. Run a Development Server

   Pick **one** (or more) from the following, as needed:

- **Core Dev Server**:
  ```bash
  pnpm run dev
  ```
- **Documentation Server**:
  ```bash
  pnpm run docs
  ```

4. Build the Entire Toolkit

```bash
pnpm run builds
```

```bash
open ./_dist/index.html
```

_(or manually open `_dist/index.html` in your browser.)_

## How to Contribute

We welcome ideas, bug reports, and pull requests:

1. Fork the repository and create a new branch.
2. Make changes and test locally.
3. Submit a pull request with a brief summary.

Thank you for improving Gun-Vue!
