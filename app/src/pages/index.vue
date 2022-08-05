<script setup>
import { currentRoom, rootRoom } from '#composables';
</script>

<template lang="pug">
.flex.flex-col
  room-page(
    @browse="$router.push(`/${$event}/`)" 
    :key="currentRoom.pub"
    )

</template>