<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const UserAuth = defineAsyncComponent(() =>
  import('./UserAuth.vue')
)

</script>

<template lang="pug">
Story(
  title="User/Auth" 
  icon="la:key"
  )
  Variant(title="Round")
    UserAuth

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>