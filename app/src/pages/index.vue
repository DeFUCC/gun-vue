<script setup>
import { currentRoom, rootRoom } from '@composables';
</script>

<template lang="pug">
.flex.flex-col

  RoomPage(@browse="$router.push(`/${$event}/`)")


</template>
