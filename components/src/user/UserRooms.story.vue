<script setup>
import { defineAsyncComponent } from 'vue'

const UserRooms = defineAsyncComponent(() => import('./UserRooms.vue'))

</script>

<template lang="pug">
Story(
  title="User/Rooms" 
  icon="la:route")
  Variant(title="Round")
    UserRooms

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>