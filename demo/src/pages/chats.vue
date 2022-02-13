<script setup>
import { currentRoom } from '@composables';


</script>

<template lang='pug'>
.flex.flex-col
  chat-room(:key="currentRoom.pub")
</template>