# Vitepress SSR web-site with @gun-vue components

Demontration of embedding the components into a server generated web site based on vitepress. It's a minimal demo, but vitepress is quite powerful to create some really big projects.

![@gun-vue logo](https://raw.githubusercontent.com/davay42/gun-vue/master/app/public/gun-vue-logo.svg)

To build a site with Vitepress now you'll have to use out custom component loader in order to use `@gun-vue/components` in SSR node environment.

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

https://learnvue.co/2021/01/write-beautiful-documentation-quickly-with-vitepress/#built-in-elements-in-vitepress
