<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const AuthLogin = defineAsyncComponent(() => import('./AuthLogin.vue'))

</script>

<template lang="pug">
Story(
  title="User/Login" 
  icon="la:theater-masks"
  )
  Variant(title="Round")
    AuthLogin

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>