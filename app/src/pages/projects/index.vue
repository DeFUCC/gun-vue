<script setup>
import { currentRoom } from '#components';
</script>

<template lang='pug'>
.flex.flex-col
  project-form
  project-list(:key="currentRoom.pub")
</template>