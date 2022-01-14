![](/media/svg/demo.svg)

## Vite SPA

The most straightforward way of using the `@gun-vue/components` is to mount them in your **[Vue](https://staging.vuejs.org/) + [Vite](https://vitejs.dev/)** app. It then will build a small set of files that can be easily deployed at any host (centralised or distributed).

Here's the demo app empowered with some `vite` plugins like `vite-plugin-pages` and `windicss`. It elaborates the client-side routing to connect the pieces together and make urls a powerful tool to share data across gun network.

### Try <a href="/" target="_blank">Vite app</a>

## Vitepress SSR web-site

This web-site is itself a template for you to build a **[Vitepress](https://vitepress.vuejs.org)** server-side rendered web-site with Gun-Vue components built in.

You'll have to use out custom component loader in order to use `@gun-vue/components` in SSR node environment.

```vue
<script setup>
  import { shallowRef, onMounted } from "vue";

  const props = defineProps({
    component: { type: String, default: "FeedBlock" }, // the name of a GunVue component to load
    pr: { type: Object, default: {} }, // pass in props with :pr="{foo:bar}" attribute
  });

  const comp = shallowRef(null);

  onMounted(() => {
    import("@gun-vue/components").then((module) => {
      comp.value = module?.[props.component];
    });
  });
</script>

<template>
  <Component v-if="comp" :is="comp" v-bind="pr"></Component>
</template>
```

Here's the minimum configuration for setting a global component with `vitepress`

```js
import DefaultTheme from "vitepress/theme";

import "@gun-vue/components/dist/style.css";

import GunVue from "./components/GunVue.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("GunVue", GunVue);
  },
};
```

And then you can load a component in your `.md` files

```html
<GunVue
  component="UserIcon"
  :pr="{ pub:'XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc' }"
/>
```
