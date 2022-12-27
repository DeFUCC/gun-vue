<script setup>
import { defineAsyncComponent } from 'vue'

const UserPanel = defineAsyncComponent(() => import('./UserPanel.vue'))

</script>

<template lang="pug">
Story(
  title="User/Panel" 
  icon="la:address-book"
  )
  Variant(title="Round")
    UserPanel

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>