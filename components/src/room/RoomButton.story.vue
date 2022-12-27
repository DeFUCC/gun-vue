<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const RoomButton = defineAsyncComponent(() =>
  import('./RoomButton.vue')
)



</script>

<template lang="pug">
Story(
  title="Room/Icon" 
  :layout="{ type: 'single' }"
  )
  Variant(title="Round")
    ClientOnly
      Suspense
        RoomButton

  template(#controls)
    .p-2.flex.flex-col.gap-4
</template>