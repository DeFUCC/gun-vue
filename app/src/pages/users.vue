<script setup>
import { currentRoom } from '#composables';


</script>

<template lang="pug">
.flex.items-center.relative
  user-list(
    :key="currentRoom.pub" 
    @user="$router.push(`/users/${$event}`)")
  user-graph(
    :key="currentRoom.pub" 
    @user="$router.push(`/users/${$event}`)")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component")
</template> 