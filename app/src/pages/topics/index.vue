<script setup>
import { currentRoom } from '@composables';

</script>

<template lang='pug'>
chat-room(:key="currentRoom.pub")
</template>