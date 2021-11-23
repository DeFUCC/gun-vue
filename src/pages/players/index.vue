<script setup>

const players = reactive([
  { pulse: 100, pos: { x: 10, y: 20 } }
])

</script>

<template lang="pug">
.flex.flex-col.p-4
  .font-bold Current players
  button.m-2.p-4.shadow-md.transition-200.hover--shadow-xl Add player
  .flex
    carbon-logo-github.h-2em.w-2em
    .p-4.m-1(v-for="player in players" :key="player") {{ player.pos }} {{ player.pulse }} 
</template>