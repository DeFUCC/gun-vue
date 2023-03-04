<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue'

const AuthCreate = defineAsyncComponent(() =>
  import('./AuthCreate.vue')
)

</script>

<template lang="pug">
Story(
  title="User/Create" 
  icon="la:magnet"
  )
  Variant(title="Round")
    AuthCreate

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>