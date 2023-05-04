<script setup lang="ts">
import { currentRoom, rootRoom } from './composables';

import { RoomPage, UiComponents } from './components'
</script>

<template lang="pug">
.flex.flex-col
  room-page(
    :key="currentRoom.pub" 
    @browse="$router.push(`/${$event}/`)"
    )
  UiComponents.text-xs.p-2.opacity-60.bg-light-900.dark-bg-dark-100
</template>

//TODO - ECOCOIN