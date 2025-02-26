# Gun-Vue: Composables

<img src="https://raw.githubusercontent.com/DeFUCC/gun-vue/master/app/public/media/svg/composables.svg" alt="@gun-vue composables logo" width="750" />

[GitHub (@gun-vue/composables)](https://github.com/DeFUCC/gun-vue/tree/master/composables) •
[npm](https://www.npmjs.com/package/@gun-vue/composables) •
[Docs](https://gun-vue.js.org/packages/composables.html) •
[API](https://gun-vue.js.org/reference/typedoc/modules.html)

Reusable logic built with the **Vue 3 Composition API** `use` functions. Manages **Gun** database interactions, **SEA** encryption, and reactive state. Check out [Gun-Vue: Features (/src)](https://github.com/DeFUCC/gun-vue/tree/master/src) for an overview.

> This code is part of [**Gun-Vue: The Peer-to-Peer Web App Toolkit**](https://github.com/DeFUCC/gun-vue).

## How to Use

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
