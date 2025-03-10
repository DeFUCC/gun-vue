### Gun-Vue components in SSG/SSR environment

Most of the Gun-Vue components rely on realtime communication with the GUN database. This means we should prevent them from running during the build process to be executed only on the client. You can use `client-only` and `Suspense` with async components to have client-side components in a server side render environment.

```vue Home.vue
<script setup async>
	import "@gun-vue/components/dist/style.css";
	const { UserHome } = await import("@gun-vue/components");
</script>

<template>
	<div>
		<UserHome></UserHome>
	</div>
</template>
```

```vue Index.vue
<ClientOnly>
  <Suspense>
    <Home></Home>
  </Suspense>
</ClientOnly>
```

Another way is to have the whole `GunVuePlugin` be mounted only on client-side. Here's what we have here in the Vitepress docs setup.

```js
// .vitepress/theme/index.ts
export default {
	async enhanceApp({ app }) {
		if (!import.meta.env.SSR) {
			const { GunVuePlugin } = await import("@gun-vue/components");
			app.use(GunVuePlugin);
		}
	},
};
```
