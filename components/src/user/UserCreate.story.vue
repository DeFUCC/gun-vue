<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const UserCreate = defineAsyncComponent(() =>
  import('./UserCreate.vue')
)

</script>

<template lang="pug">
Story(
  title="User/Create" 
  icon="la:magnet"
  )
  Variant(title="Round")
    UserCreate

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>