<script setup>
import { defineAsyncComponent } from 'vue'

const UserLogin = defineAsyncComponent(() => import('./UserLogin.vue'))

</script>

<template lang="pug">
Story(
  title="User/Login" 
  icon="la:theater-masks"
  )
  Variant(title="Round")
    UserLogin

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>