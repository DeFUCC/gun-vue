![@gun-vue logo](https://gun-vue.js.org/media/gun-vue-logo.svg)

# [gun-vue.js.org](https://gun-vue.js.org)

## Vue + Gun p2p crypto graph db toolkit

Gun-vue is a versatile toolkit that combines the power of the peer-to-peer JavaScript database Gun with the reactivity system of Vue into small, but precise to the purpose apps for everyone to make, share, use and discard whenever we want. It offers pluggable components for UX designers to compose, easily importable composables for UI developers to use, and a 2 LOC starter Relay peer for new p2p network enthusiasts to run on almost any hardware. With growing collection of demos and documentation, Gun-Vue is open-source and accessible to everyone! ✊

## What is @gun-vue?

@gun-vue is an open collection of interconnected building blocks designed for creating a wide range of decentralized apps for online and offline collaboration. It combines the strengths of Gun (a CRDT-based distributed graph database), Vue (a reactive JavaScript UI framework), and SEA (a web-browser cryptography adapter) to create an ecosystem of multiple app levels. The project aims to provide basic tools for everyone to participate in exploring this new graph universe and find their own way within it.

There code is organised into distinct layers in the [@gun-vue npmjs.com organisation](https://www.npmjs.com/org/gun-vue) for you to install and use in your P2P apps. 

## @gun-vue/app

The main [gun-vue.js.org](https://gun-vue.js.org) web-site is a demo Gun-Vue SPA, which is also automatically built into a set of desktop apps as playground and example of what can be made with it today.

### [Web app](https://gun-vue.js.org) hosted at GitHub pages and JS.org domain

The app is accessible via the free for open source [js.org](https://js.org) subdomain since [Jan 2022](https://github.com/js-org/js.org/commit/56a145bb39e53c6d63edf63b26d331cf30c35061) and hosted at GitHub pages. It's built as a single HTML file that can be served from any domain or just opened as a local file. You can just press `Save Page As...` and have your local-first reactive p2p webapp with you everywhere.

### [Desktop app releases](https://github.com/DeFUCC/gun-vue/releases) via GitHub Actions and Tauri

Whenever a new version of Gun-Vue is published, an automated action creates a new release draft with a full kit of lightweight native desktop apps for Windows, Mac OS and Linux with [Tauri](https://tauri.app) by a [GitHub Action](https://github.com/DeFUCC/gun-vue/actions/workflows/tauri.yml). Mobile apps are coming too. This is a very nice way to have Gun-Vue available in case of DNS interuptions. Local relay should become a part of it, especially once GUN Rust port is stable enougth to be somehow integrated into Tauri app structure. So it can be essentially a full GUN node in a <10Mb native app.


### [Open source code](https://github.com/DeFUCC/gun-vue/tree/master/src) at GitHub [pnpm](https://pnpm.io) monorepo

The code is cut into vertical slices as small interconnectable apps in the common [source folder](https://github.com/DeFUCC/gun-vue/tree/master/src).

This means that each folder in the `src` directory is a convenient section of the entire codebase, holding a shared basic structure but having distinct functionality. 

All the source code gets built by GitHub Actions on each tag being published. The resulting HTML code goes to the `_dist` folder and is deployed to the [GitHub Pages](https://github.com/DeFUCC/gun-vue/tree/gh-pages) static site hosting.

---

## @gun-vue/components

@gun-vue/components provides ready-to-use Vue 3 components as building blocks to implement Gun-powered interactivity in seconds.

<a href="https://www.npmjs.com/package/@gun-vue/components" target="_blank"><img src="https://img.shields.io/npm/v/@gun-vue/components?color=E23C92&logo=npm&style=for-the-badge" alt="NPM version"></a>

### [Playground](https://stackblitz.com/edit/gun-vue) at Stackblitz.com

### [Learn more](https://github.com/DeFUCC/gun-vue/tree/master/components)

Native web-components may be implemented in future.

---

## @gun-vue/composables

<a href="https://www.npmjs.com/package/@gun-vue/composables" target="_blank"><img src="https://img.shields.io/npm/v/@gun-vue/composables?color=E23C92&logo=npm&style=for-the-badge" alt="NPM version"></a>

Composable functions for use with Vue 3 Composition API. They hold the core reactive logics that power the whole visual UI representation while being totally agnostic of it. You can combine these composables in Vanilla HTML+JS or import them into any of your existing static web-site builds for any realtime p2p activity.

### [Documentation](https://gun-vue.js.org/composables) with Typedoc and Vitepress

### [Learn more](https://github.com/DeFUCC/gun-vue/tree/master/composables)

---

## [@gun-vue/relay](https://github.com/DeFUCC/gun-vue/tree/master/relay)

A simple no-store Gun server to throw at any Node.js environment. From old laptops, Raspbery Pi's and free-tier hostings to high-load VPS and dedicated servers. 

<a href="https://www.npmjs.com/package/@gun-vue/relay" target="__blank"><img src="https://img.shields.io/npm/v/@gun-vue/relay?color=E23C92&logo=npm&style=for-the-badge" alt="NPM version"></a>

### [Demo relay](https://gun.defucc.me) by DeFUCC


---

## Development video blog. Watch at [DeFUCC youtube channel](https://www.youtube.com/watch?v=gwZUQcCp01U&list=PLncuCCb2zjt6wmlSNLiK1lZl150qX-rAw)

You can find shorter feature announcements there along with longer live coding sessions.

## How to build the workspace repo yourself

1. Clone this monorepo
2. Install [pnpm](https://pnpm.io/installation) 
3. Use `pnpm i` to recursively install all dependencies in the workspaces
4. Use `pnpm run dev`, `pnpm run docs` and `pnpm run app` scripts in the root folder to run corresponding dev servers. 
5. Use `builds` script to have all packages built and ready to be published in the `_dist` folder. 

```bash
corepack enable
pnpm i
pnpm run builds
open ./_dist/index.html
```