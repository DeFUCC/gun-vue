<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const UserCredentials = defineAsyncComponent(() =>
  import('./UserCredentials.vue')
)

</script>

<template lang="pug">
Story(
  title="User/Credentials" 
  icon="la:suitcase"
  )
  Variant(title="Round")
    UserCredentials

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>