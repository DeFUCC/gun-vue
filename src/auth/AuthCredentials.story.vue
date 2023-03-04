<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue'

const AuthCredentials = defineAsyncComponent(() =>
  import('./AuthCredentials.vue')
)

</script>

<template lang="pug">
Story(
  title="User/Credentials" 
  icon="la:suitcase"
  )
  Variant(title="Round")
    AuthCredentials

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>