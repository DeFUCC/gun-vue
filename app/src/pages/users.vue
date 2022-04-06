<script setup>
import { currentRoom } from '@composables';


</script>

<template lang='pug'>
.flex.items-center.relative
  user-list( @user="$router.push(`/users/${$event}`)" :key="currentRoom.pub")
  user-graph( @user="$router.push(`/users/${$event}`)" :key="currentRoom.pub")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component")
</template> 