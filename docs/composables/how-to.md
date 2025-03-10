## How to use composables

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

![](https://gun-vue.js.org/composables/arkit.svg)
