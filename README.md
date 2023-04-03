![@gun-vue logo](https://gun-vue.js.org/media/gun-vue-logo.svg)

# [gun-vue.js.org](https://gun-vue.js.org)

## Vue + Gun p2p crypto graph db toolkit

Gun-vue – is where the peer-to-peer javascript database **Gun** meets the reactivity system of **Vue**. Pluggable components for UX designers. Easily importable composables for UI developers. Relay peer for p2p network enthusiasts. Demos and docs for beginners. Open source for everyone! ✊

## What is @gun-vue?

@gun-vue is a open collection of interconnected building blocks for making a whole range of decentralized apps for online and offline collaboration. It's a place where we can feel the nature of distributed networking and have fun together!

[Gun](https://gun.eco) is a CRDT based distributed graph database, [Vue](https://vuejs.org) is a reactive JS UI framework, SEA is web-browser cryptography adapter and together they evolve into an ecosystem of multiple app levels.

The project is committed to give all the basic tools for everyone to participate in exploring this new universe. You can find your own way in it for yourself.

There code is organised into distinct layers in the [@gun-vue npmjs.com organisation](https://www.npmjs.com/org/gun-vue) for you to install and use in your P2P apps. And it's also cut into vertical slices as small interconnectable apps in the common [source folder](https://github.com/DeFUCC/gun-vue/tree/master/src).

# @gun-vue/app

The main [gun-vue.js.org](https://gun-vue.js.org) site is an example Vite PWA. It's also easily built into a desktop app with [Tauri](https://tauri.app).

- [Try it now](https://gun-vue.js.org)

- [Source code](https://github.com/DeFUCC/gun-vue/tree/master/app)

---

## [@gun-vue/components](https://github.com/DeFUCC/gun-vue/tree/master/components)

<a href="https://www.npmjs.com/package/@gun-vue/components" target="_blank"><img src="https://img.shields.io/npm/v/@gun-vue/components?color=E23C92&logo=npm&style=for-the-badge" alt="NPM version"></a>

### [Playground](https://gun-vue.js.org/components)

Ready to use Vue 3 components as building blocks to implement Gun powered interactivity in seconds.

The interactive components documentation is available at [gun-vue.js.org/components/](https://gun-vue.js.org/components/) built with the [Histoire](https://histoire.dev) stories.

---

## [@gun-vue/composables](https://github.com/DeFUCC/gun-vue/tree/master/composables)

<a href="https://www.npmjs.com/package/@gun-vue/composables" target="_blank"><img src="https://img.shields.io/npm/v/@gun-vue/composables?color=E23C92&logo=npm&style=for-the-badge" alt="NPM version"></a>

### [Documentation](https://gun-vue.js.org/composables)

Composable functions for use with Vue 3 Composition API

---

## [@gun-vue/relay](https://github.com/DeFUCC/gun-vue/tree/master/relay)

<a href="https://www.npmjs.com/package/@gun-vue/relay" target="__blank"><img src="https://img.shields.io/npm/v/@gun-vue/relay?color=E23C92&logo=npm&style=for-the-badge" alt="NPM version"></a>

### [Demo](https://gun.defucc.me)

A simple no-store Gun server to throw at any free tier Node.js environment.

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
