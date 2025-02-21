<script setup lang="ts">
import { currentRoom } from '#composables';
import { RoomList } from '../components'
</script>

<template lang="pug">
.flex.flex-col
  room-list.p-8(@browse="$router.push(`/rooms/${$event}`)" :key="currentRoom.pub")
  router-view(v-slot="{ Component }")
    transition(
      name="fade" 
      mode="out-in")
      component(:is="Component")
</template>