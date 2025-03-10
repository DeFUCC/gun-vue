### Using Composables in SSG environment (Nuxt, Vitepress etc.)

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

- [ ] Help needed! Refactor the code to be more useable and tree-shakeable in SSG environment.
