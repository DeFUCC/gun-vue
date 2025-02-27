---
title: Create your first Vue app
---

https://stackblitz.com/edit/gun-vue?embed=1&file=src/App.vue

Gun-Vue is a toolkit for emergent P2P apps. You can use it to create your own web-application, that you can share with your friends and beyond.

## Step 1: Create a new Vue 3 project with Vite

First, you need to create a new Vue 3 project using Vite. Open your terminal and run the following commands:

```sh
npm init vite@latest my-gun-vue-app --template vue
cd my-gun-vue-app
npm install
```

## Step 2: Install Gun-Vue components

Next, install the Gun-Vue components package:

```sh
npm install @gun-vue/components
```

## Step 3: Update your main.js

Open `src/main.js` and update it to include the Gun-Vue components' styles:

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import "@gun-vue/components/dist/style.css";

createApp(App).mount("#app");
```

## Step 4: Create YourComponent.vue

Create a new file `src/components/YourComponent.vue` and add the following code:

```vue
<script setup>
	import { UserIcon, QRLoad, AccountHome } from "@gun-vue/components";
</script>

<template>
	<div>
		<UserIcon />
		<QRLoad />
		<AccountHome />
	</div>
</template>
```

## Step 5: Update App.vue

Open `src/App.vue` and update it to use `YourComponent`:

```vue
<template>
	<div id="app">
		<YourComponent />
	</div>
</template>

<script setup>
	import YourComponent from "./components/YourComponent.vue";
</script>
```

## Step 6: Build and serve the app

Finally, build and serve your app:

```sh
npm run build
npm run serve
```

This will create a `dist` directory with your built app. You can now open `dist/index.html` in your browser to see your Gun-Vue app in action.
