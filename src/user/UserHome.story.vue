<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const UserHome = defineAsyncComponent(() =>
  import('./UserHome.vue')
)

</script>

<template lang="pug">
Story(
  title="User/Home" 
  icon="la:home"
  )
  Variant(title="Round")
    UserHome

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>