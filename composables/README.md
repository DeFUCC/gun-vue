<a href="https://gun-vue.js.org">
  <img src="https://gun-vue.js.org/media/svg/composables.svg" alt="@gun-vue composables logo" width="500" />
</a>

# Gun-Vue: Composables

Vue 3 Composition API `use` functions for [**Gun-Vue: The Peer-to-Peer Web App Toolkit**](https://github.com/DeFUCC/gun-vue)

> **Note**: This project is in its early stages. Not all features are fully implemented or reliably tested. [Contributions are welcome!](https://github.com/DeFUCC/gun-vue/tree/master?tab=readme-ov-file#contributing)

## Composables

### Identity & Access
- [**User**](https://github.com/DeFUCC/gun-vue/tree/master/src/user)  - the `gun.user()` system management
- **Account** - user profile interface
- **Password** - some elaborations on reimagining password system in a p2p graph environment

### Data, Storage, & Networking
- **Crypto** - the main cryptographic primitives like e2e encrypted messaging and more
- **Date Tree** - the very performant concept of Date Tree graphs from [gun-util](https://github.com/diatche/gun-util#DateTree) made reactive and easy to use
- **Relay** - Gun relay peer connection monitoring
- **File** - some bindings to manage file uploads and downloads
- **Hash** - everything you need to hash data and work with the hashes in a reliable way (i.e. URL-safe conversion)

### Content & Collaboration
- **Chat** - Public group chat
- **Dictionary** - we find ourselves in great power if we have verified concepts to collaborate with
- **Private Chat** - E2EE Messaging
- **Posts** - hashed immutable data in the root of the db as a fun experiment, but with deep observations about freedom of speech and ways to explore the vastness of the public graph space available with Gun
- **Room** - private signed collaborative spaces with a certificate system for access management. (TBD)
- **Rooms** - cryptographic data collections
- **Space** - a simple demo of showing working with private user data in a shared space

### UI & Visual
- **Color** - the `color-hash` interface to generate colors for hashes and pubs
- **Mouse** - some basic bindings to reliably locate mouse pointer in an SVG - may be useful for many online games

**... and more!**

## Setup

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

### SSR/SSG (Nuxt, VitePress, etc.)

Gun-Vue is client-side only and may cause errors during SSR/SSG builds. To avoid issues, consider one of these approaches:

> **Note**: We plan to refactor the code to be more usable and tree-shakeable in SSG environments. **Help needed!**

#### Approach A: Make your component async

```vue
<script setup async>
	const { useAccount } = await import("@gun-vue/composables");

	const { account } = useAccount();
</script>

<template>
	<div>{{ account.profile?.name }}</div>
</template>
```

#### Approach B: Load only on the client side

```html
<ClientOnly>
	<Suspense>
		<YourComponent />
	</Suspense>
</ClientOnly>
```

This prevents Gun-Vue from running during build time.
