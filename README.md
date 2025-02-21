<a href="https://gun-vue.js.org">
  <img src="https://gun-vue.js.org/media/gun-vue-logo.svg" alt="@gun-vue logo" width="250" />
</a>

# Gun-Vue: The Peer-to-Peer Web App Toolkit

[Homepage](https://gun-vue.js.org) • 
[Quickstart](https://gun-vue.js.org/tutorials/getting-started.html) • 
[npm](https://npmjs.com/org/gun-vue) • 
[YouTube](https://www.youtube.com/playlist?list=PLncuCCb2zjt6wmlSNLiK1lZl150qX-rAw)
<br><br>
**Gun-Vue** empowers you to build **Offline-First, Progressive Web Apps (PWAs)** that run in any modern browser and synchronize **Peer-to-Peer** in **Realtime**—no central server needed.

This is achieved by combining three key technologies:

- [**gun.js**](https://gun.eco): Peer-to-peer graph database with CRDT-based real-time data synchronization.
- [**sea.js**](https://gun.eco/docs/SEA): Security, Encryption, and Authorization layer for secure, end-to-end encrypted data.
- [**vue.js**](https://vuejs.org): Reactive JavaScript framework for building intuitive and dynamic user interfaces.

With **Gun-Vue**, these pieces come together into a set of modular [packages](#packages) designed to make real-time, decentralized web app development straightforward. Whether you’re building social networks, messaging tools, or file-sharing platforms, Gun-Vue helps you take advantage of **secure, serverless** interactivity—right in the browser.

## [**📱 Try the Demo App!**](https://gun-vue.js.org/app)
## [**✉️ Signup for Updates**](https://forms.gle/4oBqAE7xNDaCvFSY8) 

## Packages

| Package                                                                          | npm                                                                                                                                                                   | Description                                                                                                                                                        |
|----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [**/app**](https://github.com/DeFUCC/gun-vue/tree/master/app)                  | [![npm version](https://img.shields.io/npm/v/@gun-vue/app?color=E23C92&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@gun-vue/app)                        |  [**Demo App**](https://gun-vue.js.org/app) featuring P2P social posts, end-to-end encrypted chat, web-torrent filesharing, and more!    |
| [**/components**](https://github.com/DeFUCC/gun-vue/tree/master/components)      | [![npm version](https://img.shields.io/npm/v/@gun-vue/components?color=E23C92&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@gun-vue/components)           | **Prebuilt Vue 3 UI components** that let you integrate real-time, P2P functionality into your projects.                               |
| [**/composables**](https://github.com/DeFUCC/gun-vue/tree/master/composables)    | [![npm version](https://img.shields.io/npm/v/@gun-vue/composables?color=E23C92&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@gun-vue/composables)         | **Reusable logic** (Vue 3 Composition API) for managing reactive, P2P data flows independently of any specific UI components.                                     |
| [**/relay**](https://github.com/DeFUCC/gun-vue/tree/master/relay)                | [![npm version](https://img.shields.io/npm/v/@gun-vue/relay?color=E23C92&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@gun-vue/relay)                     | **Simple Gun.js Relay Peer** for connecting clients and optional persistent storage.                                      |

## Setup

Build the workspace yourself:

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

## Contributing
Contributions are welcome! If you’d like to help make Gun-Vue better, please:

Fork the repository and clone it locally.
Create a new branch for your feature or fix.
Submit a pull request when ready, explaining your changes and why they’re useful.
Open issues if you spot a bug or have a suggestion.
We value respectful, inclusive collaboration. Be sure to check our issues to see what’s already being discussed.
