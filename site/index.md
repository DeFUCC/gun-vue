![@gun-vue logo](/media/png/logo.png)

## Gun DB + Vue UI

Gun is a reactive peer-to-peer database. Vue is a reactive js framework. Together they double the reactivity in the **gun-vue** library.

---

![](/media/png/components.png)

## Components

### [Components showcase](/components/)

Easily pluggable Vue 3 UI components for Gun p2p DB

---

![](/media/png/composables.png)

## Composables

Easy to use Vue 3 Composition API composable functions to be used in a Vue `<script setup>` environment. There are basic bindings to Gun DB capabilities as well as some other low and high level abstractions.

- Low level functions are like `useSvgMouse()` for user presence indications.
- High level are funcs like `useFeed()` that loads a feed of immutable hash-adressed posts under a certain tag

### [Composables docs](/docs)

See the full list in the docs and in the source

---

![](/media/png/demo.png)

## Demo

The most straightforward way of using the `@gun-vue/components` is to mount them in your Vue 3 + Vite app. It then will build a small set of files that can be easily deployed at any host (centralised or distributed).

### Try now <a href="/demo/">Demo app</a>

Here's the demo app empowered with some `vite` plugins like `vite-plugin-pages` and `windicss`. It elaborates the client-side routing to connect the pieces together and make urls a powerful tool to share data across gun network.

---

![](/media/png/relay.png)

## Relay

### Remix a [Glitch project](https://glitch.com/~etogun)
