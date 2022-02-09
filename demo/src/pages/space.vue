<script setup>
import { currentRoom } from '@composables'
</script>

<template lang='pug'>
.flex.flex-col.items-center 
  space-plane.rounded-xl.overflow-hidden.shadow-xl.bg-light-100(@user="$router.push('/users/' + $event)" :key="currentRoom.pub")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>