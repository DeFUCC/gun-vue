<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const RoomIcon = defineAsyncComponent(() =>
  import('./RoomIcon.vue')
)



</script>

<template lang="pug">
Story(title="Room/Icon" :layout="{ type: 'single' }")
  Variant(title="Round")
    RoomIcon

  template(#controls)
    .p-2.flex.flex-col.gap-4
</template>