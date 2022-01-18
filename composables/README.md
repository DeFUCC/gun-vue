# Gun DB + Vue UI composables collection

[gun-vue.js.org](https://gun-vue.js.org)

A Composition API `use` functions set for Gun.js and Vue 3 reactivity system

![@gun-vue logo](https://raw.githubusercontent.com/DeFUCC/gun-vue/master/_public/media/svg/composables.svg)

It's just the beginning and not all the functions are reliably implemented yet. So you're welcome to collaborate on existing and new features of the library.

- **User** - the `gun.user()` system management
- **Account** - user profile interface
- **Color** - the `color-hash` interface to generate colors for hashes and pubs
- **Crypto** - the main cryptographic primitives like e2e encrypted messaging and more
- **Date Tree** - the very performant concept of Date Tree graphs from [gun-util](https://github.com/diatche/gun-util#DateTree) made reactive and easy to use
- **File** - some bindings to manage file uploads and downloads
- **Hash** - everything you need to hash data and work with the hashes in a reliable way (i.e. URL-safe conversion)
- **Mouse** - some basic bindings to reliably locate mouse pointer in an SVG - may be useful for many online games
- **Password** - some elaborations on reimagining password system in a p2p graph environment
- **Relay** - Gun relay peer connection monitoring
- **Room** - private signed collaborative spaces with a certificate system for access management. (TBD)
- **Space** - a simple demo of showing working with private user data in a shared space
- **Tags** - hashed immutable data in the root of the db as a fun experiment, but with deep observations about freedom of speach and ways to explore the vastness of the public graph space available with Gun

**And there's more!**

## How to use

1. Install the library: `npm i @gun-vue/composables`
2. Import any of the functions you need: `import {useAccount} from '@gun-vue/composables'`
3. Instantiate the function inside your Vue SFC

```js
<script setup>const {(account, auth, leave)} = useAccount()</script>
```

4. Use the reactive state in your template to drive the component:

```pug
<template>
.p-2.flex(v-for="(data,field) in account.profile" :key="data")
      .mr-2.font-bold {{ field }}
      .text-md {{ data }}
</template>
```
