![](/media/svg/components.svg)

## Components

Pluggable [Vue 3](https://v3.vuejs.org) + [Gun DB](https://gun.eco/docs/API) UI components

## How to install

1. Install the components library:

```shell
npm i @gun-vue/components
```

2. Import an async component into your Vue 3 SFC script setup:

```js
import { defineAsyncComponent } from 'vue'

const RelayPulse = defineAsyncComponent(() =>
  import('@gun-vue/components')
)
```

3. Use the component in your SFC template:

```html
<template>
<relay-pulse />
</template>
```

4. Have fun combining different components with a shared Gun state.

# Component showcase

<a href="https://gun-vue.js.org/components/" >Component stories</a>