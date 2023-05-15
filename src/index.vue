<script setup lang="ts">
import { currentRoom, rootRoom } from './composables';

import { RoomPage } from './components'
</script>

<template lang="pug">
.flex.flex-col
  room-page(
    :key="currentRoom.pub" 
    @browse="$router.push(`/${$event}/`)"
    @user="$router.push(`/users/${$event}/`)"
    )
</template>
