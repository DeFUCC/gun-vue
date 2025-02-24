# Gun-Vue: The Peer-to-Peer Web App Toolkit

<a href="https://gun-vue.js.org">
  <img src="https://gun-vue.js.org/media/gun-vue-logo.svg" alt="@gun-vue logo" width="250" />
</a>

[Home](https://gun-vue.js.org) •
[GitHub](https://github.com/DeFUCC/gun-vue/) •
[npm](https://npmjs.com/org/gun-vue) •
[YouTube](https://www.youtube.com/playlist?list=PLncuCCb2zjt6wmlSNLiK1lZl150qX-rAw) •
[Contact](https://forms.gle/4oBqAE7xNDaCvFSY8)
<br><br>
**Gun-Vue** empowers you to build **Offline-First, Progressive Web Apps (PWA)** that run in any modern browser and securely synchronize data **Peer-to-Peer (P2P)** in **Realtime** without centralized servers.

**Gun-Vue** brings together three powerful technologies:

- **Peer-To-Peer (P2P)** powered by [**Gun**](https://gun.eco)
- **Cryptography** powered by [**SEA**](https://gun.eco/docs/SEA)
- **Web Apps** powered by [**Vue**](https://vuejs.org)

...and combines them into several modular packages that make development [**Fast**, **Easy**, and **Fun**](https://gun-vue.js.org/basics/what-is.html)!

## [**📱 Try the Demo App**](https://gun-vue.js.org/app)

## [**✉️ Get Updates**](https://forms.gle/4oBqAE7xNDaCvFSY8)

## Packages

### Gun-Vue: Demo App

[GitHub (/app)](https://github.com/DeFUCC/gun-vue/tree/master/app) •
[npm](https://www.npmjs.com/package/@gun-vue/app) •
[Demo](https://gun-vue.js.org/app)  

Features P2P social posts, end-to-end encrypted chat, web-torrent filesharing, and more!

---

### Gun-Vue: Components
[GitHub (/components)](https://github.com/DeFUCC/gun-vue/tree/master/components) •
[npm](https://www.npmjs.com/package/@gun-vue/components) •
[Docs](https://gun-vue.js.org/packages/components.html)  

Prebuilt Vue 3 UI components that let you integrate real-time, P2P functionality into your projects.

---

### Gun-Vue: Composables
[GitHub (/composables)](https://github.com/DeFUCC/gun-vue/tree/master/composables) •
[npm](https://www.npmjs.com/package/@gun-vue/composables) •
[Docs](https://gun-vue.js.org/packages/composables.html) •
[API](https://gun-vue.js.org/reference/typedoc/modules.html)

Reusable logic (Vue 3 Composition API) for managing reactive, P2P data flows independently of any specific UI components.

---

### Gun-Vue: Relay
[GitHub (/relay)](https://github.com/DeFUCC/gun-vue/tree/master/relay) •
[npm](https://www.npmjs.com/package/@gun-vue/relay) •
[Docs](https://gun-vue.js.org/packages/relay.html)  

Simple Gun.js Relay Peer for connecting clients and optional persistent storage.

## How to Build the Workspace

1. Clone this monorepo.
2. Install [pnpm](https://pnpm.io/installation).
3. Run `pnpm i` to install all workspace dependencies.
4. From the root folder, use:
   - `pnpm run dev`
   - `pnpm run docs`
   - `pnpm run app`  
     to start each corresponding dev server.
5. Run `pnpm run builds` to build all packages in the `_dist` folder.

```bash
corepack enable
pnpm i
pnpm run builds
open ./_dist/index.html
```

## [Tutorial: Build your first Gun-Vue Web App](https://gun-vue.js.org/tutorials/getting-started.html)

## How to Contribute

We welcome ideas, bug reports, and pull requests:

1. Fork the repository and create a new branch.
2. Make changes and test locally.
3. Submit a pull request with a brief summary.

Thank you for improving Gun-Vue!
