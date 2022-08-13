---
title: Components
icon: la:book-open
group: docs
---

![](/components.svg)

# Gun-Vue is a library of reusable components for Gun built with Vue.

It enables eager web developers to build p2p apps for their communities all over the world, free and open source.

## How to install?

Gun-Vue is distributed as a regular NPM package and may be used in any Vue 3 project. 

1. You may start by [creating a new Vue project](https://vuejs.org/guide/quick-start.html).

```shell
pnpm init vue@latest
cd <your-project-name>
pnpm install
pnpm run dev
```
2. Install the Gun-Vue plugin and it's styles in your app `main.js` file

```js main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import '@gun-vue/components/dist/style.css'
import { GunVuePlugin } from '@gun-vue/components'

const app = createApp(App)
app.use(router)
app.use(GunVuePlugin)
app.mount('#app')

```

3. You can use any of the Gun-Vue components in any SFC in your app.

```html
<template>
  <ChatRoom />
</template>
```

4. Or you can use Gun-Vue components as routes directly in your `./router/index.js`.

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { RoomList } from '@gun-vue/components'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomList
    }
  ]
})

export default router
```
