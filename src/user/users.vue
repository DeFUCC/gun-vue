<script setup lang="ts">
import { currentRoom } from '#composables';
import { UserList, UserGraph } from '../components'
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
      component(:is="Component")
</template> 