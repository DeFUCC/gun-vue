## How to use Gun-Vue components

Gun-Vue is distributed as a regular NPM package and may be used in any Vue 3 project.

0. You may start by [creating a new Vue project](https://vuejs.org/guide/quick-start.html) or skip this step if you already have one.

```shell
pnpm init vue@latest
cd <your-project-name>
pnpm install
pnpm run dev
```

1. Install the `@gun-vue/components` package and start the development process

```shell
pnpm i @gun-vue/components
pnpm run dev
```

2. You can use the components in any place of your app

```vue
<script setup>
	import "@gun-vue/components/dist/style.css";
	import { UserHome } from "@gun-vue/components";
</script>

<template>
	<div>
		<UserHome></UserHome>
	</div>
</template>
```

3. OR you can install the Gun-Vue plugin and it's styles in your app `main.js` file and use all the components straight away.

```js main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "@gun-vue/components/style.css";
import { GunVuePlugin } from "@gun-vue/components";

const app = createApp(App);
app.use(router);
app.use(GunVuePlugin);
app.mount("#app");
```

So you can use any of the Gun-Vue components in any SFC in your app.

```html
<template>
	<ChatRoom />
</template>
```
