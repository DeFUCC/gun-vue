<script setup>
import { currentRoom, rootRoom } from '#composables';
</script>

<template lang="pug">
.flex.flex-col
  room-page(
    :key="currentRoom.pub" 
    @browse="$router.push(`/${$event}/`)"
    )

</template>