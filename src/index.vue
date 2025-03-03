<script setup>
import { currentRoom, rootRoom, selectedUser } from './composables';

import { RoomPage } from './components'
</script>

<template lang="pug">
.flex.flex-col
  room-page(
    :key="currentRoom.pub" 
    @browse="$router.push(`/${$event}/`)"
    @user="selectedUser.pub = $event"
    )
</template>
