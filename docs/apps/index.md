![](/media/svg/demo.svg)

## Vite demo app

The most straightforward way of using the `@gun-vue/components` is to mount them in your **[Vue](https://staging.vuejs.org/) + [Vite](https://vitejs.dev/)** app. It then will build a small set of files that can be easily deployed at any host (centralised or distributed).

The main page gun-vue.js.org is itself a demo app empowered with some `vite` plugins like `vite-plugin-pages` and `windicss`. It elaborates the client-side routing to connect the pieces together and make urls a powerful tool to share data across gun network.

Try <a href="/" target="_blank">Vite demo app</a> now

## Vitepress docs web-site

This documentation web-site is itself a template for you to build a **[Vitepress](https://vitepress.vuejs.org)** server-side rendered web-site with Gun-Vue components built in.

### How to start

1. Initiate a new project as stated in the [Vitepress docs](https://vitepress.vuejs.org/guide/getting-started.html) and install [@gun-vue/components](https://www.npmjs.com/package/@gun-vue/components). We use `pnpm` in the example, but you can use `npm`, `yarn`, or other package managers as well.

```shell
mkdir my-site
cd my-site
pnpm i -D vitepress
pnpm i @gun-vue/components
echo '# Hello VitePress' > index.md
```

2. Add the scripts to your `package.json`

```json
{
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "serve": "vitepress serve"
  }
}
```

3. Run your development server

```shell
pnpm run dev
```

### How to add GunVue components

You'll have to use a custom component loader in order to use `@gun-vue/components` in SSR NodeJS environment.

1. Create a custom component in `.vitepress/components` directory

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

2. Add an `index.js` into the `.vitepress/theme` directory. Here's the minimum configuration for setting a global component with `vitepress`

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

3. Then you can load a component in your `.md` files

```html
<GunVue
  component="UserIcon"
  :pr="{ pub:'XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc' }"
/>
```
