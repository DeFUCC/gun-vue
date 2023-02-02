![@gun-vue logo](https://gun-vue.js.org/media/gun-vue-logo.svg)

## [gun-vue.js.org](https://gun-vue.js.org)

[![Add to Homescreen](https://img.shields.io/badge/Skynet-Add%20To%20Homescreen-00c65e?logo=skynet&labelColor=0d0d0d)](https://homescreen.hns.siasky.net/#/skylink/AQC7upIKykiM-nYJA6Ac-Q4PHRtYsHDVS1Ne-M2ELcZU2A)

### Vue + Gun p2p crypto graph db toolkit

Gun-vue – is where the peer-to-peer javascript database Gun meets the reactivity system of [Vue 3](https://vuejs.org). Pluggable components for UX designers. Easily importable composables for UI developers. Relay peer for p2p network enthusiasts. Demos and docs for beginners. Open source for everyone! ✊

### [@gun-vue](https://www.npmjs.com/org/gun-vue)

@gun-vue is a collection of essential building blocks to create a variety of decentralized apps for online and offline collaboration. It's a moment when we can feel the nature of distributed networking and have fun together!

[Gun](https://gun.eco) is a CRDT based distributed graph database, Vue is a reactive JS UI framework, SEA is web-browser cryptography adapter and together they evolve into an ecosystem of multiple app levels.

The project is committed to give all the basic tools for everyone to participate in exploring this new universe. You can find your own way in it for yourself.

There code is organised into distinct 3 packages in the [@gun-vue npmjs.com organisation](https://www.npmjs.com/org/gun-vue) for you to install and use:

## [@gun-vue/components](https://github.com/DeFUCC/gun-vue/tree/master/components)

<a href="https://www.npmjs.com/package/@gun-vue/components" target="_blank"><img src="https://img.shields.io/npm/v/@gun-vue/components?color=E23C92&logo=npm&style=for-the-badge" alt="NPM version"></a>

Ready to use Vue 3 components as building blocks to implement Gun powered interactivity in seconds.

The interactive components documentation is available at [gun-vue.js.org/components/](https://gun-vue.js.org/components/) built with the [Histoire](https://histoire.dev) stories.

---

## [@gun-vue/composables](https://github.com/DeFUCC/gun-vue/tree/master/composables)

<a href="https://www.npmjs.com/package/@gun-vue/composables" target="_blank"><img src="https://img.shields.io/npm/v/@gun-vue/composables?color=E23C92&logo=npm&style=for-the-badge" alt="NPM version"></a>

Composable functions for use with Vue 3 Composition API

---

## [@gun-vue/relay](https://github.com/DeFUCC/gun-vue/tree/master/relay)

<a href="https://www.npmjs.com/package/@gun-vue/relay" target="__blank"><img src="https://img.shields.io/npm/v/@gun-vue/relay?color=E23C92&logo=npm&style=for-the-badge" alt="NPM version"></a>

A simple no-store Gun server to throw at any free tier Node.js environment.

---

## [@gun-vue/app](https://github.com/DeFUCC/gun-vue/tree/master/app)

The main [gun-vue.js.org](https://gun-vue.js.org) site is an example Vite SPA. It's also easily built into a desktop app with [Tauri](https://tauri.app).

---

## Watch the development video blog at [youtube](https://www.youtube.com/watch?v=gwZUQcCp01U&list=PLncuCCb2zjt6wmlSNLiK1lZl150qX-rAw)

You can find shorter new features announcements along with longer live coding sessions there.

## How to build the workspace repo yourself?

1. Clone the repo
2. Use [pnpm](https://pnpm.io/) to install all the dependencies in the workspaces

```bash
npm i -G pnpm
pnpm i
```

3. Use `dev`, `docs` and `histoire` scripts in the root `package.json` to run corresponding dev servers.
4. Use `npm run build` to build the whole project to the `_dist` folder.
