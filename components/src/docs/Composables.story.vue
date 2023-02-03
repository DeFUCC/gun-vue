<template>
  <Story title="Composables" docs-only icon="la:book-open" group="docs" />
</template>

<docs lang="md">

# Gun DB + Vue UI composables collection

A Composition API `use` functions set for Gun.js and Vue 3 reactivity system

![@gun-vue logo](https://raw.githubusercontent.com/DeFUCC/gun-vue/master/docs/public/media/svg/composables.svg)

[gun-vue.js.org](https://gun-vue.js.org)

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
- **Posts** - hashed immutable data in the root of the db as a fun experiment, but with deep observations about freedom of speach and ways to explore the vastness of the public graph space available with Gun
- **Chat** - basic public chat
- **Rooms** - cryptographic data collections
- **Dictionary** - we find ourselves in great power if we have verified concepts to collaborate with

... and more!

**And there's more!**

[READ FULL DOCUMENTATION ONLINE](https://gun-vue.js.org/docs)

## How to use

1. Install the library:

```shell
npm i @gun-vue/composables
```

2. Import any of the functions you need:

```js
import { useAccount } from "@gun-vue/composables";
```

3. Instantiate the function inside your Vue SFC

```js
const { account, auth, leave } = useAccount();
```

4. Use the reactive state in your template to drive the component:

```html
<div v-for="(data,field) in account.profile" :key="field">
	{{ field }} - {{ data }}
</div>
```

#### SSG environment notice (Nuxt, Vitepress etc.)

Gun-Vue is client-side only and it may throw errors being executed during the SSG/SSR build process. One way to deal with it is to make the your GUN-enabled components asynchronous.

### 1. Make your component async

```vue
<script setup async>
	const { useAccount } = await import("@gun-vue/composables");

	const { account } = useAccount();
</script>

<template>
	<div>{{ account.profile?.name }}</div>
</template>
```

### 2. Put it to load only on client side.

```html
<ClientOnly>
	<Suspense>
		<YourComponent />
	</Suspense>
</ClientOnly>
```

This should prevent any Gun-Vue related code from running during build stage.

- [ ] Refactor the code to be more useable and tree-shakeable in SSG environment. Help needed!

</docs>