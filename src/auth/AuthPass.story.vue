<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const AuthPass = defineAsyncComponent(() => import('./AuthPass.vue'))

</script>

<template lang="pug">
Story(
  title="User/Pass" 
  icon="la:passport"
  )
  Variant(title="Round")
    AuthPass

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>