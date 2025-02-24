<script setup lang="ts">
import { currentRoom } from '#composables';
import { RoomList } from '../components'
</script>

<template lang="pug">
.flex.flex-col
  .flex.p-2
    router-link.text-lg.flex-auto(to="/rooms/") Rooms

    router-link.button(to="/rooms/new/")
      .i-la-plus

  router-view(v-slot="{ Component }")
    transition(
      name="fade" 
      mode="out-in")
      component(:is="Component")
</template>