<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue'

const AuthForm = defineAsyncComponent(() =>
  import('./AuthForm.vue')
)

</script>

<template lang="pug">
Story(
  title="User/Auth" 
  icon="la:key"
  )
  Variant(title="Round")
    AuthForm

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>