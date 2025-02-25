<script setup>

import { currentRoom } from '#composables';
import { UserListOverlay, UserGraph } from '#components'

</script>

<template lang="pug">
.flex.flex-col.items-center.my-4
  user-list-overlay(
    :key="currentRoom.pub" 
    @user="$router.push(`/users/${$event}`)")
  user-graph(
    :key="currentRoom.pub" 
    @user="$router.push(`/users/${$event}`)")
</template>