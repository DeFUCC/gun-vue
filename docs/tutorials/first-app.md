---
title: Create your first app
---

Gun-Vue is a toolkit for emergent P2P apps. You can use it to create your own web-application, that you can share with your friends and beyond. 


```vue 
// YourComponent.vue
<script setup>
  import "@gun-vue/components/dist/style.css"
  import { UserIcon, QRLoad, AccountHome } from "@gun-vue/components"
</script>

<template>
	<div>
		<UserIcon />
    <QRLoad />
    <AccountHome />
	</div>
</template>
```